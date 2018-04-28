import {
    Toast,
    Indicator,
    MessageBox
} from 'mint-ui'
import axios from 'axios'

let loadingCount = 0

function showLoading() {
    loadingCount++ 
    if (loadingCount <= 1) {
        Indicator.open() 
    }
}

function closeLoading() {
    if (loadingCount > 0) {
        loadingCount-- 
    }

    if (loadingCount === 0) {
        Indicator.close() 
    }
}

function createAxios() {
    let instance = null

    instance = axios.create({
        timeout: 1000 * 10
    });

    // Add a request interceptor
    instance.interceptors.request.use((config) => {
        if (config.loading !== false) {
            showLoading() 
        }
        return config 
    }, (error) => {
        // Do something with request error
        if (error.config.loading !== false) {
            closeLoading() 
        }
        return Promise.reject(error) 
    }) 

    // Add a response interceptor
    instance.interceptors.response.use((response) => {
        if (response.config.loading !== false) {
            closeLoading() 
        }
        return response 
    }, (error) => {
        // Do something with response error
        if (error && error.config && error.config.loading !== false) {
            closeLoading() 
        }

        // //401 token过期，则拿旧的token换取新的，成功则刷新页面
        // if (error && error.response && error.response.status === 401) {
        //     axios({
        //         method: 'post',
        //         headers: {
        //             Authorization: token
        //         },
        //         url: '/api/v1/p/refresh'
        //     })
        //         .then((res) => {
        //             if (res && res.data) {
        //                 storage.setItem('renbo-user-info', res.data)
        //                 storage.setItem('renbo-token', res.data.token)

        //                 window.location.reload()
        //             }
        //         })

        //     return Promise.reject(error) 
        // }

        // // 500错误针对个别url进行处理
        // if (error && error.response && error.response.status === 500) {
        //     let todoObj = {
        //         '/api/v1/p/vcode': () => {
        //             Toast('手机号已注册')

        //             setTimeout(() => {
        //                 window.location.reload()
        //             }, 500)
        //         }
        //     }

        //     if (todoObj[error.response.config.url]) {
        //         todoObj[error.response.config.url]()
        //         return Promise.reject(error) 
        //     }
        // }

        if (error && error.config && error.config.showDefaultError !== false) {
            const message = (error.response.data && error.response.data.msg) || error.message 
            MessageBox.alert(message) 
        }

        return Promise.reject(error) 
    }) 

    return instance 
}


export default {
    install: function (Vue, options) {
        Vue.prototype.$axios = createAxios()
    }
}