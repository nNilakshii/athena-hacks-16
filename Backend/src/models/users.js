const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^[a-zA-Z0-9._%+-]+@usc\.edu$/, "Only USC emails allowed"]
  },
  password: { type: String, required: true },
  courses: [String],
  hobbies: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
