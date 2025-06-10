import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token)
      return res.status(401).json({
        success: false,
        error: true,
        message: "Unauthorized - No Token Found",
      });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res.status(400).json({
        success: false,
        error: true,
        message: "Unauthorized - Invalid Token",
      });
    // console.log(decoded.userId);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user)
      return res.status(404).json({
        success: false,
        error: true,
        message: "User Not Found",
      });

    req.user = user;
    next();
  } catch (error) {
    console.log("User not Authenticated", error.message);
    res.status(500).json({
      success: false,
      error: true,
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

export default protectRoute;
