import axios from 'axios'

export function request(config) {
    // 1.创建axios实例
    const instance = axios.create({
        baseURL:"http://123.207.32.32:8000",
        // baseURL:"http://47.104.167.4:8090",
        timeout:5000
    });

    // 2.axios拦截器
    axios.interceptors.request.use(config => {
        return config;
    },err => {
        return err;
    });

    axios.interceptors.response.use(res => {
        return res.data;
    }, err => {
        return err;
    });

    // 3.发送真正的网络请求
    return instance(config);
}