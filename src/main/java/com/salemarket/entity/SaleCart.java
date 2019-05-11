package com.salemarket.entity;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * <p>
 * </p>
 *
 * @author cx
 * @since 2019-03-20
 */
@TableName("sale_cart")
public class SaleCart extends Model<SaleCart> {

    private static final long serialVersionUID = 1L;

    @TableId("ID")
    private String id;

    @TableId("USER_ID")
    private String userId;

    @TableId("GOOD_NAME")
    private String goodName;

    @TableId("CREATE_DATA")
    private Date createData;

    @TableId("GOODS_ID")
    private String goodsId;

    @TableId("GOODS_NUM")
    private Integer goodNum;

    public String getGoodName() {
        return goodName;
    }

    public void setGoodName(String goodName) {
        this.goodName = goodName;
    }

    public Integer getGoodNum() {
        return goodNum;
    }

    public void setGoodNum(Integer goodNum) {
        this.goodNum = goodNum;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Date getCreateData() {
        return createData;
    }

    public void setCreateData(Date createData) {
        this.createData = createData;
    }

    public String getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(String goodsId) {
        this.goodsId = goodsId;
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
        return "SaleCart{" +
                "id=" + id +
                "}";
    }
}
