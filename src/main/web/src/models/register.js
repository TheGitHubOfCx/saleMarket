import * as service from '../service/register'
import alert from "../common/alert";

export default {

  namespace: 'register',

  state: {
    sendMsg: '',//验证码
    phoneNum: '',//手机号
    passWord: ''//密码
  },

  subscriptions: {
    setup({dispatch, history}) {
    },
  },

  effects: {
    *registerUser({payload}, {call, put}){
      const {data} = yield call(service.registerUser, payload)
      alert("注册", data)
      // yield put({type: 'setState', payload: {userList: data.payload}})
    },
    *getVcode({payload}, {call, put}){
      const {data} = yield call(service.getVcode, payload)
      if (data.code === 0) {
        alert("验证码发送", data)
      } else {
        let object = eval('(' + data.payload + ')')
        yield put({type: 'setState', payload: {sendMsg: object.obj}})
      }
    },
    *addUser({payload, callback}, {call, put}){
      const {data} = yield call(service.addUser, payload)
      if (data.payload !== '0') {
        alert("注册", data)
      } else {
        alert("该用户已存在", {code: 0, exception: '该用户已存在', tips: '该用户已存在'})
      }
      callback(data.payload)

    }
  },

  reducers: {
    setState(state, action) {
      return {...state, ...action.payload}
    },
  },
}
