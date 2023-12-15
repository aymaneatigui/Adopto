import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import errorHandler from "./errors/errorHandler";
import protect from "./middleware/protected";
import authRoute from "./routes/authRoute";
import profileRoute from "./routes/profileRoute";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", protect, (req, res) => {
  res.status(200);
  res.json({ message: "Get /" });
});

app.use("/auth", authRoute);
app.use("/settings", protect, profileRoute);

app.use(errorHandler);

export default app;
