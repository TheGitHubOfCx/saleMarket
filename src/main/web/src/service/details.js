import axios from 'axios'

export async function getGoodsById(payload) {
  return axios.post('/getGoodsById', payload)
}

export async function addShopCar(payload) {
  return axios.post('/addShopCar', payload)
}

export async function addCommentById(payload) {
  return axios.post('/addCommentById', payload)
}

export async function queryCartList(payload) {
  return axios.post('/queryCartList', payload)
}

export async function deleteGoodOfCart(payload) {
  return axios.post('/deleteGoodOfCart', payload)
}

export async function changeGoodNum(payload) {
  return axios.post('/changeGoodNum', payload)
}

export async function queryOrderListByUserId(payload) {
  return axios.post('/queryOrderListByUserId', payload)
}

export async function deleteOrderById(payload) {
  return axios.post('/deleteOrderById', payload)
}

export async function addOrder(payload) {
  return axios.post('/addOrder', payload)
}

export async function queryCommentList(payload) {
  return axios.post('/queryCommentList', payload)
}

export async function queryAdressById(payload) {
  return axios.post('/queryAdressById', payload)
}

export async function useAddress(payload) {
  return axios.post('/useAddress', payload)
}

export async function addAddress(payload) {
  return axios.post('/addAddress', payload)
}

export async function getGoodInfo(payload) {
  return axios.post('/getGoodInfo', payload)
}








