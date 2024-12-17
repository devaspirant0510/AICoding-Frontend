import axios from "axios";
import useAuthStore from "../store/AuthStore.ts";
import Cookies from "js-cookie";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true, // 리프레시 토큰은 쿠키로 전송
});

api.interceptors.request.use( (config) => {
    const { getAccessToken,reGenAccessToken } = useAuthStore.getState();
    const token = getAccessToken();
    if (token)
        config.headers.Authorization = `Bearer ${token}`;
    return config;
});
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const refreshToken = Cookies.get("refreshToken")
        const originalRequest = error.config;
        const { getAccessToken } = useAuthStore.getState();
        if(!getAccessToken() && !refreshToken)
            return Promise.resolve();
        if (!getAccessToken() || error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const { reGenAccessToken } = useAuthStore.getState();
            await reGenAccessToken(); // 새 액세스 토큰 발급
            const { getUser } = useAuthStore.getState();
            await getUser();
            return api(originalRequest); // 재요청
        }
        return Promise.reject(error);
    }
);


export default api;
