import request from '../plugins/axios'
import store from '../store/index.js'
// import {mapMutations} from 'vant'
import router from '../router/index.js'

export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data,
    noToken: true,
    errMsgMap: { 400: '手机号或验证码错误' }
  })
}

export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`,
    noToken: true,
    errMsgMap: {
      404: '手机号码不正确',
      429: '发送太频繁了，请稍后重试'
    }
  })
}

export function refreshToken(refreshToken) {
  return request({
    url: '/v1_0/authorizations',
    method: 'PUT',
    headers: { Authorization: 'Bearer ' + refreshToken },
    noToken: true
  })
    .then(({ data: res }) => {
      console.log(res.data.token)
      store.commit('refreshToken', res.data.token)
      return res
    })
    .catch((err) => {
      if (err.response.status === 403) {
        console.log('123')
        router.push('/login')
      }
      throw err
    })
}

export const getUserPersonalInfor = () => {
  return request({
    url: '/v1_0/user',
    method: 'GET'
  })
}

export const getUserChannelList = () => {
  return request({
    url: '/v1_0/user/channels',
    method: 'GET'
  })
}
