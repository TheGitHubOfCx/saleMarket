package com.salemarket.service;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.joinforwin.toolkit.kit.IdKit;
import com.salemarket.SmsVerification.CheckSumBuilder;
import com.salemarket.controller.DataPlayController;
import com.salemarket.entity.SaleGoods;
import com.salemarket.entity.SaleMessage;
import com.salemarket.entity.SaleUser;
import com.salemarket.mapper.DataPlayMapper;
import com.salemarket.mapper.SaleMessageMapper;
import com.salemarket.mapper.SaleUserMapper;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by 14069 on 2019/3/21.
 */
@Service
@Transactional
public class DataPlayService {

    @Autowired
    DataPlayMapper dataPlayMapper;

    @Autowired
    SaleUserMapper saleUserMapper;

    @Autowired
    SaleMessageMapper saleMessageMapper;

    //发送验证码的请求路径URL
    public static final String
            SERVER_URL = "https://api.netease.im/sms/sendcode.action";
    //网易云信分配的账号，请替换你在管理后台应用下申请的Appkey
    public static final String
            APP_KEY = "b550b951b1484086ff67e7e46b695ca3";
    //网易云信分配的密钥，请替换你在管理后台应用下申请的appSecret
    public static final String APP_SECRET = "8c8026bff5fa";

    //网易云信短信验证码长度
    public static final String CODELEN = "6";

    //网易云信短信验证码模板
    public static final String TEMPLATEID = "9664462";

    public List<SaleUser> queryUserList() {
        List<SaleUser> saleUsersList = dataPlayMapper.selectList(null);
        return saleUsersList;
    }

    /**
     * 注册用户
     */
    public void registerUser(String userName, String passWord, String phoneNum, String sex, HttpServletResponse response) {
        SaleUser saleUser = new SaleUser();
        saleUser.setId(IdKit.createId());
        saleUser.setName(userName);
        saleUser.setPassword(passWord);
        saleUser.setPhoneNum(phoneNum);
        saleUser.setSex(sex);
        saleUserMapper.insert(saleUser);
    }

    /**
     * 商品列表
     */
    public List<SaleGoods> getGoodList(String input, String type) {
        List<SaleGoods> goodList = dataPlayMapper.getGoodList(input, type);
        return goodList;
    }

    /**
     * 后端分页
     */
    public List<SaleGoods> goodsPagin(int current, int pageSize, String input, String type) {
//        int start = (current - 1) * pageSize;
        int start = current - 1;
//        int end = current * pageSize + 1;
        int limit = start * pageSize;
        List<SaleGoods> saleGoods = dataPlayMapper.goodsPagin(limit,pageSize, input.length() > 0 ? input : null, type.length() > 0 ? type : null);
        return saleGoods;
    }

    /**
     * queryMessage
     */
    public List<SaleMessage> queryMessage() {
        List<SaleMessage> saleMessages = saleMessageMapper.selectList(new EntityWrapper<SaleMessage>().orderBy("CREATED_DATE", false));
        return saleMessages;
    }

    /**
     * addMessage
     */
    public void addMessage(String message, String userId) {
        SaleMessage saleMessage = new SaleMessage();
        saleMessage.setId(IdKit.createId());
        saleMessage.setMessage(message);
        saleMessage.setCreateBy(userId);
        saleMessage.setCreatedDate(new Date());
        saleMessageMapper.insert(saleMessage);
    }
}
