import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import recommendationRoutes from "./routes/recommendationRoute";
import { errorHandler } from "./middlewares/errorMiddleware";

dotenv.config({ override: true });

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
    res.json({ status: "OK", service: "recommendation-service" });
});

app.use("/api/recommendations", recommendationRoutes);

app.use(errorHandler);

export default app;
