/**
 * Created by Winna on 2017/6/16.
 */
import React, {Component} from "react";
import {Avatar, Dropdown, Button, Icon, Select, Form, Input, notification} from "antd";
import styles from "./index.less";
import {connect} from "dva";

const Option = Select.Option;
const userId = window.sessionStorage.getItem("userId")

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 60,
      liked: true,
    };
  }

  componentWillMount() {

  }

  countDown() {
    const {count} = this.state;
    if (count === 1) {
      this.setState({
        count: 60,
        liked: true,
      });
    } else {
      this.setState({
        count: count - 1,
        liked: false,
      });
      setTimeout(this.countDown.bind(this), 1000);
    }
  }

  handleClick() {
    const {dispatch, register} = this.props;
    let {phoneNum, sendMsg} = register
    const {liked} = this.state;
    if (!liked) {
      return;
    }
    dispatch({type: "register/getVcode", payload: {phoneNum}})
    this.countDown();
  }

  setPhoneNum(value) {
    const {dispatch} = this.props
    dispatch({type: 'register/setState', payload: {phoneNum: value}})
  }

  handleOk() {
    const {form, dispatch, register, history} = this.props
    let {passWord} = register
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      dispatch({
        type: 'register/addUser',
        payload: {userName: values.userName, sex: values.sex, phoneNum: values.phoneNum, passWord}, callback: (res) => {
          if (res !== '0') {
            history.push('/' + 'signIn')
          } else {
            // form.resetFields();
            history.push('/' + 'register')
          }
        }
      })
      form.resetFields();
    });
  }

  nameChecked(rule, value, callback) {
    if (value && value.length > 10) {
      callback(`用户名长度不可超过10`)
    }
    callback()
  }

  codeChecked(rule, value, callback) {
    const {register} = this.props
    let {sendMsg} = register
    if (value && sendMsg && sendMsg !== value) {
      callback("验证码输入错误")
    }
    callback()
  }

  phoneNumChecked(rule, value, callback) {
    callback()
  }

  passWordChecked(rule, value, callback) {
    var patt = new RegExp(/\s+/g);
    if (value && value.length < 6) {
      callback('密码位数不得少于6位数')
    }
    if (patt.test(value)) {
      callback('密码不可含有空格')
    }
    callback()
  }

  repeatPassWordChecked(rule, value, callback) {
    const {register} = this.props
    let {passWord} = register
    var patt = new RegExp(/\s+/g);
    if (value && passWord && passWord !== value) {
      callback('重复密码输入不一致')
    }
    if (patt.test(value)) {
      callback('密码不可含有空格')
    }
    callback()
  }

  setPassWord(passWord) {
    const {dispatch} = this.props
    dispatch({type: 'register/setState', payload: {passWord}})
  }

  render() {
    const {register, form} = this.props
    let {count, liked} = this.state
    let {phoneNum} = register
    let {getFieldDecorator} = form
    const formItemLayout = {labelCol: {span: 1}, wrapperCol: {span: 10}}
    return (
      <section className={styles.section}>
        <div className={styles.formBox}>
          <div className={styles.title}>
            <div className={styles.titleName}>注册</div>
            <div></div>
          </div>
          <Form onSubmit={() => this.handleOk()}>
            <Form.Item label=" 用户名:" {...formItemLayout}>
              {getFieldDecorator('userName', {
                rules: [{required: true, message: '请输入用户名'}, {
                  validator: (rule, value, callback) => this.nameChecked(rule, value, callback)
                }],
              })(
                <Input placeholder="请输入用户名"/>
              )}
            </Form.Item>
            <Form.Item
              label=" 性 别:" {...formItemLayout}
            >
              {getFieldDecorator('sex', {
                rules: [{required: true, message: '请选择性别'}],
              })(
                <Select showSearch placeholder="请选择性别">
                  <option value="男">男</option>
                  <option value="女">女</option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label=" 密 码:" {...formItemLayout}>
              {getFieldDecorator('passWord', {
                rules: [{required: true, message: '请输入密码'}, {
                  validator: (rule, value, callback) => this.passWordChecked(rule, value, callback)
                }],
              })(
                <Input type="password" placeholder="请输入密码(密码位数不得少于6位数)"
                       onChange={(e) => this.setPassWord(e.target.value)}/>
              )}
            </Form.Item>
            <Form.Item label="重复密码:" {...formItemLayout}>
              {getFieldDecorator('repeatPassWord', {
                rules: [{required: true, message: '请输入重复密码'}, {
                  validator: (rule, value, callback) => this.repeatPassWordChecked(rule, value, callback)
                }],
              })(
                <Input type="password" placeholder="请输入密码(密码位数不得少于6位数)"/>
              )}
            </Form.Item>
            <Form.Item
              label=" 手机号:" {...formItemLayout}
            >
              {getFieldDecorator('phoneNum', {
                rules: [{required: true, message: '请输入手机号'},
                  {
                    validator: (rule, value, callback) => this.phoneNumChecked(rule, value, callback)
                  }],
              })(
                <Input value={phoneNum} onChange={(e) => this.setPhoneNum(e.target.value)} placeholder="请输入手机号"/>
              )}
            </Form.Item>
            <Form.Item
              label=" 验证码:" {...formItemLayout}
            >
              {getFieldDecorator('vCode', {
                rules: [{required: true, message: '请输入验证码'},
                  {
                    validator: (rule, value, callback) => this.codeChecked(rule, value, callback)
                  }],
              })(
                <Input placeholder="免费获取验证码" addonAfter={<Button onClick={() => this.handleClick()}>
                  {
                    liked ? '获取验证码' : `${count} 秒后重发`
                  }
                </Button>}/>
              )}
            </Form.Item>
            <div className={styles.button}>
              <Button type="primary" htmlType="submit" className="login-form-button">
                注册
              </Button>
            </div>
          </Form>
        </div>

      </section>
    )
  }
}
Register = Form.create()(Register)
export default connect(({register}) => ({register}))(Register)
