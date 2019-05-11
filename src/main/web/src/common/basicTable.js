/**
 * Created by llb on 2016/12/02.
 */
import React, {Component} from 'react'
import {Table} from 'antd'

/*
 * className:行选中定义样式名字
 * loading:是否需要没数据时的加载动态
 * tbodyHeight: 表格tbody高度
 * */
export default class BasicTable extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0
    }
  }

  componentWillReceiveProps(props) {
    if (props.selectedIndex) {
      this.setState({selectedIndex: props.selectedIndex})
    }
  }

  onChange(pagination, filters, sorter) {
    this.setState({selectedIndex: -1})
    if (this.props.currentPage) {
      this.props.currentPage(pagination.current)
    }
  }

  onRowClick(record, index) {
    this.setState({selectedIndex: index})
    if (this.props.onRowClick) {
      this.props.onRowClick(record, index)
    }
  }

  render() {
    const {className, tbodyHeight,noBordered} = this.props
    const {selectedIndex} = this.state
    let pagination = this.props.pagination || {}
    if (tbodyHeight) {
      const tableHeight = Math.floor((document.body.scrollHeight - tbodyHeight) / 35)
      pagination = Object.assign({}, this.props.pagination, {pagination: {pageSize: tableHeight}})
    }
    let tableDatas = Object.assign({}, this.props, pagination)
    return (
      <div style={{height: '100%'}}>
        <style>
          {className ? `.${className} tr:nth-child(${selectedIndex + 1}){
                        background:#E8F7F5!important;
                  }` : ''}
          {className === 'master' ? `tr td:nth-child(7),td:nth-child(8){
                      text-align:center;
                    }` : void(0)
          }
          {className === 'monitor' ? `tr th:nth-child(1),tr td:nth-child(1){
                      text-align:center;
                    }` : void(0)
          }
        </style>
        <Table bordered={noBordered?false:true}
               {...tableDatas}
               onChange={(pagination, filters, sorter) => {
                 this.onChange(pagination, filters, sorter)
               }}
               onRowClick={::this.onRowClick}/>
      </div>
    )
  }
}
