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
    const {dispatch, details} = this.props
    let goodId = window.sessionStorage.getItem("goodId")
    dispatch({type: 'details/queryCommentList', payload: {goodId}})
  }

  componentDidMount() {
    this.initEditor()
  }


  //初始化编辑器
  initEditor() {
    const {details, dispatch} = this.props
    const {messageContent} = details
    let elem = this.refs.divElem
    editor = new Editor(elem);
    editor.customConfig.onchange = function (html) {
      // html 即变化之后的内容
      // 获取编辑器纯文本内容
      content = editor.txt.text()
      dispatch({type: 'details/setState', payload: {comment: content}})
      contentHtml = editor.txt.html()
    }
    editor.customConfig.uploadImgShowBase64 = true  // 上传图片到服务器
    editor.create();
    messageContent ? editor.txt.html(messageContent.contentHtml) : void 0
  }

  handleOk(e, goodId) {
    e.stopPropagation()
    const {form, dispatch, dataPlay, details} = this.props
    let {comment} = details
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (userId) {
        comment ? dispatch({
          type: 'details/addCommentById',
          payload: {comment, userId, goodId}
        }) : notification['warning']({
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
    const {details, form, goodDetail, commentList} = this.props
    let {getFieldDecorator} = form
    let {messageLoading} = details
    const formItemLayout = {labelCol: {span: 1}, wrapperCol: {span: 160}}
    return (
      <div className={styles.seaction}>
        <div className={styles.editorBox}>
          <Form onSubmit={(e) => this.handleOk(e, goodDetail.id)}>
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
              commentList ? commentList.map(data => {
                let dateee = new Date(data.createDate).toJSON();
                let dataValue = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                return <div className={styles.message}>
                  <div className={styles.avatar}>
                    <Avatar>{data.userId}</Avatar>
                  </div>
                  <div>
                    <div>
                      {data.content}
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
export default connect(({details}) => ({details}))(Message)
