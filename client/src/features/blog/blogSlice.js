import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: "blog",
    initialState: {
        blogs: [],
        currentBlog: null,
        loading: false,
        error: null
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setBlogs: (state, action) => {
            state.blogs = action.payload;
            state.loading = false;
        },
        setCurrentBlog: (state, action) => {
            state.currentBlog = action.payload;
            state.loading = false;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const { setLoading, setBlogs, setCurrentBlog, setError } = blogSlice.actions;
export default blogSlice.reducer;
