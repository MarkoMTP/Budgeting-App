import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import registerRouter from "./routes/register&LoginRoutes";
import { categoryRoute } from "./routes/categoryRoutes";
import { transactionRoute } from "./routes/transactionRoutes";

dotenv.config();

export const app = express();

app.use(passport.initialize());

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));
app.use(registerRouter);
app.use(transactionRoute);
app.use(categoryRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on ${PORT}`));
