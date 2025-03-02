let app = require("./app"); // Import the app from app.js
const connectDB = require("./config/db");
const cors = require("cors")
const path = require("path")
const express = require("express")


connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
  });
  
  process.on("unhandledRejection", (err) => {
    console.error("Unhandled Promise Rejection:", err);
  });
  
