import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generate.js";

// Signup
export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    // the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create and save the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    if (newUser) {
      createTokenAndSaveCookie(newUser._id, res);
      return res.status(201).json({
        message: "User registered successfully",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server error, please try again" });
  }
};

//   Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user by email using cookies i.e token
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    createTokenAndSaveCookie(user._id, res);
    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server error, please try again" });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "user logged out successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server error, please try again" });
  }
};
// getUserProfile
export const getUserProfile = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filterUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(201).json({ filterUsers });
  } catch (error) {
    console.log("Error in allUser", error);
    res.status(500).json({ message: "Server error" });
  }
};
