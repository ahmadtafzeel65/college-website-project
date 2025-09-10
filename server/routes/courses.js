import express from "express";
import { listCourses, createCourse, updateCourse, deleteCourse } from "../controllers/courseController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Public
router.get("/", listCourses);

// Admin
router.post("/", auth, createCourse);
router.put("/:id", auth, updateCourse);
router.delete("/:id", auth, deleteCourse);

export default router;
