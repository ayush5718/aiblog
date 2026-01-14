import api from "../../services/axios.js"

export const loginApi = async (data) => {
    try {
        const response = await api.post("/auth/login", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }

}