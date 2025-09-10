import express from "express";
import { listDepartments, createDepartment, updateDepartment, deleteDepartment } from "../controllers/departmentController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Public
router.get("/", listDepartments);

// Admin
router.post("/", auth, createDepartment);
router.put("/:id", auth, updateDepartment);
router.delete("/:id", auth, deleteDepartment);

export default router;
