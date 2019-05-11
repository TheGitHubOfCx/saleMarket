import axios from 'axios'

export async function queryUserList() {
  return axios.post('/queryUserList')
}

export async function getGoodList(payload) {
  return axios.post('/getGoodList', payload)
}

export async function goodsPagin(payload) {
  return axios.post('/goodsPagin', payload)
}

export async function addMessage(payload) {
  return axios.post('/addMessage', payload)
}

export async function queryMessage(payload) {
  return axios.post('/queryMessage', payload)
}







