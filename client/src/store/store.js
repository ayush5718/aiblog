import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js"
import blogReducer from "../features/blog/blogSlice.js"
import aiReducer from "../features/ai/aiSlice.js"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        blog: blogReducer,
        ai: aiReducer,
    },
});
