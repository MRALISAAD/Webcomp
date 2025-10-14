import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import leadRoutes from "./routes/leads.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.get("/health", (_, res) => res.send("API OK ✅"));
app.use("/api/leads", leadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Backend ready on :${PORT}`);
});
