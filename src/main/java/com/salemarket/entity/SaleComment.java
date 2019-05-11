package com.salemarket.entity;

import java.io.Serializable;

import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author cx
 * @since 2019-03-20
 */
@TableName("sale_comment")
public class SaleComment extends Model<SaleComment> {

    private static final long serialVersionUID = 1L;

    @TableId("ID")
	private String id;
	@TableField("USER_ID")
	private String userId;
	@TableField("GOODS_ID")
	private String goodsId;
	@TableField("CONTENT")
	private String content;
	@TableField("CREATE_DATE")
	private Date createDate;
	@TableField("CREATED_BY")
	private String createdBy;


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getGoodsId() {
		return goodsId;
	}

	public void setGoodsId(String goodsId) {
		this.goodsId = goodsId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	@Override
	protected Serializable pkVal() {
		return this.id;
	}

	@Override
	public String toString() {
		return "SaleComment{" +
			"id=" + id +
			", userId=" + userId +
			", goodsId=" + goodsId +
			", content=" + content +
			", createDate=" + createDate +
			", createdBy=" + createdBy +
			"}";
	}
}
