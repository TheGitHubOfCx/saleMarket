package com.salemarket.entity;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;

import java.io.Serializable;

/**
 * Created by 14069 on 2019/5/17.
 */
@TableName("sale_img")
public class SaleImg extends Model<SaleImg> {

  @TableId("ID")
  private String id;

  @TableId("IMG_SRC")
  private String imgSrc;

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getImgSrc() {
    return imgSrc;
  }

  public void setImgSrc(String imgSrc) {
    this.imgSrc = imgSrc;
  }

  @Override
  protected Serializable pkVal() {
    return null;
  }
}
