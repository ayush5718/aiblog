import api from "../../services/axios.js"

export const getBlogsApi = async () => {
    const res = await api.get("/blog/blogs");
    return res.data;
}

export const getSingleBlogApi = async (slug) => {
    const res = await api.get(`/blog/blogs/${slug}`);
    return res.data;
}

export const getAdminBlogsApi = async () => {
    const res = await api.get("/blog/");
    return res.data;
}

export const createBlogApi = async (data) => {
    const res = await api.post("/blog/create-blog", data);
    return res.data;
}

export const editBlogApi = async (id, data) => {
    const res = await api.put(`/blog/${id}`, data);
    return res.data;
}

export const deleteBlogApi = async (id) => {
    const res = await api.delete(`/blog/${id}`);
    return res.data;
}

export const togglePublishApi = async (id, isPublished) => {
    const res = await api.patch(`/blog/${id}/publish`, { is_published: isPublished });
    return res.data;
}

export const getAdminSingleBlogApi = async (id) => {
    const res = await api.get(`/blog/${id}`);
    return res.data;
}
