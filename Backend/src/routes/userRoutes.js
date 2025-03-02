const express = require("express");
const router = express.Router();
const User = require("../models/users");

// GET all users recommendations
router.get("/get-records", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new user
router.post("/", async (req, res) => {
  try {
    const { name, email, courses, hobbies } = req.body;
    const newUser = new User({ name, email, courses, hobbies });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
