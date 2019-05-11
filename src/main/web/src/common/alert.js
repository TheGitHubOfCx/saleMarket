import {notification, Button, Modal, message} from 'antd'
import React from 'react'

export default function alert(title, e) {
  if (e.code !== 0) {
    notification.success({
      message: "操作成功",
      description: `${title}成功!`,
      duration: 1,
      style: {
        top: 30
      }
    })
  } else {
    const info = () => {
      Modal.error({
        title: "操作失败",
        content: (
          <pre style={{width: '900px', height: '300px', overflow: 'auto'}}>
            {e.exception}
          </pre>
        ),
        width: 1000,
        okText: "确定",
        onOk() {
          notification.close(key)
        }
      })
    }

    const key = `open${Date.now()}`

    const btnClick = function () {
      info()
    }

    // const btn = (
    //   <Button type="dashed" icon="search" size="small" onClick={btnClick}>
    //     查看详细
    //   </Button>
    // )

    notification.error({
      message: "操作失败",
      description: (e.tips && e.tips.length > 60 ? e.tips.substring(0, 60) : e.tips),
      key,
      // btn,
      duration: 5,
      style: {
        top: 30
      }
    })
  }
}
