import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.router.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use("/auth", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Auth Service listening on port ${PORT}`);
});