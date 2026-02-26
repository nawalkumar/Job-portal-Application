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

// ADD THIS: Import sanitizer for testing
import sanitizeHTML from "./utils/sanitizeHTML.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
  origin: [
    "http://localhost:5173",                              // local dev (Vite)
    "http://localhost:5011",                              // if you use CRA sometimes
    "https://job-portal-application-ot68.vercel.app",     // ← YOUR REAL VERCEL URL
    "https://job-portal-application-ot68.vercel.app/",
  ],
  credentials: true,                                      // very important for cookies/JWT
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));


// API routes
app.get("/api", (req, res) => res.send("Backend is running!"));
app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);

// TEST ROUTE: Only in development
if (process.env.NODE_ENV !== "production") {
  app.get("/test-sanitize", (req, res) => {
    const dirty =
      "<script>alert('xss')</script><p><strong>Hello</strong> <a href='https://example.com'>Link</a></p>";
    const clean = sanitizeHTML(dirty);
    res.send(`
      <div style="font-family: monospace; padding: 20px;">
        <h2 style="color: green;">Sanitizer Test (Dev Only)</h2>
        <hr>
        <p><strong>Dirty HTML:</strong></p>
        <pre style="background:#f4f4f4; padding:10px; border-radius:5px;">${dirty}</pre>
        <p><strong>Clean HTML:</strong></p>
        <pre style="background:#e8f5e9; padding:10px; border-radius:5px;">${clean}</pre>
        <p>Script tag removed | Safe tags kept</p>
      </div>
    `);
  });
}

// Serve React frontend in production
// if (process.env.NODE_ENV === "production") {
//   const buildPath = path.join(__dirname, "../client/build");
//   app.use(express.static(buildPath));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(buildPath, "index.html"));
//   });
// } else {
// Development: Serve Vite/React from frontend/dist
// const frontendDist = path.join(path.resolve(), "frontend/dist");
// app.use(express.static(frontendDist));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(frontendDist, "index.html"));
// });
// }

// Start server after DB connection
const PORT = process.env.PORT || 5001;

connectDB()
  .then(() => {
    console.log("MongoDB connected...");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      if (process.env.NODE_ENV !== "production") {
        console.log(`Test Sanitizer: http://localhost:${PORT}/test-sanitize`);
      }
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });
