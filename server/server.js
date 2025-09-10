import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./config/db.js";
import AdminUser from "./models/AdminUser.js";
import bcrypt from "bcryptjs";

import authRoutes from "./routes/auth.js";
import deptRoutes from "./routes/departments.js";
import courseRoutes from "./routes/courses.js";
import contactRoutes from "./routes/contacts.js";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || "*" }));
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/departments", deptRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/contacts", contactRoutes);
app.get("/", (req, res) => res.send("College API running"));

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  // Auto-create admin on first run
  const email = process.env.ADMIN_EMAIL || "admin@college.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const existing = await AdminUser.findOne({ email });
  if (!existing) {
    const passwordHash = await bcrypt.hash(password, 10);
    await AdminUser.create({ email, passwordHash });
    console.log(`Admin created: ${email} / ${password}`);
  } else {
    console.log("Admin already exists");
  }
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
};

start();
