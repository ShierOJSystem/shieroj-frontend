/**
 * @author Shier
 * @createTime 2023/8/24 星期四 17:13
 */
import axios from "axios";
import { OpenAPI } from "../../backapi";

// 携带凭证
OpenAPI.WITH_CREDENTIALS = true;
const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8104"
    : "http://oj.kongshier.top";

OpenAPI.BASE = baseUrl;
console.log("当前环境：", process.env.NODE_ENV, "请求地址", baseUrl);

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 携带token方式登录
// axios.interceptors.request.use(
//   (config) => {
//     // 假设token存在localStorage中
//     const token = localStorage.getItem("token");
//     console.log("token:", token);
//     if (token) {
//       config.headers.Authorization = token;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    console.log("全局响应", response);
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
