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
@TableName("sale_message")
public class SaleMessage extends Model<SaleMessage> {

    private static final long serialVersionUID = 1L;

    @TableId("ID")
	private String id;
	@TableField("MESSAGE")
	private String message;
	@TableField("CREATE_BY")
	private String createBy;
	@TableField("CREATED_DATE")
	private Date createdDate;


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	@Override
	protected Serializable pkVal() {
		return this.id;
	}

	@Override
	public String toString() {
		return "SaleMessage{" +
			"id=" + id +
			", message=" + message +
			", createBy=" + createBy +
			", createdDate=" + createdDate +
			"}";
	}
}
