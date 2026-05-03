import User from "../models/user.model.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { email, success, z } from "zod";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};

export const register = async (req, res, next) => {
  try {
    const { email, password } = authSchema.parse(req.body);

    const userExists = await User.findOne({ email });
    if (userExists)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const hashedPassword = await argon2.hash(password);
    const suer = await User.create({ email, password: hashedPassword });

    generateToken(user._id, res);

    res
      .status(201)
      .json({ success: true, data: { _id: user._id, email: user.email } });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = authSchema.parse(req.body);

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid)
      res.status(401).json({ success: false, message: "Invalid credentials" });

    generateToken(user._id, res);

    res
      .status(200)
      .json({ success: true, data: { _id: user._id, email: user.email } });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
