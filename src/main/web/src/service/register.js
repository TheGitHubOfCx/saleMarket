import axios from 'axios'

export async function registerUser(payload) {
  return axios.post('/registerUser', payload)
}

export async function getVcode(payload) {
  return axios.post('/getVcode', payload)
}

export async function addUser(payload) {
  return axios.post('/addUser', payload)
}

export async function login(payload) {
  return axios.post('/login.do', payload)
}




