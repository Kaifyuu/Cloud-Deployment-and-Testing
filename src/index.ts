import express = require("express");
import cors = require("cors");
import mongoose from "mongoose";
import path from "path";
import { userRoutes } from "./routes/UserRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.send("Hello, world! - 955108 Software Deployment");
});

app.use("/api/users", userRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// MongoDB connection (optional - only if config exists)
try {
  const config = require("./config.json");
  mongoose
    .connect(config.mongoURI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err: Error) => console.log("MongoDB connection optional:", err.message));
} catch {
  console.log("No config.json found - running without MongoDB");
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
