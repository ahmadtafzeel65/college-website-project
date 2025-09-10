import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminUser.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await AdminUser.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "8h" });
    res.json({ token, email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
