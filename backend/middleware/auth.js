import jwt from "jsonwebtoken";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";

// Middleware to protect routes and ensure that the user is authenticated
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Not authorized" });
  }
};

// Controller to check if the user is authenticated
export const checkAuth = (req, res) => {
  res.json({ success: true, user: req.user });
};

// Controller to update the user's profile details
export const updateProfile = async (req, res) => {
  try {
    const { fullName, bio, profilePic } = req.body;

    const userId = req.user._id;
    let updatedUser;

    if (!profilePic) {
      await User.findByIdAndUpdate(userId, { fullName, bio }, { new: true });
      updatedUser = await User.findById(userId).select("-password");
    } else {
      const upload = await cloudinary.uploader.upload(profilePic);

      uodatedUser = await User.findByIdAndUpdate(
        userId,
        { fullName, bio, profilePic: upload.secure_url },
        { new: true },
      );
    }
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Error updating profile" });
  }
};
