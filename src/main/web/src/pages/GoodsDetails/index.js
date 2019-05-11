/**
 * Created by Winna on 2017/6/16.
 */
import React, {Component} from "react";
import {Avatar, InputNumber, Button, Modal, Select, Form, Input, notification} from "antd";
import styles from "./index.less";
import {connect} from "dva";
import Message from "./MessageModal/index";

const Option = Select.Option;
const userId = window.sessionStorage.getItem("userId")

class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  componentWillMount() {
    const {details, dispatch} = this.props
    let goodId = window.sessionStorage.getItem("goodId")
    dispatch({type: 'details/getGoodsById', payload: {goodId}})
    dispatch({type: 'details/queryCommentList', payload: {goodId}})
  }

  changeNum(value) {
    const {details, dispatch} = this.props
    dispatch({type: 'details/setState', payload: {goodNum: value}})
  }

  addCart() {
    if (userId) {
      const {details, dispatch} = this.props
      let {goodDetail, goodNum} = details
      dispatch({type: 'details/addShopCar', payload: {goodId: goodDetail.id, userId, goodNum}})
    } else {
      notification['warning']({
        message: '提醒',
        description: '请先登陆再操作',
      })
    }
  }

  buyGoodDetail() {
    const {dispatch} = this.props
    dispatch({type: 'details/setState', payload: {buyVisible: true}})
  }

  bugHandleOk() {
    const {dispatch, details} = this.props
    let {goodDetail, goodNum} = details
    if (userId) {
      dispatch({
        type: 'details/addOrder',
        payload: {userId, goodId: goodDetail.id, buyNum: goodNum, cartId: '', code: '1', orderId: ''}
      })
    } else {
      notification['warning']({
        message: '提醒',
        description: '请先登陆再操作',
      })
    }
    dispatch({type: 'details/setState', payload: {buyVisible: false}})
  }

  bugHandleCancel() {
    const {dispatch, details} = this.props
    let {goodDetail, goodNum} = details
    if (userId) {
      dispatch({
        type: 'details/addOrder',
        payload: {userId, goodId: goodDetail.id, buyNum: goodNum, cartId: '', code: '0', orderId: ''}
      })
    } else {
      notification['warning']({
        message: '提醒',
        description: '请先登陆再操作',
      })
    }
    dispatch({type: 'details/setState', payload: {buyVisible: false}})
  }

  render() {
    const {details, form} = this.props
    let {goodDetail, commentList, buyVisible, addressList, useredAddress} = details
    return (
      <section className={styles.section}>
        <div className={styles.body}>
          <div className={styles.infoBox}>
            <div className={styles.img}>
              <img style={{width: '440px'}} src={goodDetail.imgSrc}/>
            </div>
            <div className={styles.details} style={{margin: "0 0 0 10px"}}>
              <div className={styles.name} style={{fontSize: "18px"}}>
                {goodDetail.goodsName}
              </div>
              <div className={styles.price} style={{
                fontSize: '17px',
                fontWeight: 'bold',
                margin: '10px 0'
              }}>
                ￥{goodDetail.goodsPrice}
              </div>
              <div className={styles.goodNum} style={{margin: '10px 0'}}>
                <InputNumber min={1} max={10} defaultValue={1} onChange={(e) => this.changeNum(e)}/>
              </div>
              <div className={styles.operation}>
                <div>
                  <Button type="primary" onClick={() => this.addCart()}>加入购物车</Button>
                </div>
                <div>
                  <Button type="primary" onClick={() => this.buyGoodDetail()}>购买</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          title="提醒"
          visible={buyVisible}
          onOk={() => this.bugHandleOk()}
          onCancel={() => this.bugHandleCancel()}
        >
          <div style={ {fontSize: '18px', fontWeight: "bold"}}>
            确定使用以下收货地址吗？
          </div>
          <div>收货人：{useredAddress.userName}</div>
          <div>收获地址：{useredAddress.province}{useredAddress.city}{useredAddress.area}{useredAddress.detailAdress}</div>
          <div>联系电话：{useredAddress.phoneNum}</div>
        </Modal>

        <div className={styles.comment}>
          <div className={styles.commentBox} style={{
            fontSize: '18px',
            fontWeight: 'bold',
            height: '50px'
          }}>评论
          </div>
        </div>
        <div className={styles.comment}>
          <div className={styles.commentBox}>
            <Message goodDetail={goodDetail} commentList={commentList}/>
          </div>
        </div>

      </section>
    )
  }
}
Details = Form.create()(Details)
export default connect(({details}) => ({details}))(Details)
