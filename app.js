import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";
import pitchRouter from "./router/pitchRouter.js";
import userRouter from "./router/userRouter.js";


const app = express();
dotenv.config()

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      process.env.DASHBOARD_URL,
      "https://investment-journal-phi.vercel.app"
    ],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/pitch", pitchRouter);
app.use("/api/v1/user", userRouter);
dbConnection();

app.listen(8000, () => {
  console.log("server started");
});
export default app;
