// Signup Route - Only USC Emails Allowed
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users"); // Assuming the User model is stored in this location
const authMiddleware = require("../middleware/auth");
const { getStudyBuddyRecommendations } = require("../utils/matchingEngine");

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

// GET ALL PRESENT USER RECORDS
// TO DO: INCORPORATE FILTERS FOR SEARCHING, get a flag from UI
router.get("/get-all-users",  async (req, res) => {
    try {
      const filter = {};
  
      // Apply filters if provided in the request body
      if (req.body.dept) {
        filter.dept = req.body.dept;
      }
      if (req.body.mentor) {
        filter.mentor = req.body.mentor;
      }
      if (req.body.current_year) {
        filter.current_year = req.body.current_year;
      }
      if (req.body.classes) {
        filter.classes = { $in: req.body.classes }; 
      }
      if (req.body.interests) {
        filter.interests = { $in: req.body.interests }; 
      }
  
      const users = await User.find(filter);
  
      if (users.length === 0) {
        return res.status(404).json({ message: "No users found matching the criteria." });
      }
  
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Server error" });
    }
  });


// GET CURRENT USER DETAILS
// router.get("/get-current-user", authMiddleware, async (req, res) => {
router.get("/get-current-user",  async (req, res) => {
    try {
    // Fetch user & exclude password
    // let requserid = 1234567891
      const user = await User.findById({usc_id : req.user.id}).select("-password"); 
    // const user = await User.find({usc_id : requserid}).select("-password"); 
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server error" });
    }
  });


// GET RECOMMENDATIONS
// router.get("/recommend-buddies", authMiddleware, async (req, res) => {
router.get("/recommend-buddies",  async (req, res) => {
    try {
    //   const recommendations = await getStudyBuddyRecommendations(req.user.id);
    const recommendations = await getStudyBuddyRecommendations('67c3d083c37de16fe1fc9ca8');
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch study buddy recommendations" });
    }
  });


// LOGIN USER
// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Generate JWT Token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });

    // Send token as response
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
