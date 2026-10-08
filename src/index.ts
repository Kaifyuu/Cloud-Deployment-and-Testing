import express = require("express");
import cors = require("cors");
import mongoose from "mongoose";
import path from "path";
import dns = require("dns");
import { userRoutes } from "./routes/UserRoutes";

// Ensure SRV lookups work reliably on Windows networks for MongoDB Atlas
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {}

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

// MongoDB connection (optional - checks env var or config.json)
let mongoURI: string | undefined = process.env.MONGO_URI;

if (!mongoURI) {
  const fs = require("fs");
  const candidates = [
    path.join(__dirname, "config.json"),
    path.join(__dirname, "../src/config.json"),
    path.join(process.cwd(), "src", "config.json"),
    path.join(process.cwd(), "config.json"),
  ];

  for (const file of candidates) {
    if (fs.existsSync(file)) {
      try {
        const config = JSON.parse(fs.readFileSync(file, "utf8"));
        mongoURI = config.mongoURI;
        break;
      } catch {}
    }
  }
}

if (mongoURI) {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err: Error) => console.log("MongoDB connection error:", err.message));
} else {
  console.log("No MongoDB config found - running without database");
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
