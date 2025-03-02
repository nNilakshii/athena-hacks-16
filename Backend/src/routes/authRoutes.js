const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/users");

const router = express.Router();

// Signup Route - Only USC Emails Allowed
router.post(
  "/save-profile",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Invalid USC email").matches(/^[a-zA-Z0-9._%+-]+@usc\.edu$/),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, courses, hobbies } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      user = new User({
        name,
        email,
        password: hashedPassword,
        courses,
        hobbies
      });

      await user.save();

      // Generate JWT Token
      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });

      res.json({ token });

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
