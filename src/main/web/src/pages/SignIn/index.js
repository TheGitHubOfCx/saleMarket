/**
 * Created by Winna on 2017/6/16.
 */
import React, {Component} from "react";
import {Avatar, Dropdown, Button, Icon, Select, Form, Input, notification} from "antd";
import styles from "./index.less";
import {connect} from "dva";

const Option = Select.Option;
const userId = window.sessionStorage.getItem("userId")

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  componentWillMount() {

  }

  handleOk() {
    const {form, dispatch, history} = this.props
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      dispatch({
        type: 'signIn/userSignIn',
        payload: {userName: values.userName, inPassWord: values.inPassWord}, callback: (res) => {
          if (res === '1') {
            history.push('/')
            window.location.reload()
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

  passWordChecked(rule, value, callback) {
    var patt = new RegExp(/\s+/g);
    if (value && value.length < 4) {
      callback('密码位数不得少于4位数')
    }
    if (patt.test(value)) {
      callback('密码不可含有空格')
    }
    callback()
  }

  register() {
    const {history} = this.props
    history.push("/register")
  }

  render() {
    const {signIn, form} = this.props
    let {getFieldDecorator} = form
    const formItemLayout = {labelCol: {span: 1}, wrapperCol: {span: 10}}
    return (
      <section className={styles.section}>
        <div className={styles.formBox}>
          <div className={styles.title}>
            <div className={styles.titleName}>登陆</div>
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
            <Form.Item label=" 密 码:" {...formItemLayout}>
              {getFieldDecorator('inPassWord', {
                rules: [{required: true, message: '请输入密码'}, {
                  validator: (rule, value, callback) => this.passWordChecked(rule, value, callback)
                }],
              })(
                <Input type="password" placeholder="请输入密码(密码位数不得少于6位数)"/>
              )}
            </Form.Item>
            <div className={styles.button}>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陆
              </Button>
            </div>
            <div className={styles.register} onClick={() => this.register()}>
              <a type="primary" className="login-form-button">
                注册
              </a>
            </div>
          </Form>
        </div>
      </section>
    )
  }
}
SignIn = Form.create()(SignIn)
export default connect(({signIn}) => ({signIn}))(SignIn)
