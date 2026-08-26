import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

// Signup a new user
export const signup = async (req, res) => {
    try {

        const {fullName, email, password, bio} = req.body;

        if(!fullName || !email || !password || !bio){
            return res.json({success: false, message: "Missing details"})
        }

        const user = await User.findOne({email});
        if (user) {
            return res.json({success: false, message: "User already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName, email, password: hashedPassword, bio
        });

        const token = generateToken(newUser._id);

        res.json({success: true, userData: newUser, token, message: "Account created successfully"});

    } catch (error) {
        
        console.log(error.message);
        res.json({success: false, message: error.message});

    }
}

// Login an existing user
export const login = async (req, res) => {

    try {

        const {email, password} = req.body;
        const userData = await User.findOne({email});

        const isPasswordCorrect = await bcrypt.compare(password, userData.password);

        if(!isPasswordCorrect){
            return res.json({success: false, message: "Invalid credentials"});
        }

        const token = generateToken(userData._id);
        res.json({success: true, userData, token, message: "Login successful"});

    } catch (error) {

        console.log(error.message);
        res.json({success: false, message: error.message});

    }
}

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
      let imageUrl = profilePic;
      try {
        const upload = await cloudinary.uploader.upload(profilePic);
        if (upload && upload.secure_url) {
          imageUrl = upload.secure_url;
        }
      } catch (cloudinaryErr) {
        console.log("Cloudinary upload error, using raw image data URL fallback:", cloudinaryErr.message);
      }

      updatedUser = await User.findByIdAndUpdate(
        userId,
        { fullName, bio, profilePic: imageUrl },
        { new: true },
      ).select("-password");
    }
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
