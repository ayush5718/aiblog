import { createSlice } from "@reduxjs/toolkit";

const aiSlice = createSlice({
    name: "ai",
    initialState: {
        loading: false,
        error: null
    },
    reducers: {
        setAiLoading: (state, action) => {
            state.loading = action.payload;
        },
        setAiError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const { setAiLoading, setAiError } = aiSlice.actions;
export default aiSlice.reducer;
