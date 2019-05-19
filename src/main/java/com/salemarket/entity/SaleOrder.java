package com.salemarket.entity;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
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
@TableName("sale_order")
public class SaleOrder extends Model<SaleOrder> {

  private static final long serialVersionUID = 1L;

  @TableId("ID")
  private String id;

  @TableField("USER_ID")
  private String userId;

  @TableField("IS_BUY")
  private String isBuy;

  @TableField("CREATE_DATA")
  private String createData;

  @TableField("GOODS_ID")
  private String goodsId;

  @TableField("GOODS_NAME")
  private String goodsName;

  @TableField("BUY_NUM")
  private Integer buyNum;

  @TableField("BUY_PRICE")
  private String buyPrice;

  @TableField("ADDRESS_ID")
  private String addressId;

  @TableField("CREATE_DATE")
  private String createDate;

  @TableField("STATUS")
  private String status;

  @TableField(exist = false)
  private String userName;
  @TableField(exist = false)
  private String province;
  @TableField(exist = false)
  private String city;
  @TableField(exist = false)
  private String area;
  @TableField(exist = false)
  private String phoneNum;
  @TableField(exist = false)
  private String detailAdress;
  @TableField(exist = false)
  private String isUseed;

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getProvince() {
    return province;
  }

  public void setProvince(String province) {
    this.province = province;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getArea() {
    return area;
  }

  public void setArea(String area) {
    this.area = area;
  }

  public String getPhoneNum() {
    return phoneNum;
  }

  public void setPhoneNum(String phoneNum) {
    this.phoneNum = phoneNum;
  }

  public String getDetailAdress() {
    return detailAdress;
  }

  public void setDetailAdress(String detailAdress) {
    this.detailAdress = detailAdress;
  }

  public String getIsUseed() {
    return isUseed;
  }

  public String getGoodsId() {
    return goodsId;
  }

  public void setGoodsId(String goodsId) {
    this.goodsId = goodsId;
  }

  public String getGoodsName() {
    return goodsName;
  }

  public void setGoodsName(String goodsName) {
    this.goodsName = goodsName;
  }

  public void setIsUseed(String isUseed) {
    this.isUseed = isUseed;

  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getCreateDate() {
    return createDate;
  }

  public void setCreateDate(String createDate) {
    this.createDate = createDate;
  }

  public String getAddressId() {
    return addressId;
  }

  public void setAddressId(String addressId) {
    this.addressId = addressId;
  }


  public Integer getBuyNum() {
    return buyNum;
  }

  public void setBuyNum(Integer buyNum) {
    this.buyNum = buyNum;
  }

  public String getBuyPrice() {
    return buyPrice;
  }

  public void setBuyPrice(String buyPrice) {
    this.buyPrice = buyPrice;
  }

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public String getIsBuy() {
    return isBuy;
  }

  public void setIsBuy(String isBuy) {
    this.isBuy = isBuy;
  }

  public String getCreateData() {
    return createData;
  }

  public void setCreateData(String createData) {
    this.createData = createData;
  }


  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  @Override
  protected Serializable pkVal() {
    return this.id;
  }

  @Override
  public String toString() {
    return "SaleOrder{" +
      "id=" + id +
      "}";
  }
}
