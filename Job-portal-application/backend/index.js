import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

// Load cron jobs
import "./cron/jobScheduler.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS settings
const corsOptions = {
  origin: process.env.NODE_ENV === "production"
    ? [process.env.FRONTEND_URL] // e.g., "https://yourfrontend.com"
    : ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));

// API routes
app.get("/api", (req, res) => res.send("Backend is running!"));
app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

// Start server after DB connection
const PORT = process.env.PORT || 5001;
import path from "path";

// Serve static frontend
app.use(express.static(path.join(path.resolve(), "frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(path.resolve(), "frontend/dist", "index.html"));
});

connectDB()
  .then(() => {
    console.log("✅ MongoDB connected...");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB", err);
    process.exit(1);
  });
