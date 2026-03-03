import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import analyticsRoutes from "./routes/analyticsRoute";
import { errorHandler } from "./middlewares/errorMiddleware";

dotenv.config({ override: true });

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
    res.json({ status: "OK", service: "analytics-service" });
});

app.use("/api/analytics", analyticsRoutes);

app.use(errorHandler);

export default app;
