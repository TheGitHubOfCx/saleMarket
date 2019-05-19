/**
 * Created by Winna on 2017/6/16.
 */
import React, {Component} from "react";
import {Pagination, Tabs, Spin, Select, Carousel, Input} from "antd";
import styles from "./index.less";
import {connect} from "dva";
import Message from "./MessageModal/index";
import axios from 'axios'
import alert from '../../common/alert'

const userId = window.sessionStorage.getItem("userId")
const Search = Input.Search;
const TabPane = Tabs.TabPane;

class GoodsShow extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  componentWillMount() {
    const {dispatch, dataPlay} = this.props
    let {current} = dataPlay
    window.sessionStorage.setItem("goodId", '')
    window.sessionStorage.setItem("imgSrc", '')
    dispatch({type: 'dataPlay/hotGoodList', payload: {input: '', type: 'hot', foodType: ''}})
    dispatch({type: 'dataPlay/discountGoodList', payload: {input: '', type: 'discount', foodType: ''}})
    dispatch({type: 'dataPlay/importGoodList', payload: {input: '', type: 'import', foodType: ''}})
    dispatch({type: 'dataPlay/hotTypePagin', payload: {current, pageSize: 10, input: '', type: 'hot', foodType: ''}})
    dispatch({
      type: 'dataPlay/disTypePagin',
      payload: {current, pageSize: 10, input: '', type: 'discount', foodType: ''}
    })
    dispatch({type: 'dataPlay/impTypePagin', payload: {current, pageSize: 10, input: '', type: 'import', foodType: ''}})
    dispatch({type: 'dataPlay/setState', payload: {searchValue: ''}})
    axios.post('/queryImgList.do').then(res => {
      dispatch({type: 'dataPlay/setState', payload: {imgList: res.data.payload}})
    }).catch(err =>
      alert("查询", {code: 0})
    );
  }

  //注销
  loginOut(key) {
    if (key === '1') {
      window.location.href = '/logout.do'
    }
  }

  changeCurrent(current) {
    const {dispatch} = this.props
    dispatch({type: 'dataPlay/hotTypePagin', payload: {current, pageSize: 10, input: '', type: 'hot'}})
  }

  changeImpCurrent(impCurrent) {
    const {dispatch} = this.props
    dispatch({type: 'dataPlay/impTypePagin', payload: {impCurrent, pageSize: 10, input: '', type: 'import'}})
  }

  changeDisCurrent(disTypePagin) {
    const {dispatch} = this.props
    dispatch({type: 'dataPlay/disTypePagin', payload: {disTypePagin, pageSize: 10, input: '', type: 'discount'}})
  }

  setSearchValue(e) {
    const {dispatch} = this.props
    dispatch({type: 'dataPlay/setState', payload: {searchValue: e}})
  }

  searchGoods(value) {
    const {dispatch, dataPlay} = this.props
    let {current} = dataPlay
    dispatch({type: 'dataPlay/getGoodList', payload: {input: value, type: null}})
    dispatch({type: 'dataPlay/hotTypePagin', payload: {current, pageSize: 10, input: value, type: ''}})
  }

  showDetail(id, imgSrc) {
    const {details, history} = this.props
    window.sessionStorage.setItem("goodId", id)
    window.sessionStorage.setItem("imgSrc", imgSrc)
    // dispatch({type: 'details/getGoodsById', payload: {goodId: id}})
    history.push("/details")
  }

  changeType(e) {
    const {dispatch, dataPlay} = this.props
    let {current} = dataPlay
    dispatch({type: 'dataPlay/hotGoodList', payload: {input: '', type: 'hot', foodType: e}})
    dispatch({type: 'dataPlay/discountGoodList', payload: {input: '', type: 'discount', foodType: e}})
    dispatch({type: 'dataPlay/importGoodList', payload: {input: '', type: 'import', foodType: e}})
    dispatch({type: 'dataPlay/hotTypePagin', payload: {current, pageSize: 10, input: '', type: 'hot', foodType: e}})
    dispatch({
      type: 'dataPlay/disTypePagin',
      payload: {current, pageSize: 10, input: '', type: 'discount', foodType: e}
    })
    dispatch({type: 'dataPlay/impTypePagin', payload: {current, pageSize: 10, input: '', type: 'import', foodType: e}})
  }


  render() {
    const {dataPlay} = this.props
    let {goodsList, current, hotPaginList, hotLoading, searchValue, disLoading, imLoading, disCountList, importList, disPaginList, impPaginList, disCurrent, impCurrent, imgList} = dataPlay
    return (
      <div className={styles.section}>
        <div className={styles.header}>
          <div className={styles.logoBox}>
            <div>
              <img src="/img/linshi.png" style={{width: '47px'}}/>
            </div>
            <div className={styles.name}>优乐零食网</div>
          </div>
          <div className={styles.search}>
            <div className={styles.searchDiv}>
              <Search
                placeholder="请输入商品名称"
                value={searchValue}
                onChange={(e) => this.setSearchValue(e.target.value)}
                onSearch={(value) => this.searchGoods(value)}
                enterButton
              />
            </div>
          </div>
        </div>
        <div className={styles.carouselBox}>
          <Carousel autoplay className={styles.carousel}>
            <div><img src="/img/p1.jpg" style={{height: '400px', width: '100%'}}/></div>
            <div><img src="/img/p2.jpg" style={{height: '400px', width: '100%'}}/></div>
            <div><img src="/img/p3.jpg" style={{height: '400px', width: '100%'}}/></div>
            <div><img src="/img/p4.jpg" style={{height: '400px', width: '100%'}}/></div>
          </Carousel>
        </div>
        <div style={{width: '200px', margin: '20px 0 20px 52px'}}>
          <Select placeholder="请选择零食类型" style={{width: '200px'}} onChange={(e) => this.changeType(e)}>
            <option value='0'>糕点类</option>
            <option value='1'>坚果类</option>
            <option value='2'>糖果类</option>
            <option value='3'>饼干类</option>
          </Select>
        </div>
        <div className={styles.body}>
          <div className={styles.hotType}>
            <div className={styles.title}>
              <div className={styles.titleDiv}></div>
              热卖商品
            </div>

            <Spin spinning={hotLoading}>
              <div className={styles.showBox}>
                <div className={styles.goodsShow}>
                  {
                    hotPaginList && hotPaginList.length > 0 ? hotPaginList.map((data, index) => {
                      return <div className={styles.good}
                                  onClick={() => this.showDetail(data.id, imgList ? imgList[index].imgSrc : data.imgSrc)}>
                        <div><img src={imgList ? imgList[index].imgSrc : data.imgSrc} style={{
                          width: '230px',
                          height: '215px'
                        }}/></div>
                        <div>
                          <div>￥{data.goodsPrice}</div>
                          <div>销量:{data.salesvolume}</div>
                        </div>
                        <div><a>{data.goodsName}</a><span style={{fontWeight: "bold"}}>{data.originPlace}</span>
                        </div>
                      </div>
                    }) : <div><img src="/img/noData.png"/></div>
                  }
                </div>
              </div>
            </Spin>
            <div className={styles.PaginBox}>
              <div className={styles.Pagin}>
                <Pagination defaultCurrent={1}
                            pageSize={10}
                            current={current}
                            total={goodsList ? goodsList.length : 1}
                            onChange={(current) => this.changeCurrent(current)}
                />
              </div>
            </div>
          </div>
          <div className={styles.discount}>
            <div className={styles.title}>
              <div className={styles.titleDiv}></div>
              优惠促销
            </div>
            <Spin spinning={disLoading}>
              <div className={styles.showBox}>
                <div className={styles.goodsShow}>
                  {
                    disPaginList && disPaginList.length > 0 ? disPaginList.map((data, index) => {
                      return <div className={styles.good}>
                        <div><img src={imgList ? imgList[index + 2].imgSrc : data.imgSrc} style={{
                          width: '230px',
                          height: '215px'
                        }}/></div>
                        <div>
                          <div>￥{data.goodsPrice}</div>
                          <div>销量:{data.salesvolume}</div>
                        </div>
                        <div><a>{data.goodsName}</a><span style={{fontWeight: "bold"}}>{data.originPlace}</span>
                        </div>
                      </div>

                    }) : <div><img src="/img/noData.png"/></div>
                  }
                </div>
              </div>
            </Spin>
            <div className={styles.PaginBox}>
              <div className={styles.Pagin}>
                <Pagination defaultCurrent={1}
                            pageSize={10}
                            current={disCurrent}
                            total={disCountList ? disCountList.length : 1}
                            onChange={(current) => this.changeDisCurrent(current)}
                />
              </div>
            </div>
          </div>
          <div className={styles.imported}>
            <div className={styles.title}>
              <div className={styles.titleDiv}></div>
              进口食品
            </div>
            <Spin spinning={imLoading}>
              <div className={styles.showBox}>
                <div className={styles.goodsShow}>
                  {
                    impPaginList && impPaginList.length > 0 ? impPaginList.map((data, index) => {
                      return <div className={styles.good}>
                        <div><img src={imgList ? imgList[index + 4].imgSrc : data.imgSrc} style={{
                          width: '230px',
                          height: '215px'
                        }}/></div>
                        <div>
                          <div>￥{data.goodsPrice}</div>
                          <div>销量:{data.salesvolume}</div>
                        </div>
                        <div><a>{data.goodsName}</a><span style={{fontWeight: "bold"}}>{data.originPlace}</span>
                        </div>
                      </div>

                    }) : <div><img src="/img/noData.png"/></div>
                  }
                </div>
              </div>
            </Spin>
            <div className={styles.PaginBox}>
              <div className={styles.Pagin}>
                <Pagination defaultCurrent={1}
                            pageSize={10}
                            current={impCurrent}
                            total={importList ? importList.length : 1}
                            onChange={(current) => this.changeImpCurrent(current)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <Message/>
        </div>
      </div>
    )
  }
}

export default connect(({dataPlay, details}) => ({dataPlay, details}))(GoodsShow)
