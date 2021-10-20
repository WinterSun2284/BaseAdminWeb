import axios from 'axios';
import {getToken, removeStorage} from '../../utils/localstorage'
import Modal from "antd/es/modal/Modal";

// axios.defaults.baseURL = 'http://localhost:8080';
// axios.defaults.timeout = 5000;

const instance = axios.create({
    baseURL: "http://192.168.1.109:8080",
    timeout: 500000,
    headers: {
        'Content-Type': "application/json;charset=utf-8"
    }
})

//添加拦截
instance.interceptors.request.use(config => {
    config.headers.common['token'] = getToken();

    return config
}, error => {
    console.log(error)
})

instance.interceptors.response.use(res => {
    //token无效，跳转到登录页面
    if (res.data.code === 407) {
        Modal.error({
            title: '登录失效',
            content: "token无效或者登录过期，将跳转到登录页面",
            onOk: (values) => {
                removeStorage('token')
                removeStorage('user')
                window.location.href = '/'
            }
        });

    }

    return res.data
}, error => {
    return error;
})

export default instance;
