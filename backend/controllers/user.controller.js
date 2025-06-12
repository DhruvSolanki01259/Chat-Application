import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const sender = req.user._id;

    const allUsers = await User.find({
      _id: { $ne: sender },
    }).select("-password");

    res.status(200).json(allUsers);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({
      success: false,
      error: true,
      message: `Internal Server Error: ${error.message}`,
    });
  }
};
