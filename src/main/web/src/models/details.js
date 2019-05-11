import * as service from '../service/details'
import alert from "../common/alert";

export default {

  namespace: 'details',

  state: {
    goodDetail: '',
    cartList: '',
    orderList: '',
    commentList: '',
    goodNum: 1,
    messageContent: '',
    comment: '',
    messageLoading: false,
    addressList: '',
    newVisible: false,
    address: '',
    buyVisible: false,
    useredAddress: '',
    orderId: '',
    buyOrderVisible: false,
    goodInfo: '',
  },

  subscriptions: {
    setup({dispatch, history}) {
    },
  },

  effects: {
    *getGoodsById({payload}, {call, put}){
      const {data} = yield call(service.getGoodsById, payload)
      yield put({type: 'setState', payload: {goodDetail: data.payload}})
    },
    *addShopCar({payload}, {call, put}){
      const {data} = yield call(service.addShopCar, payload)
      alert("加入购物车", data)
      yield put({type: 'queryCartList', payload: {userId: payload.userId}})
    },
    *addCommentById({payload}, {call, put}){
      const {data} = yield call(service.addCommentById, payload)
      yield put({type: 'queryCommentList', payload: {goodId: payload.goodId}})
    },
    *queryCartList({payload}, {call, put}){
      const {data} = yield call(service.queryCartList, payload)
      yield put({type: 'setState', payload: {cartList: data.payload}})
    },
    *deleteGoodOfCart({payload}, {call, put}){
      const {data} = yield call(service.deleteGoodOfCart, payload)
      yield put({type: 'queryCartList', payload: {userId: payload.userId}})
    },
    *changeGoodNum({payload}, {call, put}){
      const {data} = yield call(service.changeGoodNum, payload)
      yield put({type: 'queryCartList', payload: {userId: payload.userId}})
    },
    *queryOrderListByUserId({payload}, {call, put}){
      const {data} = yield call(service.queryOrderListByUserId, payload)
      yield put({type: 'setState', payload: {orderList: data.payload}})
    },
    *deleteOrderById({payload}, {call, put}){
      const {data} = yield call(service.deleteOrderById, payload)
      yield put({type: 'queryOrderListByUserId', payload: {userId: payload.userId}})
    },
    *addOrder({payload}, {call, put}){
      const {data} = yield call(service.addOrder, payload)
      alert("新增订单", data)
      yield put({type: 'queryCartList', payload: {userId: payload.userId}})
      yield put({type: 'queryOrderListByUserId', payload: {userId: payload.userId}})
    },
    *queryCommentList({payload}, {call, put}){
      yield put({type: 'setState', payload: {messageLoading: true}})
      const {data} = yield call(service.queryCommentList, payload)
      yield put({type: 'setState', payload: {commentList: data.payload, messageLoading: false}})
    },
    *queryAdressById({payload}, {call, put}){
      const {data} = yield call(service.queryAdressById, payload)
      if (data.payload) {
        for (let i in data.payload) {
          if (data.payload[i].isUseed === '1') {
            yield put({type: 'setState', payload: {useredAddress: data.payload[i]}})
          }
        }
      }
      yield put({type: 'setState', payload: {addressList: data.payload}})
    },
    *useAddress({payload}, {call, put}){
      const {data} = yield call(service.useAddress, payload)
      yield put({type: 'queryAdressById', payload: {userId: payload.userId}})
    },
    *addAddress({payload}, {call, put}){
      const {data} = yield call(service.addAddress, payload)
      alert("新增地址", data)
      yield put({type: 'queryAdressById', payload: {userId: payload.userId}})
    },
    *getGoodInfo({payload}, {call, put}){
      const {data} = yield call(service.getGoodInfo, payload)
      yield put({type: 'setState', payload: {goodInfo: data.payload}})
    },
  }

  ,

  reducers: {
    setState(state, action) {
      return {...state, ...action.payload}
    },
  },
}
