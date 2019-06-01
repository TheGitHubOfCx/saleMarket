package com.salemarket.entity;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;

import java.io.Serializable;

/**
 * <p>
 * <p>
 * </p>
 *
 * @author cx
 * @since 2019-03-20
 */
@TableName("sale_goods")
public class SaleGoods extends Model<SaleGoods> {

  private static final long serialVersionUID = 1L;

  @TableId("ID")
  private String id;
  @TableField("GOODS_NAME")
  private String goodsName;
  @TableField("GOODS_TYPE")
  private String goodsType;
  @TableField("IMG_SRC")
  private String imgSrc;
  @TableField("GOODS_PRICE")
  private Integer goodsPrice;
  @TableField("COMMENT_ID")
  private String commentId;
  @TableField("ORIGIN_PLACE")
  private String originPlace;
  @TableField("SALESVOLUME")
  private String salesvolume;
  @TableField("UPLOAD_FILE")
  private String uploadFile;
  @TableField("FILE_ID")
  private String fileId;

  @TableField("FOOD_TYPE")
  private String foodType;

  public String getUploadFile() {
    return uploadFile;
  }

  public void setUploadFile(String uploadFile) {
    this.uploadFile = uploadFile;
  }

  public String getFileId() {
    return fileId;
  }

  public void setFileId(String fileId) {
    this.fileId = fileId;
  }

  public String getFoodType() {
    return foodType;
  }

  public void setFoodType(String foodType) {
    this.foodType = foodType;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getGoodsName() {
    return goodsName;
  }

  public void setGoodsName(String goodsName) {
    this.goodsName = goodsName;
  }

  public String getGoodsType() {
    return goodsType;
  }

  public void setGoodsType(String goodsType) {
    this.goodsType = goodsType;
  }

  public String getImgSrc() {
    return imgSrc;
  }

  public void setImgSrc(String imgSrc) {
    this.imgSrc = imgSrc;
  }

  public Integer getGoodsPrice() {
    return goodsPrice;
  }

  public void setGoodsPrice(Integer goodsPrice) {
    this.goodsPrice = goodsPrice;
  }

  public String getCommentId() {
    return commentId;
  }

  public void setCommentId(String commentId) {
    this.commentId = commentId;
  }

  public String getOriginPlace() {
    return originPlace;
  }

  public void setOriginPlace(String originPlace) {
    this.originPlace = originPlace;
  }

  public String getSalesvolume() {
    return salesvolume;
  }

  public void setSalesvolume(String salesvolume) {
    this.salesvolume = salesvolume;
  }

  @Override
  protected Serializable pkVal() {
    return this.id;
  }

  @Override
  public String toString() {
    return "SaleGoods{" +
      "id=" + id +
      ", goodsName=" + goodsName +
      ", goodsType=" + goodsType +
      ", imgSrc=" + imgSrc +
      ", goodsPrice=" + goodsPrice +
      ", commentId=" + commentId +
      ", originPlace=" + originPlace +
      ", salesvolume=" + salesvolume +
      "}";
  }
}
