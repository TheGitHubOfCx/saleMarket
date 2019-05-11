/**
 * Created by Winna on 2017/6/16.
 */
import React, {Component} from "react";
import {Pagination, Tabs, Spin, Icon, Carousel, Input} from "antd";
import styles from "./index.less";
import {connect} from "dva";
import Message from "./MessageModal/index";

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
    dispatch({type: 'dataPlay/hotGoodList', payload: {input: null, type: 'hot'}})
    dispatch({type: 'dataPlay/discountGoodList', payload: {input: null, type: 'discount'}})
    dispatch({type: 'dataPlay/importGoodList', payload: {input: null, type: 'import'}})
    dispatch({type: 'dataPlay/hotTypePagin', payload: {current, pageSize: 10, input: '', type: 'hot'}})
    dispatch({type: 'dataPlay/disTypePagin', payload: {current, pageSize: 10, input: '', type: 'discount'}})
    dispatch({type: 'dataPlay/impTypePagin', payload: {current, pageSize: 10, input: '', type: 'import'}})
    dispatch({type: 'dataPlay/setState', payload: {searchValue: ''}})
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

  showDetail(id) {
    const {details, history} = this.props
    window.sessionStorage.setItem("goodId", id)
    // dispatch({type: 'details/getGoodsById', payload: {goodId: id}})
    history.push("/details")
  }


  render() {
    const {dataPlay} = this.props
    let {goodsList, current, hotPaginList, hotLoading, searchValue, disLoading, imLoading, disCountList, importList, disPaginList, impPaginList, disCurrent, impCurrent} = dataPlay
    return (
      <section className={styles.section}>
        <div className={styles.header}>
          <div className={styles.logoBox}>
            <div>
              <img src="/img/linshi.png" style={{width: '47px'}}/>
            </div>
            <div className={styles.name}>小零嘴</div>
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
                    hotPaginList && hotPaginList.length > 0 ? hotPaginList.map(data => {
                      return <div className={styles.good} onClick={() => this.showDetail(data.id)}>
                        <div><img src={data.imgSrc} style={{
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
                    disPaginList && disPaginList.length > 0 ? disPaginList.map(data => {
                      return <div className={styles.good}>
                        <div><img src={data.imgSrc} style={{
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
                    impPaginList && impPaginList.length > 0 ? impPaginList.map(data => {
                      return <div className={styles.good}>
                        <div><img src={data.imgSrc} style={{
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
      </section>
    )
  }
}

export default connect(({dataPlay, details}) => ({dataPlay, details}))(GoodsShow)
