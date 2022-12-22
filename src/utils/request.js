import axios from 'axios'
import router from "@/router";

const request = axios.create({
    baseURL: '/universal-prefix',  // 统一前缀
})

// 请求白名单，如果请求在白名单里面，将不会被拦截校验权限
const whiteUrls = ["/user/login", '/user/register', '/user/logout', '/user/**',
    '/file/download',
    '/multi-voice/separate/by-source-audio-url', '/single-voice/**']

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';

    let loginUserJson = sessionStorage.getItem("login-user");
    if (!whiteUrls.includes(config.url) && false) {      // !!! 这里暂且不拦截，到部署时再改为拦截
        if ( loginUserJson == null) {
            router.push("/user/login").then(res => {
                // ElMessage("请先登录，再访问界面");
            });
        } else {
            let user = JSON.parse(loginUserJson);
            config.headers['token'] = user.token;  // 设置请求头
        }
    }

    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }

        // console.log(res.code);

        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)


export default request

