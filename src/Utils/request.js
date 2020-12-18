import axios from 'axios'
import qs from 'qs'
import { Message, Loading, MessageBox } from 'element-ui'

import router from '@/router/index'
import { statusMessage, codeList } from '@/utils/request-code'
import BaseURL from '../config/BaseURL'
// fetch方法参数说明
// contentType为true   --  application/x-www-form-urlencoded;charset=UTF-8

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: BaseURL.URL,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 3000000, // request timeout
  headers: {
    'redirectUrl': window.location.origin
  }
})
// 服务名称拼接
// 定义loading变量
let loading
// 使用Element loading-start 方法
function startLoading () {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
// 使用Element loading-close 方法
function endLoading () {
  loading.close()
}

// 那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
// 声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
// 调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0
export function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}
export function tryHideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

// request interceptor
service.interceptors.request.use(
  (config) => {
    // debugger
    // 组合生成对一个url
    // config.baseURL = getBaseUrl(config.baseURL, config.iiotType)
    config.headers['x-req-flag'] = 1
    // eslint-disable-next-line no-unused-expressions
    config.authToken ? config.headers['authToken'] = config.authToken : ''
    if (config.contentType) {
      if (config.contentType === 1) {
        config.headers['Content-Type'] = 'multipart/form-data'
      } else {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      }
      if (config.method === 'post') {
        config.data = qs.stringify(config.data)
      }
    }
    if (config.showLoading === 1) {
      showFullScreenLoading()
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    if (response.config.showLoading === 1) {
      tryHideFullScreenLoading()
    }
    return response
  },
  (error) => {
    return error.response
  }
)
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response['data']
  }
  const errortext = statusMessage[response.status] || response.statusText
  const error = new Error(errortext)
  error.status = response.status
  error.response = response
  throw error
}

const checkCode = (res) => {
  // 检查与服务器端协定的code是否正确
  const errorCodeMsg = codeList[res.code]
  if (errorCodeMsg) {
    const error = new Error(res.message)
    error.code = res.code
    error.codeErrorCtx = res
    throw error
  } else {
    return res
  }
}

const fetch = ({ url, data, params, method, contentType, authToken, showLoading }) => {
  return service({
    url,
    method,
    data,
    params,
    contentType,
    authToken,
    showLoading
  })
    .then(checkStatus)
    .then(checkCode)
    .catch((error) => {
      const { status, code, codeErrorCtx } = error
      if (status) {
        switch (status) {
          // 401: 未登录
          // 未登录则跳转登录页面，并携带当前页面的路径
          // 在登录成功后返回当前页面，这一步需要在登录页操作。
          case 401:
            // router.replace({
            //   path: '/login',
            //   query: { redirect: router.currentRoute.fullPath }
            // })
            break
          // 403 token过期
          // 登录过期对用户进行提示
          // 清除本地token和清空vuex中token对象
          // 跳转登录页面
          case 403:
            // Toast({
            //   message: '登录过期，请重新登录',
            //   duration: 1000,
            //   forbidClick: true
            // })
            // 清除token
            // localStorage.removeItem('token')
            // store.commit('loginSuccess', null)
            // // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
            // setTimeout(() => {
            //   router.replace({
            //     path: '/login',
            //     query: {
            //       redirect: router.currentRoute.fullPath
            //     }
            //   })
            // }, 1000)
            break
          // 404请求不存在
          case 404:
            // router.push('/404')
            break
          // 其他错误，直接抛出错误提示
          default:
            Message({
              message: error.message,
              type: 'error',
              duration: 4 * 1000
            })
        }
      }
      // error code 对应操作
      if (code) {
        switch (code) {
          case 10000: {
            // 如果需要登录，跳转到登录页
            const data = codeErrorCtx.data
            if (process.env.NODE_ENV === 'development') {
              window.location.href = `${data.login_url}?grant_type=${data.grant_type}&scope=${data.scope}&response_type=${data.response_type}&secret=654321&client_id=label-develop&redirect_uri=http://web.labelserver.dev.ai.ebiot.net`
            } else {
              window.location.href = `${data.login_url}?grant_type=${data.grant_type}&scope=${data.scope}&response_type=${data.response_type}&secret=${data.secret}&client_id=label-test&redirect_uri=${process.env.VUE_APP_HOST}`
            }
            return new Promise(function () { })
          }
          case 10001:
            Message({
              message: `${error.message}`,
              type: 'error',
              duration: 4 * 1000
            })
            router.replace({
              path: '/login',
              query: {
                // redirect: router.currentRoute.fullPath
              }
            })
            break
          case 10008:
            MessageBox.alert('会话已超时，请重新登录', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                router.replace({
                  path: '/login',
                  query: {
                    redirect: router.currentRoute.fullPath
                  }
                })
              }
            })
            break
          default:
            Message({
              message: `${error.message}`,
              type: 'error',
              duration: 4 * 1000
            })
        }
      }
    })
}
export default fetch
