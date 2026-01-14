import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { generateBlogContent, generateTitle, generateBlogImg } from "../controllers/ai.controller.js";
import { aiRateLimiter } from "../middlewares/aiRateLimiter.js";
const router = express();


// all ai routes (protected routes) and rate limiter included
router.post("/generate-title", authMiddleware, aiRateLimiter, generateTitle);
router.post("/generate-content", authMiddleware, aiRateLimiter, generateBlogContent);
router.post("/generate-image/:id", authMiddleware, aiRateLimiter, generateBlogImg);

export default router;