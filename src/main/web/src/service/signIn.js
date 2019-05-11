import axios from 'axios'

export async function userSignIn(payload) {
  return axios.post('/userSignIn.do', payload)
}

export async function userLayout() {
  return axios.post('/userLayout.do')
}





