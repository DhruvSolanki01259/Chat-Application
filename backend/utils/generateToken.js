import jwt from "jsonwebtoken";

export const generateTOkenAndCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("access_token", token, {
    sameSite: "strict",
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV !== "development",
  });
};

export const clearCookie = (res) => {
  res.clearCookie("access_token", {
    sameSite: "strict",
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
  });
};
