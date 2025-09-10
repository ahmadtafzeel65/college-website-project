import Contact from "../models/Contact.js";

export const submitContact = async (req, res) => {
  try {
    const saved = await Contact.create(req.body);
    res.status(201).json({ message: "Submitted", saved });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const listContacts = async (req, res) => {
  const items = await Contact.find().sort({ createdAt: -1 });
  res.json(items);
};
