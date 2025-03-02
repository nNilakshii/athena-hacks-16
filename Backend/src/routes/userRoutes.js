// Signup Route - Only USC Emails Allowed
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Assuming the User model is stored in this location

router.post(
  "/save-profile",
  [
    check("firstname", "First name is required").not().isEmpty(),
    check("lastname", "Last name is required").not().isEmpty(),
    check("email", "Invalid USC email").matches(/^[a-zA-Z0-9._%+-]+@usc\.edu$/),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
    check("usc_id", "USC ID must be a 10 digit number").matches(/^[0-9]{10}$/),
    check("classes", "At least one class is required").isArray().notEmpty(),
    check("interests", "At least one interest is required").isArray().notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password, dept, classes, mentor, current_year, interests, usc_id } = req.body;

    try {
      // Check if the user already exists by email or usc_id
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists with this email" });
      }

      // Check if the USC ID already exists
      user = await User.findOne({ usc_id });
      if (user) {
        return res.status(400).json({ msg: "User already exists with this USC ID" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create the user
      user = new User({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        dept,
        classes,
        mentor,
        current_year,
        interests,
        usc_id
      });

      await user.save();

      // Generate JWT Token
      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });

      // Send the token in the response
      res.json({ token });

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);


// GET all users recommendations
router.get("/get-friends", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
