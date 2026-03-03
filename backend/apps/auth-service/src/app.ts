import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoute";
import { errorHandler } from "./middlewares/errorMiddleware";

dotenv.config({ override: true });

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ── Health Check ─────────────────────────── */
app.get("/health", (_req, res) => {
    res.json({ status: "OK", service: "auth-service" });
});

/* ── Routes ───────────────────────────────── */
app.use("/api/auth", authRoutes);

/* ── Global Error Handler ─────────────────── */
app.use(errorHandler);

export default app;

