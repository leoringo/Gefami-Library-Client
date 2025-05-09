// import { http } from "./baseUrl";

// // !! Response interceptor: Save token after login
// http.interceptors.response.use(
//   (response) => {
//     console.log(`here`);
//     console.log(response.config.url, `<< url`);
//     console.log(response, `<< respons`);
//     if (response.config.url?.includes("/login") && response.data?.token) {
//       localStorage.setItem("token", response.data.token);
//     }
//     return response;
//   },
//   (error) => {
//     console.log(error, `<< error`);
//     return Promise.reject(error);
//   }
// );

// // !! Request interceptor: Attach token and headers to every request
// http.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//       config.headers["User-id"] = "ifabula";
//       config.headers["Scope"] = "user";
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
