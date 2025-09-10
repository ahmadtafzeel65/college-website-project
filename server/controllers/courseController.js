import Course from "../models/Course.js";

export const listCourses = async (req, res) => {
  const items = await Course.find().populate("department", "name");
  res.json(items);
};

export const createCourse = async (req, res) => {
  try {
    const item = await Course.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const item = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
