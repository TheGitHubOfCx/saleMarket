package com.salemarket.SmsVerification;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by 14069 on 2019/3/23.
 * 发送验证码的类
 */
public class SendMeg {
    private static final String SERVER_URL = "https://api.netease.im/sms/sendcode.action";//请求的URL
    private static final String APP_KEY = "****************";//网易云分配的账号
    private static final String APP_SECRET = "***********";//密码
    // private static final String MOULD_ID="3057527";//模板ID
    private static final String NONCE = "123456";//随机数
    //验证码长度，范围4～10，默认为4
    private static final String CODELEN = "6";

    public static boolean sendMsg(String phone) throws IOException {
        CloseableHttpClient httpclient = HttpClients.createDefault();
        HttpPost post = new HttpPost(SERVER_URL);

        String curTime = String.valueOf((new Date().getTime() / 1000L));
        String checkSum = CheckSumBuilder.getCheckSum(APP_SECRET, NONCE, curTime);

        //设置请求的header
        post.addHeader("AppKey", APP_KEY);
        post.addHeader("Nonce", NONCE);
        post.addHeader("CurTime", curTime);
        post.addHeader("CheckSum", checkSum);
        post.addHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        //设置请求参数
        List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
        nameValuePairs.add(new BasicNameValuePair("mobile", phone));

        post.setEntity(new UrlEncodedFormEntity(nameValuePairs, "utf-8"));

        //执行请求
        HttpResponse response = httpclient.execute(post);
        String responseEntity = EntityUtils.toString(response.getEntity(), "utf-8");

        //判断是否发送成功，发送成功返回true
        // String code = JSON.parseObject(responseEntity).getString("code");
        if (responseEntity.equals("{\"code\":200}")) {
            return true;
        }
        //System.out.println(re);
        return false;
    }
}
