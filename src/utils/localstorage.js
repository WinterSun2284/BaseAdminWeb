// import {message} from "antd";

//localstorage读取
const setStorage = (name, data) => {

    let obj = {
        data: data,
        time: Date.now(),
        expire: 1800000
    };
    //localStorage 设置的值不能为对象,转为json字符串
    localStorage.setItem(name, JSON.stringify(obj));
}

const getStorage = (name) => {
    let val = localStorage.getItem(name);
    if (!val) {
        return val;
    }
    val = JSON.parse(val);
    if (Date.now() - val.time > val.expire) {
        localStorage.removeItem(name);
        return null;
    }
    return val.data;
}

const getToken = () => {
    let val = localStorage.getItem('token');
    if (!val) {
        return val;
    }
    val = JSON.parse(val);
    if (Date.now() - val.time > val.expire) {
        localStorage.removeItem('token');
        return null;
    }
    return val.data;
}

const removeStorage = (name) => {
    window.localStorage.removeItem(name);
}

export {
    setStorage,
    getStorage,
    removeStorage,
    getToken
}
