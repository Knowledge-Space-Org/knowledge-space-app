import elasticsearch from 'elasticsearch'

export const esclient = new elasticsearch.Client({
  host: process.env.REACT_APP_ES_URL
  // Log: 'trace'
})

export const API_END_POINT = process.env.REACT_APP_API_END_POINT; 