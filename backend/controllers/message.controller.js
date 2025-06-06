import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

import bcrypt from "bcryptjs";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
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

    const hashedMessage = await bcrypt.hash(message, 10);
    const newMessage = await Message.create({
      senderId,
      recieverId,
      message: hashedMessage,
    });
    if (newMessage) conversation.messages.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);

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

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in Sending Message", error.message);
    res.status(500).json({
      success: false,
      error: true,
      message: `Internal Server Error ${error.message}`,
    });
  }
};
