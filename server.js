// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const multer = require("multer");
// const cors = require("cors");
// const path = require("path");

// const app = express();
// const PORT = process.env.PORT || 5010;

// // Middleware
// app.use(cors({ origin: "*" })); // Allow all origins
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// // Database Connection
// mongoose
//   .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 }) // Keep timeout if needed
//   .then(() => console.log("✅ Connected to MongoDB Atlas"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // Define Schema & Model
// const submissionSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   resume: { type: String, required: true }, // Store file path
//   createdAt: { type: Date, default: Date.now },
// });

// const Submission = mongoose.model("Submission", submissionSchema);

// // Multer Setup (File Uploads)
// const storage = multer.diskStorage({
//   destination: "./uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname); // Unique filename
//   },
// });

// const upload = multer({ storage });

// // Form Submission Route
// app.post("/submit", upload.single("resume"), async (req, res) => {
//   try {
//     const { name, email } = req.body;
//     if (!req.file) return res.status(400).json({ error: "Resume file is required!" });

//     const resumePath = `/uploads/${req.file.filename}`;

//     const newSubmission = new Submission({ name, email, resume: resumePath });
//     await newSubmission.save();

//     res.status(201).json({ message: "Submission Successful!", data: newSubmission });
//   } catch (error) {
//     console.error("❌ Submission Error:", error);
//     res.status(500).json({ error: "Server Error. Try again later." });
//   }
// });

// // View All Submissions (API)
// app.get("/submissions", async (req, res) => {
//   try {
//     const submissions = await Submission.find();
//     res.json(submissions);
//   } catch (error) {
//     console.error("❌ Fetch Error:", error);
//     res.status(500).json({ error: "Server Error. Try again later." });
//   }
// });

// // Serve Dashboard HTML (Ensure Data is Fetched)
// app.use(express.static("public")); // Assuming dashboard.html is in 'public' folder

// // Start Server
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const multer = require("multer");
// const cors = require("cors");
// const path = require("path");

// const app = express();
// const PORT = process.env.PORT || 5010;

// // Middleware
// app.use(cors({ origin: "*" })); // Allow all origins
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// // Database Connection
// mongoose
//   .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 }) // Keep timeout if needed
//   .then(() => console.log("✅ Connected to MongoDB Atlas"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // Define Schema & Model
// const submissionSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true }, // ✅ Added phone field
//   resume: { type: String, required: true }, // Store file path
//   createdAt: { type: Date, default: Date.now },
// });

// const Submission = mongoose.model("Submission", submissionSchema);

// // Multer Setup (File Uploads)
// const storage = multer.diskStorage({
//   destination: "./uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname); // Unique filename
//   },
// });

// const upload = multer({ storage });

// // Form Submission Route
// app.post("/submit", upload.single("resume"), async (req, res) => {
//   try {
//     const { name, email, phone } = req.body; // ✅ Added phone field
//     if (!req.file) return res.status(400).json({ error: "Resume file is required!" });

//     const resumePath = `/uploads/${req.file.filename}`;

//     const newSubmission = new Submission({ name, email, phone, resume: resumePath });
//     await newSubmission.save();

//     res.status(201).json({ message: "Submission Successful!", data: newSubmission });
//   } catch (error) {
//     console.error("❌ Submission Error:", error);
//     res.status(500).json({ error: "Server Error. Try again later." });
//   }
// });

// // View All Submissions (API)
// app.get("/submissions", async (req, res) => {
//   try {
//     const submissions = await Submission.find();
//     res.json(submissions);
//   } catch (error) {
//     console.error("❌ Fetch Error:", error);
//     res.status(500).json({ error: "Server Error. Try again later." });
//   }
// });

// // Serve Dashboard HTML (Ensure Data is Fetched)
// app.use(express.static("public")); // Assuming dashboard.html is in 'public' folder

// // Start Server
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5010;

// Middleware
app.use(cors({ origin: "*" })); // Allow all origins
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files
app.use(express.static("public")); // Serve dashboard.html and other static files

// Database Connection (Ensure data is stored in formDB)
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "formDB", // ✅ Force database to be 'formDB'
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas (formDB)"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Define Schema & Model
const submissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }, // ✅ Added Phone Field
  resume: { type: String, required: true }, // Store file path
  createdAt: { type: Date, default: Date.now },
});

const Submission = mongoose.model("Submission", submissionSchema);

// Multer Setup (File Uploads)
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

// Form Submission Route
app.post("/submit", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, phone } = req.body; // ✅ Added Phone Field
    if (!req.file) return res.status(400).json({ error: "Resume file is required!" });

    const resumePath = `/uploads/${req.file.filename}`;

    const newSubmission = new Submission({ name, email, phone, resume: resumePath });
    await newSubmission.save();

    res.status(201).json({ message: "Submission Successful!", data: newSubmission });
  } catch (error) {
    console.error("❌ Submission Error:", error);
    res.status(500).json({ error: "Server Error. Try again later." });
  }
});

// View All Submissions (API)
app.get("/submissions", async (req, res) => {
  try {
    const submissions = await Submission.find();
    console.log("Fetched Submissions:", submissions); // ✅ Debugging Log
    res.json(submissions);
  } catch (error) {
    console.error("❌ Fetch Error:", error);
    res.status(500).json({ error: "Server Error. Try again later." });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
