const mongoose = require('mongoose');

// Define the schema for the User document
const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^[a-zA-Z0-9._%+-]+@usc\.edu$/, "Only USC emails allowed"]
  },
  password: { type: String, required: true },
  dept: { type: String, required: true },
  classes: { type: [String], required: true },
  mentor: { type: Boolean, default: false },
  current_year: { type: String, required: true },
  interests: { type: [String], required: true },
  usc_id: { 
    type: String, 
    required: true, 
    length: 10, 
    match: /^[0-9]{10}$/, // Ensures the field contains exactly 10 digits
    unique: true 
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
