/**
 * Created by Winna on 2017/6/16.
 */
import React, {Component} from "react";
import {Avatar, Modal, Button, Icon, Select, Form, Input, notification} from "antd";
import styles from "./index.less";
import {connect} from "dva";
import DistPicker from 'react-distpicker';

const Option = Select.Option;
const userId = window.sessionStorage.getItem("userId")

class Adress extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  componentWillMount() {
    const {details, dispatch} = this.props

  }

  onSelect(e) {
    const {details, dispatch} = this.props
    dispatch({type: 'details/setState', payload: {address: e}})
  }

  useAddress(addressId) {
    const {dispatch} = this.props
    dispatch({type: 'details/useAddress', payload: {addressId, userId}})
  }

  changeNewVisible() {
    const {dispatch} = this.props
    dispatch({type: 'details/setState', payload: {newVisible: true}})
  }

  handleCancel() {
    const {dispatch} = this.props
    dispatch({type: 'details/setState', payload: {newVisible: false}})
  }

  addNewAddress() {
    const {dispatch, details, form} = this.props
    let {address} = details
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      dispatch({
        type: 'details/addAddress',
        payload: {
          userName: values.userName,
          phoneNum: values.phoneNum,
          address: address,
          detailAddress: values.detailAddress,
          userId,
        }
      })
      dispatch({type: 'details/setState', payload: {newVisible: false}})
      form.resetFields();
    });
  }


  render() {
    const {details, addressList, form} = this.props
    let {getFieldDecorator} = form
    let {newVisible} = details
    const formItemLayout = {labelCol: {span: 5}, wrapperCol: {span: 18}}
    return (
      <section className={styles.dispickerBox}>
        <div className={styles.addAddress}>
          <a onClick={() => this.changeNewVisible()}><Icon type="plus"/>新增收获地址</a>
        </div>
        <div className={styles.dispickerDiv}>
          {
            addressList ? addressList.map(data => {
              return <div className={styles.addressDetail}>
                <div className={styles.user}>
                  <div>
                    收货人：{data.userName}
                  </div>
                  <div>
                    {data.isUseed === '1' ?
                      <Button size="small" type="primary"><Icon type="check"/>使用</Button> :
                      <Button size="small" onClick={() => this.useAddress(data.adressId)}>使用</Button>}
                  </div>
                </div>
                <div>联系电话：{data.phoneNum}</div>
                <div>
                  地址：<DistPicker selectClass={styles.dispicker} placeholderProvince={data.province}
                                 placeholderCity={data.city}
                                 placeholderDistrict={data.area}/>
                </div>
                <div>详细地址：{data.detailAdress}</div>
              </div>
            }) : void 0
          }
        </div>
        <div className={styles.modelBox}>
          <Modal
            title="新增收获地址"
            visible={newVisible}
            onOk={() => this.addNewAddress()}
            onCancel={() => this.handleCancel()}
          >
            <Form>
              <Form.Item label=" 收货人:" {...formItemLayout}>
                {getFieldDecorator('userName', {
                  rules: [{required: true, message: '请输入收货人姓名'}, {
                    // validator: (rule, value, callback) => this.nameChecked(rule, value, callback)
                  }],
                })(
                  <Input placeholder="请输入收货人姓名"/>
                )}
              </Form.Item>
              <Form.Item label=" 联系电话:" {...formItemLayout}>
                {getFieldDecorator('phoneNum', {
                  rules: [{required: true, message: '请输入联系电话'}, {
                    // validator: (rule, value, callback) => this.passWordChecked(rule, value, callback)
                  }],
                })(
                  <Input placeholder="请输入联系电话"/>
                )}
              </Form.Item>
              <Form.Item label=" 地址:" {...formItemLayout}>
                {getFieldDecorator('address')(
                  <DistPicker selectClass={styles.dispicker} onSelect={(e) => this.onSelect(e)}/>
                )}
              </Form.Item>
              <Form.Item label=" 详细地址:" {...formItemLayout}>
                {getFieldDecorator('detailAddress', {
                  rules: [{required: true, message: '请输入收货详细地址'}, {
                    // validator: (rule, value, callback) => this.passWordChecked(rule, value, callback)
                  }],
                })(
                  <Input placeholder="请输入收货详细地址"/>
                )}
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </section>
    )
  }
}
Adress = Form.create()(Adress)
export default connect(({details}) => ({details}))(Adress)
