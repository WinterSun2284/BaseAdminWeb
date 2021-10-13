import axios from 'axios';
import {getToken} from '../../utils/localstorage'

// axios.defaults.baseURL = 'http://localhost:8080';
// axios.defaults.timeout = 5000;

const instance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 5000,
    headers: {
        'Content-Type': "application/json;charset=utf-8"
    }
})

//添加拦截
instance.interceptors.request.use(config => {
    config.headers.common['token'] = getToken();
    console.log(config)

    return config
}, error => {
    console.log(error)
})

instance.interceptors.response.use(res => {

    return res.data
}, error => {
    return error;
})

export default instance;
