import request from '../plugins/axios'

export const getRecoArticles = function (params) {
  return request({
    method: 'GET',
    url: '/v1_1/articles',
    params
  })
}
