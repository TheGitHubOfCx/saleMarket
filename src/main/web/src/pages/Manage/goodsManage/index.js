import React, {Component} from 'react'
import styles from './index.less';
import {Menu, Icon, Input, Layout, Form, Modal, Table, Popconfirm, Select, Button} from 'antd'
import {connect} from 'dva'
import router from 'umi/router';
import axios from 'axios'
import alert from '../../../common/alert'

const {Header, Sider, Content,} = Layout;
const Option = Select.Option;
const userId = window.sessionStorage.getItem("userId")
const SubMenu = Menu.SubMenu;
const pageSize = Math.floor((document.body.clientHeight - 460) / 48)


class OrderModal extends Component {
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
    axios.post('/getGoodList', {type: '', input: '', foodType: ''}).then(res => {
      dispatch({type: 'signIn/setState', payload: {goodInfoList: res.data.payload}})
    }).catch(err =>
      alert("查询", {code: 0})
    );
  }

  setVisible(record) {
    const {dispatch} = this.props
    dispatch({type: 'signIn/setState', payload: {goodVisible: true, goodRecord: record}})
  }

  cancel() {
    const {dispatch} = this.props
    dispatch({type: 'signIn/setState', payload: {goodVisible: false}})
  }

  updateNotice(e) {
    e.stopPropagation()
    const {dispatch, form, signIn} = this.props
    let {goodRecord} = signIn
    const {validateFields, resetFields} = form
    validateFields((errors, values) => {
      if (errors) {
        return
      }
      if (goodRecord) {
        values['id'] = goodRecord.id
        axios.post('/updateGoods', {values}).then(res => {
          if (res.data.code === 1) {
            axios.post('/getGoodList', {type: '', input: '', foodType: ''}).then(res => {
              dispatch({type: 'signIn/setState', payload: {goodInfoList: res.data.payload}})
            }).catch(err =>
              alert("查询", {code: 0})
            );
          }
          dispatch({type: 'signIn/setState', payload: {goodVisible: false, goodRecord: ''}})
        }).catch(err =>
          alert("修改", {code: 0})
        );
      } else {
        axios.post('/addGoods', {values}).then(res => {
          if (res.data.code === 1) {
            axios.post('/getGoodList', {type: '', input: '', foodType: ''}).then(res => {
              dispatch({type: 'signIn/setState', payload: {goodInfoList: res.data.payload}})
            }).catch(err =>
              alert("查询", {code: 0})
            );
          }
          dispatch({type: 'signIn/setState', payload: {goodVisible: false, goodRecord: ''}})
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
    axios.post('/delGoods', {id: record.id}).then(res => {
      if (res.data.code === 1) {
        axios.post('/getGoodList', {type: '', input: '', foodType: ''}).then(res => {
          dispatch({type: 'signIn/setState', payload: {goodInfoList: res.data.payload}})
        }).catch(err =>
          alert("查询", {code: 0})
        );
      }
      dispatch({type: 'signIn/setState', payload: {goodRecord: ''}})
    }).catch(err =>
      alert("删除", {code: 0})
    );
  }

  addGoods() {
    const {dispatch} = this.props
    dispatch({type: 'signIn/setState', payload: {goodVisible: true}})
  }

  setFoodType(e) {
    const {dispatch} = this.props
    dispatch({type: 'signIn/setState', payload: {typeOfFood: e}})
  }

  render() {
    const {form, signIn} = this.props
    const {goodInfoList, goodVisible, goodRecord, typeOfFood} = signIn
    const formItemLayout2 = {labelCol: {span: 5}, wrapperCol: {span: 15}}
    const {keyValue} = this.state
    let {getFieldDecorator} = form
    const columns = [{
      title: '商品名称',
      dataIndex: 'goodsName',
      key: 'goodsName',
      render: (text, record) => {
        return <a>{text ? text : "暂无"}</a>
      }
    }, {
      title: '单价',
      dataIndex: 'goodsPrice',
      key: 'buyPrice',
      render: (text, record) => {
        return <a>{text ? "￥" + text : "暂无"}</a>
      }
    }, {
      title: '类型',
      dataIndex: 'goodsType',
      key: 'goodsType',
    }, {
      title: '图片',
      dataIndex: 'imgSrc',
      key: 'imgSrc',
    }, {
      title: '产地',
      dataIndex: 'originPlace',
      key: 'originPlace',
    }, {
      title: '销量',
      dataIndex: 'salesvolume',
      key: 'salesvolume',
      render: (text) => {
        return <span>{text ? text + "件" : "暂无" }</span>
      }
    }, {
      title: '零食类型',
      dataIndex: 'foodType',
      key: 'foodType',
      render: (text) => {
        return <span>{text === '0' ? "糕点类" : text === '1' ? "坚果类" : text === '2' ? "糖果类" : text === '3' ? "饼干类" : "暂无" }</span>
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
        <div>
          <div>
            <Button type="primary" onClick={() => this.addGoods()} style={{float: "right"}}>新增</Button>
          </div>
        </div>
        <Layout>
          <Content className={styles.content}>
            <Table dataSource={goodInfoList} columns={columns}
                   pagination={{
                     pageSize: pageSize,
                   }}/>
          </Content>
        </Layout>
        <Modal
          title="编辑"
          visible={goodVisible}
          okText="确定"
          cancelText="取消"
          onOk={(e) => this.updateNotice(e)}
          onCancel={() => this.cancel()}
        >
          <Form>
            <Form.Item label="商品名称:" {...formItemLayout2}>
              {getFieldDecorator('goodsName', {
                initialValue: goodRecord ? goodRecord.goodsName : '',
                rules: [{
                  // validator: (ruler, value, callback) => this.checkName(ruler, value, callback)
                }],
              })(
                <Input
                  // onChange={(e) => this.setTitle(e.target.value)}
                  style={{width: '300px', marginRight: '30px'}}
                  placeholder="请输入商品名"/>
              )}
            </Form.Item>
            <Form.Item label="单价:" {...formItemLayout2}>
              {getFieldDecorator('goodsPrice', {
                initialValue: goodRecord ? goodRecord.goodsPrice : '',
                rules: [],
              })(
                <Input style={{width: '300px', marginRight: '30px'}}
                       placeholder="请输入单价"/>
              )}
            </Form.Item>
            <Form.Item label="类型:" {...formItemLayout2}>
              {getFieldDecorator('goodsType', {
                initialValue: goodRecord ? goodRecord.goodsType : '',
                rules: [],
              })(
                <Select defaultValue={goodRecord ? goodRecord.goodsType : ''}
                        style={{width: '300px', marginRight: '30px'}}
                        onChange={(e) => this.handleChange(e)}>
                  <Option value="hot">热卖食品</Option>
                  <Option value="discount">打折促销</Option>
                  <Option value="import">进口食品</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="图片:" {...formItemLayout2}>
              {getFieldDecorator('imgSrc', {
                initialValue: goodRecord ? goodRecord.imgSrc : '',
                rules: [],
              })(
                <Input style={{width: '300px', marginRight: '30px'}}
                       placeholder="请输入图片地址"/>
              )}
            </Form.Item>
            <Form.Item label="产地:" {...formItemLayout2}>
              {getFieldDecorator('originPlace', {
                initialValue: goodRecord ? goodRecord.originPlace : '',
                rules: [],
              })(
                <Input style={{width: '300px', marginRight: '30px'}}
                       placeholder="请输入产地"/>
              )}
            </Form.Item>
            <Form.Item label="食品类型:" {...formItemLayout2}>
              {getFieldDecorator('foodType', {
                initialValue: typeOfFood ? typeOfFood : goodRecord.foodType,
                rules: [],
              })(
                <div style={{width: '300px', marginRight: '30px'}}>
                  <Select value={typeOfFood ? typeOfFood : goodRecord.foodType} placeholder="请选择零食类型"
                          style={{width: '300px', marginRight: '30px'}} onChange={(e) => this.setFoodType(e)}>
                    <option value='0'>糕点类</option>
                    <option value='1'>坚果类</option>
                    <option value='2'>糖果类</option>
                    <option value='3'>饼干类</option>
                  </Select>
                </div>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </Layout>
    )
  }
}
OrderModal = Form.create()(OrderModal)
export default connect(({signIn}) => ({signIn}))(OrderModal)

