import Department from "../models/Department.js";

export const listDepartments = async (req, res) => {
  const items = await Department.find().sort({ name: 1 });
  res.json(items);
};

export const createDepartment = async (req, res) => {
  try {
    const item = await Department.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const item = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
