import * as service from '../service/dataPlay'
import alert from "../common/alert";

export default {

  namespace: 'dataPlay',

  state: {
    userList: [],//用户List
    goodsList: '',//商品列表
    current: 1,//当前页
    disCurrent: 1,//当前页
    impCurrent: 1,//当前页
    hotPaginList: '',//热卖商品分页List
    disPaginList: '',//促销商品分页List
    impPaginList: '',//进口促销商品分页List
    hotLoading: false,//热卖商品加载
    disLoading: false,//促销商品Loading
    imLoading: false,//进口商品Loading
    disCountList: '',//促销商品List
    importList: '',//进口商品List
    messageContent: '',//留言内容
    message: '',//编辑框输入值
    messageLoading: false,
    messageList: '',
    drawerVisible: false,
    drawerType: ''
  },

  subscriptions: {
    setup({dispatch, history}) {
    },
  },

  effects: {
    *queryUserList({payload}, {call, put}){
      const {data} = yield call(service.queryUserList)
      yield put({type: 'setState', payload: {userList: data.payload}})
    },
    *hotGoodList({payload}, {call, put}){
      yield put({type: 'setState', payload: {hotLoading: true}})
      const {data} = yield call(service.getGoodList, payload)
      yield put({type: 'setState', payload: {goodsList: data.payload}})
      yield put({type: 'setState', payload: {hotLoading: false}})
    },
    *discountGoodList({payload}, {call, put}){
      yield put({type: 'setState', payload: {disLoading: true}})
      const {data} = yield call(service.getGoodList, payload)
      yield put({type: 'setState', payload: {disCountList: data.payload}})
      yield put({type: 'setState', payload: {disLoading: false}})
    },
    *importGoodList({payload}, {call, put}){
      yield put({type: 'setState', payload: {imLoading: true}})
      const {data} = yield call(service.getGoodList, payload)
      yield put({type: 'setState', payload: {importList: data.payload}})
      yield put({type: 'setState', payload: {imLoading: false}})
    },
    *hotTypePagin({payload}, {call, put}){
      yield put({type: 'setState', payload: {hotLoading: true}})
      const {data} = yield call(service.goodsPagin, payload)
      yield put({type: 'setState', payload: {hotPaginList: data.payload, current: payload.current}})
      yield put({type: 'setState', payload: {hotLoading: false}})
    },
    *disTypePagin({payload}, {call, put}){
      yield put({type: 'setState', payload: {disLoading: true}})
      const {data} = yield call(service.goodsPagin, payload)
      yield put({type: 'setState', payload: {disPaginList: data.payload, disCurrent: payload.current}})
      yield put({type: 'setState', payload: {disLoading: false}})
    },
    *impTypePagin({payload}, {call, put}){
      yield put({type: 'setState', payload: {imLoading: true}})
      const {data} = yield call(service.goodsPagin, payload)
      yield put({type: 'setState', payload: {impPaginList: data.payload, impCurrent: payload.current}})
      yield put({type: 'setState', payload: {imLoading: false}})
    },
    *queryMessage({payload}, {call, put}){
      yield put({type: 'setState', payload: {messageLoading: true}})
      const {data} = yield call(service.queryMessage)
      yield put({type: 'setState', payload: {messageList: data.payload}})
      yield put({type: 'setState', payload: {messageLoading: false, message: ''}})
    },
    *addMessage({payload}, {call, put}){
      yield put({type: 'setState', payload: {messageLoading: true}})
      const {data} = yield call(service.addMessage, payload)
      alert("发布留言", data)
      yield put({type: 'queryMessage'})
      yield put({type: 'setState', payload: {messageLoading: false, message: ''}})
    }
  },

  reducers: {
    setState(state, action) {
      return {...state, ...action.payload}
    },
  },
}
