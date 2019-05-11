package com.salemarket.service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.joinforwin.toolkit.kit.EncryptKit;
import com.joinforwin.toolkit.kit.IdKit;
import com.salemarket.SmsVerification.CheckSumBuilder;
import com.salemarket.entity.SaleUser;
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
import org.apache.tomcat.util.security.MD5Encoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by 14069 on 2019/3/25.
 */
@Service
@Transactional
public class RegisterService {

    @Autowired
    SaleUserMapper saleUserMapper;


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
    public static final String TEMPLATEID = "9644419";

    /**
     * 获取验证码
     *
     * @param
     * @return
     */
    public String getVcode(String phoneNum) {
    /*
         * 现在 DefaultHttpClient已经过时了
         * DefaultHttpClient继承AbstractHttpClient
         * AbstractHttpClient继承CloseableHttpClient
         * CloseableHttpClient通过HttpClients的createDefault方法创建
         */
        CloseableHttpClient httpclient = HttpClients.createDefault();
        //post请求
        HttpPost httpPost = new HttpPost(SERVER_URL);
        //时间戳
        String curTime = String.valueOf((new Date()).getTime() / 1000L);
        //生产短信验证码
        String code = CheckSumBuilder.getCheckSum(APP_SECRET, TEMPLATEID, curTime);

        /*
         * 参考计算CheckSum的java代码，在上述文档的参数列表中，有CheckSum的计算文档示例
         */
        String checkSum = CheckSumBuilder.getCheckSum(APP_SECRET, code, curTime);

        // 设置请求的header
        httpPost.addHeader("AppKey", APP_KEY);
        httpPost.addHeader("Nonce", code);
        httpPost.addHeader("CurTime", curTime);
        httpPost.addHeader("CheckSum", checkSum);
        httpPost.addHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        String result = null;
        // 设置请求的的参数，requestBody参数
        List<NameValuePair> nvps = new ArrayList<NameValuePair>();
        /*
         * 1.如果是模板短信，请注意参数mobile是有s的，详细参数配置请参考“发送模板短信文档”
         * 2.参数格式是jsonArray的格式，例如 "['13888888888','13666666666']"
         * 3.params是根据你模板里面有几个参数，那里面的参数也是jsonArray格式
         */
        nvps.add(new BasicNameValuePair("templateid", TEMPLATEID));
        nvps.add(new BasicNameValuePair("mobile", phoneNum));
        nvps.add(new BasicNameValuePair("codeLen", CODELEN));

        CloseableHttpResponse responsecode = null;
        try {
            //设置编码格式
            httpPost.setEntity(new UrlEncodedFormEntity(nvps, "utf-8"));
            //执行请求并返回CloseableHttpResponse
            responsecode = httpclient.execute(httpPost);
            //获取返回结果
            HttpEntity entity = responsecode.getEntity();
            if (entity != null) {
                result = EntityUtils.toString(entity, "UTF-8");
                //直接返回json字符串给客户端验证
//                renderJson(response, result);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (responsecode != null) {
                try {
                    responsecode.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (httpclient != null) {
                try {
                    httpclient.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }

    /**
     * 注册用户
     */
    public String addUser(String phoneNum, String userId, String sex, String passWord) {
        Integer userInteger = saleUserMapper.selectCount(new EntityWrapper<SaleUser>().eq("ID", userId));
        if (userInteger > 0) {
            return "0";
        } else {
            SaleUser saleUser = new SaleUser();
            saleUser.setId(userId);
            saleUser.setName(userId);
            saleUser.setPhoneNum(phoneNum);
            saleUser.setSex(sex);
            String s = EncryptKit.md5(passWord);
            saleUser.setPassword(s);
            saleUserMapper.insert(saleUser);
            return "1";
        }
    }


}
