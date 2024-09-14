import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const secureRoute = async (req, res, next) => {
  try {
    // token checking
    const token = req.cookies.token; // matches the token name used in createTokenAndSaveCookie
    console.log("Cookies:", req.cookies);
    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authorized, no token provided" });
    }
    // Verify the token using JWT_SECRET
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(403).json({ message: "Invalid token" });
    }
    // Find the user by ID extracted from the verified token payload
    const user = await User.findById(verified.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Attach the user to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error(`Error in secureRoute: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default secureRoute;
