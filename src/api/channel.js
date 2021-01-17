import request from '@/plugins/axios.js'

export const getAllChannels = function () {
  return request({
    url: '/v1_0/channels',
    method: 'GET',
    noToken: true
  })
}

export const addMyChannels = function (data) {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data
  })
}

export const delMyChannels = function (target) {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}
