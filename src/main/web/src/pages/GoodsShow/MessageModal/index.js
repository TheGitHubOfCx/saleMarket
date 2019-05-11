/**
 * Created by Winna on 2017/6/16.
 */
import React, {Component} from "react";
import {Button, Tabs, Spin, notification, Form, Input, Avatar} from "antd";
import styles from "./index.less";
import {connect} from "dva";
import Editor from 'wangeditor'

const userId = window.sessionStorage.getItem("userId")
const Search = Input.Search;
const TabPane = Tabs.TabPane;
let editor = null
let content = null//编辑器内容
let contentHtml = null//编辑器html含样式


class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  componentWillMount() {
    const {dispatch, dataPlay} = this.props
    dispatch({type: 'dataPlay/queryMessage'})
  }

  componentDidMount() {
    this.initEditor()
  }


  //初始化编辑器
  initEditor() {
    const {dataPlay, dispatch} = this.props
    const {messageContent} = dataPlay
    let elem = this.refs.divElem
    editor = new Editor(elem);
    editor.customConfig.onchange = function (html) {
      // html 即变化之后的内容
      // 获取编辑器纯文本内容
      content = editor.txt.text()
      dispatch({type: 'dataPlay/setState', payload: {message: content}})
      contentHtml = editor.txt.html()
    }
    editor.customConfig.uploadImgShowBase64 = true  // 上传图片到服务器
    editor.create();
    messageContent ? editor.txt.html(messageContent.contentHtml) : void 0
  }

  handleOk(e) {
    e.stopPropagation()
    const {form, dispatch, dataPlay, history} = this.props
    let {message} = dataPlay
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (userId) {
        message ? dispatch({type: 'dataPlay/addMessage', payload: {message, userId}}) : notification['warning']({
          message: '提醒',
          description: '不可发布空白评论',
        })
      } else {
        notification['warning']({
          message: '提醒',
          description: '请先登陆再操作',
        })
      }
      form.resetFields();
    });
  }


  render() {
    const {dataPlay, form} = this.props
    let {getFieldDecorator} = form
    let {messageList, messageLoading} = dataPlay
    const formItemLayout = {labelCol: {span: 1}, wrapperCol: {span: 160}}
    return (
      <div className={styles.seaction}>
        <div className={styles.editorBox}>
          <Form onSubmit={(e) => this.handleOk(e)}>
            <Form.Item  {...formItemLayout}>
              <div ref='divElem' className={styles.editor}/>
            </Form.Item>
            <div className={styles.button}>
              <div className={styles.buttonStyle}>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  保存
                </Button>
              </div>
            </div>
          </Form>
        </div>
        <div className={styles.messageBox}>
          <Spin spinning={messageLoading}>
            {
              messageList ? messageList.map(data => {
                let dateee = new Date(data.createdDate).toJSON();
                let dataValue = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                return <div className={styles.message}>
                  <div className={styles.avatar}>
                    <Avatar>{data.createBy}</Avatar>
                  </div>
                  <div>
                    <div>
                      {data.message}
                    </div>
                    <div>{dataValue}</div>
                  </div>
                </div>
              }) : void(0)
            }
          </Spin>
        </div>
      </div>

    )
  }
}

Message = Form.create()(Message)
export default connect(({dataPlay}) => ({dataPlay}))(Message)
