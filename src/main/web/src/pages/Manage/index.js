import React, {Component} from 'react'
import styles from './index.less';
import {Menu, Icon, Input, Layout, Form, Modal, Table, Popconfirm, Select,Button} from 'antd'
import {connect} from 'dva'
import router from 'umi/router';
import axios from 'axios'
import alert from '../../common/alert'
import OrderModal from './goodsManage/index'
import GoodsModal from './OrderManage/index'

const {Header, Sider, Content,} = Layout;
const Option = Select.Option;
const userId = window.sessionStorage.getItem("userId")
const SubMenu = Menu.SubMenu;
const pageSize = Math.floor((document.body.clientHeight - 460) / 48)


class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyValue: 'user',
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
    axios.post('/queryUserList').then(res => {
      dispatch({type: 'signIn/setState', payload: {userList: res.data.payload}})
    }).catch(err =>
      alert("查询", {code: 0})
    );
  }

  handleMenuClick(e) {
    const {dispatch} = this.props
    this.setState({keyValue: e.key})
    if ("user" === e.key) {
      axios.post('/queryUserList').then(res => {
        dispatch({type: 'signIn/setState', payload: {userList: res.data.payload}})
      }).catch(err =>
        alert("查询", {code: 0})
      );
    } else if ("goods" === e.key) {
      axios.post('/getGoodList', {input: '', type: ''}).then(res => {
        dispatch({type: 'signIn/setState', payload: {goodInfoList: res.data.payload}})
      }).catch(err =>
        alert("查询", {code: 0})
      );
    } else if ("order" === e.key) {
      axios.post('/queryOrderListByUserId', {userId: ''}).then(res => {
        dispatch({type: 'signIn/setState', payload: {orderInfoList: res.data.payload}})
      }).catch(err =>
        alert("查询", {code: 0})
      );
    }
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
      if (recordValue) {
        values['id'] = recordValue.id
        axios.post('/updateUser', {values}).then(res => {
          if (res.data.code === 1) {
            axios.post('/queryUserList').then(res => {
              dispatch({type: 'signIn/setState', payload: {userList: res.data.payload}})
            }).catch(err =>
              alert("查询", {code: 0})
            );
          }
          dispatch({type: 'signIn/setState', payload: {editVisible: false, recordValue: ''}})
        }).catch(err =>
          alert("修改", {code: 0})
        );
      } else {
        axios.post('/addUserInfo', {values}).then(res => {
          if (res.data.code === 1) {
            axios.post('/queryUserList').then(res => {
              dispatch({type: 'signIn/setState', payload: {userList: res.data.payload}})
            }).catch(err =>
              alert("查询", {code: 0})
            );
          }
          dispatch({type: 'signIn/setState', payload: {editVisible: false, recordValue: ''}})
        }).catch(err =>
          alert("修改", {code: 0})
        );
      }

    })
    resetFields();
  }

  handleChange(e) {
    console.log('e', e)
  }

  confirm(record) {
    const {dispatch} = this.props
    axios.post('/delUserInfo', {id: record.id}).then(res => {
      if (res.data.code === 1) {
        axios.post('/queryUserList').then(res => {
          dispatch({type: 'signIn/setState', payload: {userList: res.data.payload}})
        }).catch(err =>
          alert("查询", {code: 0})
        );
      }
      dispatch({type: 'signIn/setState', payload: {recordValue: ''}})
    }).catch(err =>
      alert("查询", {code: 0})
    );
  }

  addGoods() {
    const {dispatch} = this.props
    dispatch({type: 'signIn/setState', payload: {editVisible: true}})
  }

  render() {
    const {form, signIn} = this.props
    const {userList, goodInfoList, orderInfoList, editVisible, recordValue} = signIn
    const formItemLayout2 = {labelCol: {span: 5}, wrapperCol: {span: 15}}
    const {keyValue} = this.state
    let {getFieldDecorator} = form
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return <a href={record.content} target="_blank">{text ? text : "暂无"}</a>
      }
    }, {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
    }, {
      title: '手机号',
      dataIndex: 'phoneNum',
      key: 'phoneNum',
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    }, {
      title: '身份',
      dataIndex: 'userType',
      key: 'userType',
      render: (text) => {
        return <div>
          {text === '1' ? "管理员" : "消费者"}
        </div>
      }
    }, {
      title: '操作',
      dataIndex: '',
      key: '',
      width: '150px',
      render: (text, record) => {
        return <div>
          <span><Icon type="edit" onClick={() => this.setVisible(record)}/> </span>
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
        <Sider className={styles.sider}>
          <div className={styles.warpperHeader}>
            <img src="img/logo.svg"/>
          </div>
          <div className={styles.user}>
            <div className={styles.userWrapper}>
              <div className={styles.profileImage}>
                <img src="img/user.svg"/>
              </div>
              <div className={styles.textWrapper}>
                <p className={styles.profileName}>你好 {userId}</p>
                <div>
                  <small className={styles.designation}>管理员</small>
                </div>
              </div>
            </div>
          </div>
          <Menu defaultSelectedKeys={['user']} className={styles.menu}
                defaultOpenKeys={['sub']}
                onClick={(e) => {
                  this.handleMenuClick(e)
                }} mode="inline">
            <Menu.Item key="user"><Icon type="tags" className={styles.icon}/>用户管理</Menu.Item>
            <Menu.Item key="goods"><Icon type="shop" className={styles.icon}/>商品管理</Menu.Item>
            <Menu.Item key="order"><Icon type="export" className={styles.icon}/>订单管理</Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className={styles.herder}>
            <div className={styles.headerLeft}>欢迎使用优乐零食网后台管理系统</div>
          </Header>
          <Content className={styles.content}>
            {keyValue === 'user' ? <div>
              <div>
                <Button type="primary" onClick={() => this.addGoods()} >新增</Button>
              </div>
            </div> : void 0}
            {keyValue === 'user' ? <Table dataSource={userList} columns={columns}
                                          pagination={{
                                            pageSize: pageSize,
                                          }}/> : keyValue === 'order' ? <GoodsModal/> : <OrderModal/>}
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
Index = Form.create()(Index)
export default connect(({signIn}) => ({signIn}))(Index)

