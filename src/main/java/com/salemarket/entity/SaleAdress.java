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
@TableName("sale_adress")
public class SaleAdress extends Model<SaleAdress> {

    private static final long serialVersionUID = 1L;

    @TableId("ADRESS_ID")
    private String adressId;
    @TableField("USER_ID")
    private String userId;
    @TableField("USER_NAME")
    private String userName;
    @TableField("PROVINCE")
    private String province;
    @TableField("CITY")
    private String city;
    @TableField("AREA")
    private String area;
    @TableField("PHONE_NUM")
    private String phoneNum;
    @TableField("DETAIL_ADRESS")
    private String detailAdress;
    @TableField("IS_USEED")
    private String isUseed;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getIsUseed() {
        return isUseed;
    }

    public void setIsUseed(String isUseed) {
        this.isUseed = isUseed;
    }

    public String getDetailAdress() {
        return detailAdress;
    }

    public void setDetailAdress(String detailAdress) {
        this.detailAdress = detailAdress;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    public String getAdressId() {
        return adressId;
    }

    public void setAdressId(String adressId) {
        this.adressId = adressId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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

    @Override
    protected Serializable pkVal() {
        return this.adressId;
    }

    @Override
    public String toString() {
        return "SaleAdress{" +
                "adressId=" + adressId +
                ", userId=" + userId +
                ", province=" + province +
                ", city=" + city +
                ", area=" + area +
                "}";
    }
}
