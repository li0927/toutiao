import axios from 'axios'
import store from '../store/index.js'
import { Toast } from 'vant'
import { refreshToken } from '../api/user.js'

const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net/'
})

request.interceptors.request.use((config) => {
  if (!config.noToken) {
    config.headers.Authorization =
      'Bearer ' + (store.state.user.token ? store.state.user.token : '')
  }
  return config
})

request.interceptors.response.use(
  // 成功的预处理函数
  (res) => {
    return res
  },
  // 失败的预先处理函数
  function (err) {
    // console.log(err.response, err.config)
    // 这两个东西打印出来是一样的
    const { response: res, config: cfg } = err
    if (res.status === 401) {
      // refreshToken(store.state.user.refresh_token).catch((err) => {
      //   if (err.response.status === 403) {
      //     console.log('111')
      //     router.push('/login')
      //   }
      // })
      // 为什么要把最外层的返回出去,因为这是axios发请求,返回出去外面才能接受到新发出的请求的各项相应结果，从而做特殊处理
      return refreshToken(store.state.user.refresh_token).then(() => {
        // console.log(res)
        console.log(111)
        // store.commit('refreshToken', res.data.token)
        return request(cfg)
      })
    }
    let errmsg = cfg.errMsgMap ? cfg.errMsgMap[res.status] : ''
    if (!errmsg) {
      // errmsg = res.statusText
      const msg = res.data.message
      errmsg = msg instanceof String ? msg : JSON.stringify(msg)
    }
    Toast.fail(errmsg)
    return Promise.reject(err)
    // throw err
  }
)

export default request
