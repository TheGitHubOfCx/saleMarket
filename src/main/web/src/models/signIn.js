import * as service from '../service/signIn'
import alert from "../common/alert";

export default {

  namespace: 'signIn',

  state: {
    userList: '',
    goodInfoList: '',
    orderInfoList: '',
    editVisible: false,
    recordValue: '',
    goodRecord: '',
    goodVisible: false,
    imgList: '',
    typeOfFood:''
  },

  subscriptions: {
    setup({dispatch, history}) {
    },
  },

  effects: {
    *userSignIn({payload, callback}, {call, put}){
      const {data} = yield call(service.userSignIn, payload)
      alert("登陆", data)
      callback(data.payload)
    },
    *userLayout({payload}, {call, put}){
      const {data} = yield call(service.userLayout)
      alert("注销", data)
      window.location.reload()
    }
  },

  reducers: {
    setState(state, action) {
      return {...state, ...action.payload}
    },
  },
}
