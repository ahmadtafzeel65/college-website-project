import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
  description: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("Course", CourseSchema);
