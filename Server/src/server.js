import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// IMPORT ROUTES
import authRoutes from "./routes/auth.route.js";
import jobRoutes from "./routes/job.route.js";

// APIS
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);

app.listen(PORT, () => {
  console.log("Server is running on the port:", PORT);
});
