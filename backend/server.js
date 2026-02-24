const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://gdgworkshop1.netlify.app");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// Middleware
app.use(cors({
  origin: [
    "http://127.0.0.1:5500",
    "https://gdgworkshop1.netlify.app"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Error:", err));

// Schema
const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  college: { type: String, required: true },
  year: { type: String, required: true },
  branch: { type: String, required: true },
  event: { type: String, required: true }
});

// Model
const Registration = mongoose.model("Registration", registrationSchema);

// API Route
app.post("/register", async (req, res) => {
  try {

    const newUser = new Registration(req.body);
    await newUser.save();

    res.json({
      message: "🎉 Registration Successful!"
    });

  } catch (err) {

    res.status(500).json({
      message: "❌ Error Saving Data"
    });

  }
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});