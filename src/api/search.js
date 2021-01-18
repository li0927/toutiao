import request from '../plugins/axios'

export const getSearchSuggestion = (params) => {
  return request({
    url: '/v1_0/suggestion',
    method: 'GET',
    params
  })
}

export const getSearchResult = (params) => {
  return request({
    url: '/v1_0/search',
    method: 'GET',
    params
  })
}
