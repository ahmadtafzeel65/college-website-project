import express from "express";
import { submitContact, listContacts } from "../controllers/contactController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Public submit
router.post("/", submitContact);

// Admin view (optional)
router.get("/", auth, listContacts);

export default router;
