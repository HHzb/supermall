//封装axios
import axios from "axios";

export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/m5",
    timeout: 5000
  });

  //2.1请求拦截
  instance.interceptors.request.use(
    config => {
      return config;
    },
    err => {
      console.log(err);
    }
  );
  //2.2响应拦截
  instance.interceptors.request.use(
    res => {
      return res;
    },
    err => {
      console.log(err);
    }
  );

  //3.发送真正的网络请求
  return instance(config);
}