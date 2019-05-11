import React, {Component} from 'react'
import styles from './index.less'
import {Spin} from 'antd'

/**
 * <p>
 * Title :
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Author :llb 2018/1/22
 * </p>
 * <p>
 * Department :
 * </p>
 * Copyright : ©江苏汇鑫融智软件科技有限公司 </p>
 */

export default class Index extends Component {


  render() {
    return (
        <div className={styles.loading}>
          <Spin spinning={true} tip="正在加载..." size="large"/>
        </div>
    )
  }
}
