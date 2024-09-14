import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });

    res.cookie("token", token, {
      httpOnly: true, 
      // secure: process.env.NODE_ENV === 'production', // Cookie is sent over HTTPS only in production time i.e deploy  time  because local host secure --- false
      secure: true,
      sameSite: "strict", // CSRF attacks
      maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days in milliseconds
    });
  } catch (error) {
    console.error("Error creating token or setting cookie:", error.message);
    5;
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default createTokenAndSaveCookie;
