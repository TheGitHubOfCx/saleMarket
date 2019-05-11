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
 * 校验工具类
 */
public class MobileMessageCheck {
    private static final String SERVER_URL = "https://api.netease.im/sms/sendcode.action";//校验验证码的请求路径URL
    private static final String APP_KEY = "b550b951b1484086ff67e7e46b695ca3";//网易云信分配的账号
    private static final String APP_SECRET = "8c8026bff5fa";//网易云信分配的密钥
    private static final String NONCE = "123456";//随机数

    public static boolean checkMsg(String phone, String sum) throws IOException {
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
        nameValuePairs.add(new BasicNameValuePair("code", sum));

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
