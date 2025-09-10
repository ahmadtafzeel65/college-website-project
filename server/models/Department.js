import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("Department", DepartmentSchema);
