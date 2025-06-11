import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    // console.log(`message`, message);
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      recieverId,
      message,
    });
    if (newMessage) conversation.messages.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(recieverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in Sending Message", error.message);
    res.status(500).json({
      success: false,
      error: true,
      message: `Internal Server Error ${error.message}`,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    }).populate("messages");

    // console.log(conversation.messages);
    if (!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in Getting Message", error.message);
    res.status(500).json({
      success: false,
      error: true,
      message: `Internal Server Error ${error.message}`,
    });
  }
};
