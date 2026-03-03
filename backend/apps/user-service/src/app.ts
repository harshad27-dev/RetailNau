import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoute";
import { errorHandler } from "./middlewares/errorMiddleware";

dotenv.config({ override: true });

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (_req, res) => {
    res.json({ status: "User Service Running" });
});

app.use("/api/users", userRoutes);

app.use(errorHandler);

export default app;