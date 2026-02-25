import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloud.js";

export const register = async (req, res) => {
  console.log("=== REGISTER ENDPOINT HIT ===");
  console.log("Body received:", req.body);
  console.log("File received:", req.file ? req.file.originalname : "NO FILE");

  try {
    const { fullname, email, phoneNumber, password, adharcard, pancard, role } = req.body || {};

    if (!fullname || !email || !phoneNumber || !password || !role || !adharcard || !pancard) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Check duplicates
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists", success: false });

    const existingAdhar = await User.findOne({ adharcard });
    if (existingAdhar) return res.status(400).json({ message: "Aadhaar already exists", success: false });

    const existingPan = await User.findOne({ pancard });
    if (existingPan) return res.status(400).json({ message: "PAN already exists", success: false });

    // File upload — make it OPTIONAL for testing
    let profilePhotoUrl = null;
    if (req.file) {
      console.log("Uploading file to Cloudinary...");
      try {
        const fileUri = getDataUri(req.file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        profilePhotoUrl = cloudResponse.secure_url;
        console.log("Cloudinary success:", profilePhotoUrl);
      } catch (cloudErr) {
        console.error("Cloudinary FAILED:", cloudErr.message);
        // Continue without photo — don't crash
      }
    } else {
      console.log("No profile photo uploaded — continuing without it");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      adharcard,
      pancard,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: profilePhotoUrl,
      },
    });

    console.log("User created successfully:", newUser.email);

    return res.status(201).json({
      message: `Account created successfully for ${fullname}`,
      success: true,
    });
  } catch (error) {
    console.error("REGISTER CRASH:", error.message);
    console.error(error.stack);
    return res.status(500).json({
      message: "Server error during registration",
      error: error.message,  // ← send error message to frontend for debugging
      success: false,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    if (user.role !== role) {
      return res.status(403).json({
        message: "You don't have the necessary role to access this resource",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const sanitizedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      adharcard: user.adharcard,
      pancard: user.pancard,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user: sanitizedUser,
        success: true,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error login failed",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error logging out",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    const userId = req.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",");

    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "raw",   // 👈 must be raw for PDFs
        folder: "resumes",      // optional
        public_id: `${userId}_resume` // optional: to control file name
      });

      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;

    }

    await user.save();

    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error updating profile",
      success: false,
    });
  }
};
