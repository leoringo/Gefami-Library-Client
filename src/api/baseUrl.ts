import axios from "axios";
import { store } from "../store/store";
import { setLoading } from "../views/loading/loadingSlice";
import { showError } from "../views/globalError/globalErrorSlice";

const apiUrl = "http://localhost:3000";

export const http = axios.create({
  baseURL: apiUrl,
});

// !! Response interceptor: Save token after login
http.interceptors.response.use(
  (response) => {
    store.dispatch(setLoading(false));
    if (response.config.url?.includes("/login") && response.data?.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
    }
    return response;
  },
  (error) => {
    const message = error?.response?.data?.message ?? "Unexpected Error!";

    store.dispatch(setLoading(false));
    store.dispatch(showError(message));
    return Promise.reject(error);
  }
);

// !! Request interceptor: Attach token and headers to every request
http.interceptors.request.use(
  (config) => {
    store.dispatch(setLoading(true));
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    store.dispatch(setLoading(false));
    return Promise.reject(error);
  }
);
