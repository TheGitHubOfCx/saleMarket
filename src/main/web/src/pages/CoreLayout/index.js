/**
 * Created by Winna on 2017/6/16.
 */
import React, {Component} from "react";
import {Avatar, Dropdown, Menu, Icon, Drawer, InputNumber, Button, Modal, notification} from "antd";
import styles from "./index.less";
import {connect} from "dva";
import Adress from './AdressModal/index'

const userId = window.sessionStorage.getItem("userId")

class CoreLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  componentWillMount() {
    const {dispatch, history} = this.props
    dispatch({type: 'dataPlay/queryUserList'})
    if (window.location.pathname === '/register') {
      history.push('/' + 'register')
    }
    dispatch({type: 'details/queryCartList', payload: {userId}})
    dispatch({type: 'details/queryOrderListByUserId', payload: {userId}})
    dispatch({type: 'details/queryAdressById', payload: {userId}})
  }

  //注销
  loginOut(key) {
    const {history, dispatch} = this.props
    if (key === '1') {
      {
        userId ? dispatch({type: 'signIn/userLayout'}) : void(0)
      }
      history.push('/' + 'signIn')
    } else if (key === '3' || key === '2') {
      dispatch({type: 'dataPlay/setState', payload: {drawerVisible: true, drawerType: key}})
    } else if (key === '4') {
      dispatch({type: 'dataPlay/setState', payload: {drawerVisible: true, drawerType: key}})
    }
  }

  onClose() {
    const {dispatch} = this.props
    dispatch({type: 'dataPlay/setState', payload: {drawerVisible: false}})
  }

  changeCartNum(goodNum, goodsOfCartId) {
    const {dispatch} = this.props
    dispatch({type: 'details/changeGoodNum', payload: {goodNum, goodsOfCartId, userId}})
  }

  showGoodDetail(goodId) {
    const {details, history} = this.props
    window.sessionStorage.setItem("goodId", goodId)
    history.push("/details")
    window.location.reload()
  }

  deleteCart(cartId) {
    const {dispatch, details} = this.props
    dispatch({type: 'details/deleteGoodOfCart', payload: {cartId, userId}})
  }

  deleteOrderById(orderId) {
    const {dispatch, details} = this.props
    dispatch({type: 'details/deleteOrderById', payload: {orderId, userId}})
  }

  bugGood(orderId) {
    const {dispatch, details} = this.props
    let {addressList} = details
    let typeCode
    for (let i in addressList) {
      if (addressList[i].isUseed === '1') {
        typeCode = '1'
      }
    }
    if (typeCode === '1') {
      dispatch({type: 'details/setState', payload: {buyVisible: true, orderId}})
    } else {
      notification['warning']({
        message: '提醒',
        description: '请先选择或添加收获地址',
      })
    }
  }

  bugHandleOk(cart) {
    const {dispatch, details} = this.props
    let {orderId} = details
    if (userId) {
      dispatch({
        type: 'details/addOrder',
        payload: {userId, goodId: cart.goodsId, buyNum: cart.goodNum, cartId: cart.id, code: '1', orderId}
      })
    } else {
      notification['warning']({
        message: '提醒',
        description: '请先登陆再操作',
      })
    }
    dispatch({type: 'details/setState', payload: {buyVisible: false}})
  }

  bugHandleCancel(cart) {
    const {dispatch, details} = this.props
    if (userId) {
      dispatch({
        type: 'details/addOrder',
        payload: {userId, goodId: cart.goodsId, buyNum: cart.goodNum, cartId: cart.id, code: '0', orderId: ''}
      })
    } else {
      notification['warning']({
        message: '提醒',
        description: '请先登陆再操作',
      })
    }
    dispatch({type: 'details/setState', payload: {buyVisible: false}})
  }

  bugOrderGood(order) {
    const {details, dispatch} = this.props
    dispatch({type: 'details/getGoodInfo', payload: {orderId: order.id}})
    dispatch({type: 'details/setState', payload: {buyOrderVisible: true}})
  }

  bugOrderHandleOk(order) {
    const {details, dispatch} = this.props
    let {goodInfo} = details
    if (userId) {
      dispatch({
        type: 'details/addOrder',
        payload: {userId, goodId: goodInfo.id, buyNum: order.buyNum, cartId: '', code: '1', orderId: order.id}
      })
    } else {
      notification['warning']({
        message: '提醒',
        description: '请先登陆再操作',
      })
    }
    dispatch({type: 'details/setState', payload: {buyOrderVisible: false}})
  }

  bugOrderHandleCancel(order) {
    const {details, dispatch} = this.props
    let {goodInfo} = details
    dispatch({
      type: 'details/addOrder',
      payload: {userId, goodId: goodInfo.id, buyNum: order.buyNum, cartId: '', code: '0', orderId: order.id}
    })
    dispatch({type: 'details/setState', payload: {buyOrderVisible: false}})
  }

  render() {
    const {dataPlay, details} = this.props
    const {userList, drawerVisible, drawerType} = dataPlay
    let {cartList, orderList, addressList, buyVisible, useredAddress, buyOrderVisible} = details
    let titleValue = null
    if (drawerType === '2') {
      titleValue = '我的订单'
    } else if (drawerType === '3') {
      titleValue = '购物车'
    } else if (drawerType === '4') {
      titleValue = '收货地址'
    }
    let userName = null
    userList && userList.map((user) => {
      if (user.id === userId) {
        userName = user.name
      }
    })
    const menu = (
      <Menu onClick={(e) => this.loginOut(e.key)}>
        {userId ? <Menu.Item key="2">
          <div><Icon type="logout"/> 我的订单</div>
        </Menu.Item> : void 0}
        {userId ? <Menu.Item key="3">
          <div><Icon type="logout"/> 购物车</div>
        </Menu.Item> : void 0}
        {userId ? <Menu.Item key="4">
          <div><Icon type="logout"/> 账号设置</div>
        </Menu.Item> : void 0}
        <Menu.Item key="1">
          <div className={styles.logOut}> {userId ? "注 销 " : "登 录 "}</div>
        </Menu.Item>
      </Menu>
    );
    return (
      <section className={styles.coreLayout}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <img src='/img/linshi.png' className={styles.logoIcon} onClick={() => this.props.history.push('/')}/>
            <span className={styles.logoText}>小零嘴零食网</span>
          </div>
          <div className={styles.badgeRight}>
            <Dropdown placement="bottomCenter" overlay={menu} trigger={['click']}>
              <Avatar className={styles.avatar}>{userId ? userId : "登录"}
              </Avatar>
            </Dropdown>
          </div>
        </div>
        <div className={styles.body}>
          {this.props.children}
        </div>
        <Drawer
          title={titleValue}
          placement="right"
          closable={false}
          onClose={() => this.onClose()}
          visible={drawerVisible}
        >
          {cartList && drawerType === '3' ? cartList.map(info => {
            let dateee = new Date(info.createData).toJSON()
            let date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
            return <div className={styles.cartGood}>
              <div>
                <a onClick={() => this.showGoodDetail(info.goodsId)}>{info.goodName}</a>
              </div>
              <div>
                <InputNumber defaultValue={info.goodNum} onChange={(e) => this.changeCartNum(e, info.id)}/>
              </div>
              <div>
                {date}
              </div>
              <div style={{display: "flex", justifyContent: 'space-between', marginBottom: '10px'}}>
                <div>
                  <Button type="primary" size="small" onClick={() => this.bugGood()}>购买</Button>
                </div>
                <div>
                  <Button size="small" onClick={() => this.deleteCart(info.id)}>删除</Button>
                </div>
              </div>
              <Modal
                title="提醒"
                visible={buyVisible}
                onOk={() => this.bugHandleOk(info)}
                onCancel={() => this.bugHandleCancel(info)}
              >
                <div style={ {fontSize: '18px', fontWeight: "bold"}}>
                  确定使用以下收货地址吗？
                </div>
                <div>收货人：{useredAddress.userName}</div>
                <div>
                  收获地址：{useredAddress.province}{useredAddress.city}{useredAddress.area}{useredAddress.detailAdress}</div>
                <div>联系电话：{useredAddress.phoneNum}</div>
              </Modal>
            </div>
          }) : orderList && drawerType === '2' ? orderList.map(data => {
            return <div className={styles.cartGood}>
              <div>
                商品名：{data.goodName}
              </div>
              <div>
                数量：{data.buyNum}
              </div>
              <div>
                ￥{data.buyPrice}
              </div>
              <div style={{display: "flex", justifyContent: 'space-between', marginBottom: '10px'}}>
                <div style={{fontSize: '16px'}}>
                  {data.isBuy === '0' ? <a onClick={() => this.bugOrderGood(data)}>未付款</a> : "已付款"}
                </div>
                <div>
                  <Button size="small" onClick={() => this.deleteOrderById(data.id)}>删除</Button>
                </div>
              </div>
              <div>
                {data.createData}
              </div>
              <Modal
                title="提醒"
                visible={buyOrderVisible}
                onOk={() => this.bugOrderHandleOk(data)}
                onCancel={() => this.bugOrderHandleCancel(data)}
              >
                <div style={ {fontSize: '18px', fontWeight: "bold"}}>
                  确定使用以下收货地址吗？
                </div>
                <div>收货人：{useredAddress.userName}</div>
                <div>
                  收获地址：{useredAddress.province}{useredAddress.city}{useredAddress.area}{useredAddress.detailAdress}</div>
                <div>联系电话：{useredAddress.phoneNum}</div>
              </Modal>
            </div>
          }) : drawerType === '4' && addressList ? <div>
            <Adress addressList={addressList}/>
          </div> : void 0
          }
        </Drawer>
      </section>
    )
  }
}

export default connect(({dataPlay, details}) => ({dataPlay, details}))(CoreLayout)
