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
    private String goodId;

    @TableField("GOODS_NAME")
    private String goodName;

    @TableField("BUY_NUM")
    private Integer buyNum;

    @TableField("BUY_PRICE")
    private String buyPrice;

    @TableField("ADDRESS_ID")
    private String addressId;

    @TableField("CREATE_DATE")
    private String createDate;

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

    public String getGoodName() {
        return goodName;
    }

    public void setGoodName(String goodName) {
        this.goodName = goodName;
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

    public String getGoodId() {
        return goodId;
    }

    public void setGoodId(String goodId) {
        this.goodId = goodId;
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
