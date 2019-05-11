package com.salemarket.entity;

import java.io.Serializable;

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
@TableName("sale_user")
public class SaleUser extends Model<SaleUser> {

    private static final long serialVersionUID = 1L;

    @TableId("ID")
	private String id;
	@TableField("NAME")
	private String name;
	@TableField("PASSWORD")
	private String password;
	@TableField("SEX")
	private String sex;
	@TableField("PHONE_NUM")
	private String phoneNum;


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getPhoneNum() {
		return phoneNum;
	}

	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}

	@Override
	protected Serializable pkVal() {
		return this.id;
	}

	@Override
	public String toString() {
		return "SaleUser{" +
			"id=" + id +
			", name=" + name +
			", password=" + password +
			", sex=" + sex +
			", phoneNum=" + phoneNum +
			"}";
	}
}
