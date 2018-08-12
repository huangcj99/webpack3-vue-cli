import {
  Indicator,
  MessageBox
} from 'mint-ui'
import axios from 'axios'
import errorHook from './500'

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
    headers: {
      Authorization: 'asdasdasd'
    },
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

    //401
    if (error && error.response && error.response.status === 401) {

      return Promise.reject(error) 
    }

    // 500错误针对个别url进行处理
    if (error && error.response && error.response.status === 500) {
      // 匹配url执行函数
      if (errorHook[error.response.config.url]) {
        errorHook[error.response.config.url]()
        
        return Promise.reject(error) 
      }
    }

    if (error && error.config && error.config.showDefaultError !== false) {
      const message = (error.response.data && error.response.data.msg) || error.message
      MessageBox.alert(message)
    }

    return Promise.reject(error)
  })

  return instance
}

export default createAxios