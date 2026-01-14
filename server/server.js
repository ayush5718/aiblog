import "dotenv/config";
import express from "express";
import { pool } from "./db/index.js"
import cors from "cors";

//routes import
import authRoutes from "./routes/auth.routes.js"
import blogRoutes from "./routes/blog.routes.js"
import aiRoutes from "./routes/ai.routes.js"
const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(cors());


pool.query("Select 1")
    .then(() => console.log("DB test successful"))
    .catch(err => console.error("DB test failed", err.message));

//routes


app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/ai", aiRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

