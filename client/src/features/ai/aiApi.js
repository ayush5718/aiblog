import api from "../../services/axios.js"

export const generateTitleApi = async (topic) => {
    const res = await api.post("/ai/generate-title", { topic });
    return res.data;
}

export const generateContentApi = async (title) => {
    const res = await api.post("/ai/generate-content", { title });
    return res.data;
}

export const generateImageApi = async (blogId) => {
    const res = await api.post(`/ai/generate-image/${blogId}`);
    return res.data;
}
