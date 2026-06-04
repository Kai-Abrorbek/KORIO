import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 - 토큰 자동 추가
api.interceptors.request.use(
  (config) => {
    // 나중에 AsyncStorage에서 토큰 가져와서 추가할 거야
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터 - 에러 처리
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message ?? "UNKNOWN_ERROR";
    return Promise.reject(new Error(message));
  },
);

export default api;
