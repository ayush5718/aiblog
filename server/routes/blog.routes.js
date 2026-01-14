import express from "express";
import { createBlog, editBlog, deleteBlog, tooglePublished, getAllBlogByAdmin, getAllBlogByUser, getSingleBlogByUser, getSingleBlogByAdmin } from "../controllers/blog.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();

// public routes for users (must be BEFORE parameterized routes)
router.get("/blogs", getAllBlogByUser);
router.get("/blogs/:slug", getSingleBlogByUser);

// protected routes requires authorization
router.post("/create-blog", authMiddleware, createBlog);
router.put("/:id", authMiddleware, editBlog);
router.delete("/:id", authMiddleware, deleteBlog);
router.patch("/:id/publish", authMiddleware, tooglePublished);
router.get("/", authMiddleware, getAllBlogByAdmin);
router.get("/:id", authMiddleware, getSingleBlogByAdmin);

export default router;