import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTOkenAndCookie, clearCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Confirm Password Does not Match",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "User already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Username
    const username =
      fullName.toLowerCase().trim().split(" ").join("") +
      Math.floor(1000 + Math.random() * 9000);

    // Profile Picture
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      await newUser.save();

      generateTOkenAndCookie(newUser._id, res);

      const { password, ...rest } = newUser._doc;
      return res.status(201).json({
        success: true,
        error: false,
        message: "User Created Successfully",
        rest,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, error: true, message: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error Occured in Signing the User: ", error.message);
    res
      .status(500)
      .json({ success: false, error: true, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const checkPassword = await bcrypt.compare(password, user?.password || "");
    if (!user || !checkPassword)
      return res
        .status(400)
        .json({ success: false, error: true, message: "Invalid Credentials" });
    else {
      generateTOkenAndCookie(user._id, res);

      const { password, ...rest } = user._doc;
      return res.status(200).json({
        success: true,
        error: false,
        message: "Logged In Successfull",
        rest,
      });
    }
  } catch (error) {
    console.log("Error caused in Logging the User");
    res
      .status(500)
      .json({ success: false, error: true, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    clearCookie(res);
    res
      .status(200)
      .json({ success: true, error: false, message: "Logged Out Successfull" });
  } catch (error) {
    console.log("Error caused in Logging Out the User");
    res
      .status(500)
      .json({ success: false, error: true, message: error.message });
  }
};
