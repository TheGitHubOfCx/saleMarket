import React, {Component} from 'react'
import styles from './index.less';
import {Menu, Icon, Input, Layout, Form, Modal, Table, Popconfirm, Select} from 'antd'
import {connect} from 'dva'
import router from 'umi/router';
import axios from 'axios'
import alert from '../../../common/alert'

const {Header, Sider, Content,} = Layout;
const Option = Select.Option;
const userId = window.sessionStorage.getItem("userId")
const SubMenu = Menu.SubMenu;
const pageSize = Math.floor((document.body.clientHeight - 460) / 48)


class GoodsModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyValue: '',
    }
  }

  componentWillMount() {
    const {dispatch} = this.props
    if (!userId) {
      router.push({
        pathname: '/',
      })
      return
    }
    axios.post('/queryOrderListByUserId', {userId: ''}).then(res => {
      dispatch({type: 'signIn/setState', payload: {orderInfoList: res.data.payload}})
    }).catch(err =>
      alert("查询", {code: 0})
    );
  }

  setVisible(record) {
    const {dispatch} = this.props
    dispatch({type: 'signIn/setState', payload: {editVisible: true, recordValue: record}})
  }

  cancel() {
    const {dispatch} = this.props
    dispatch({type: 'signIn/setState', payload: {editVisible: false}})
  }

  updateNotice(e) {
    e.stopPropagation()
    const {dispatch, form, signIn} = this.props
    let {recordValue} = signIn
    const {validateFields, resetFields} = form
    validateFields((errors, values) => {
      if (errors) {
        return
      }
      values['id'] = recordValue.id
      axios.post('/updateOrder', {values}).then(res => {
        if (res.data.code === 1) {
          axios.post('/queryOrderListByUserId', {userId: ''}).then(res => {
            dispatch({type: 'signIn/setState', payload: {orderInfoList: res.data.payload}})
          }).catch(err =>
            alert("查询", {code: 0})
          );
        }
        dispatch({type: 'signIn/setState', payload: {editVisible: false}})
      }).catch(err =>
        alert("修改", {code: 0})
      );
    })
    resetFields();
  }

  handleChange(e) {
    console.log('e', e)
  }

  confirm(record) {
    const {dispatch} = this.props
    axios.post('/delOrder', {id: record.id}).then(res => {
      if (res.data.code === 1) {
        axios.post('/queryOrderListByUserId', {userId: ''}).then(res => {
          dispatch({type: 'signIn/setState', payload: {orderInfoList: res.data.payload}})
        }).catch(err =>
          alert("查询", {code: 0})
        );
      }
      dispatch({type: 'signIn/setState', payload: {orderInfoList: res.data.payload}})
    }).catch(err =>
      alert("删除", {code: 0})
    );
  }

  render() {
    const {form, signIn} = this.props
    const {orderInfoList, editVisible, recordValue} = signIn
    const formItemLayout2 = {labelCol: {span: 5}, wrapperCol: {span: 15}}
    const {keyValue} = this.state
    let {getFieldDecorator} = form
    const columns = [{
      title: '商品名称',
      dataIndex: 'goodName',
      key: 'goodName',
      render: (text, record) => {
        return <a>{text ? text : "暂无"}</a>
      }
    }, {
      title: '单价',
      dataIndex: 'buyPrice',
      key: 'buyPrice',
      render: (text, record) => {
        return <a>{text ? "￥" + text : "暂无"}</a>
      }
    }, {
      title: '购买数量',
      dataIndex: 'buyNum',
      key: 'buyNum',
    }, {
      title: '总价',
      dataIndex: '',
      key: '',
      render: (text, record) => {
        return <a>￥{record.buyPrice * record.buyNum}</a>
      }
    }, {
      title: '下单时间',
      dataIndex: 'createDate',
      key: 'createDate',
    }, {
      title: '消费者',
      dataIndex: 'userId',
      key: 'userId',
    }, {
      title: '操作',
      dataIndex: '',
      key: '',
      width: '150px',
      render: (text, record) => {
        return <div>
          {/*<span><Icon type="edit" onClick={() => this.setVisible(record)}/> </span>*/}
          <span>
                      <Popconfirm title="确定删除该条数据吗?" onConfirm={() => this.confirm(record)} okText="确定" cancelText="取消">
                        <Icon type="delete"/>
                      </Popconfirm>
                    </span>
        </div>
      }
    }];
    return (
      <Layout className={styles.box}>
        <Layout>
          <Content className={styles.content}>
            <Table dataSource={orderInfoList} columns={columns}
                   pagination={{
                     pageSize: pageSize,
                   }}/>
          </Content>
        </Layout>
        <Modal
          title="编辑"
          visible={editVisible}
          okText="确定"
          cancelText="取消"
          onOk={(e) => this.updateNotice(e)}
          onCancel={() => this.cancel()}
        >
          <Form>
            <Form.Item label="用户名:" {...formItemLayout2}>
              {getFieldDecorator('name', {
                initialValue: recordValue ? recordValue.name : '',
                rules: [{
                  // validator: (ruler, value, callback) => this.checkName(ruler, value, callback)
                }],
              })(
                <Input
                  // onChange={(e) => this.setTitle(e.target.value)}
                  style={{width: '300px', marginRight: '30px'}}
                  placeholder="请输入用户名"/>
              )}
            </Form.Item>
            <Form.Item label="密码:" {...formItemLayout2}>
              {getFieldDecorator('password', {
                initialValue: recordValue ? recordValue.password : '',
                rules: [],
              })(
                <Input style={{width: '300px', marginRight: '30px'}}
                       placeholder="请输入密码"/>
              )}
            </Form.Item>
            <Form.Item label="手机号:" {...formItemLayout2}>
              {getFieldDecorator('phoneNum', {
                initialValue: recordValue ? recordValue.phoneNum : '',
                rules: [],
              })(
                <Input style={{width: '300px', marginRight: '30px'}}
                       placeholder="请输入手机号"/>
              )}
            </Form.Item>
            <Form.Item label="性别:" {...formItemLayout2}>
              {getFieldDecorator('sex', {
                initialValue: recordValue ? recordValue.sex : '',
                rules: [],
              })(
                <Select defaultValue={recordValue ? recordValue.sex : ''}
                        style={{width: '300px', marginRight: '30px'}}
                        onChange={(e) => this.handleChange(e)}>
                  <Option value="男">男</Option>
                  <Option value="女">女</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="角色:" {...formItemLayout2}>
              {getFieldDecorator('userType', {
                initialValue: recordValue ? recordValue.userType : '',
                rules: [],
              })(
                <Select defaultValue={recordValue ? recordValue.userType : ''}
                        style={{width: '300px', marginRight: '30px'}}
                        onChange={(e) => this.handleChange(e)}>
                  <Option value="0">消费者</Option>
                  <Option value="1">管理员</Option>
                </Select>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </Layout>
    )
  }
}
GoodsModal = Form.create()(GoodsModal)
export default connect(({signIn}) => ({signIn}))(GoodsModal)

