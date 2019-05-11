package com.salemarket.service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.joinforwin.toolkit.kit.EncryptKit;
import com.salemarket.controller.LoginController;
import com.salemarket.entity.SaleUser;
import com.salemarket.kit.CookieKit;
import com.salemarket.mapper.SaleUserMapper;
import com.sun.tools.hat.internal.server.HttpReader;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created by 14069 on 2019/3/30.
 */
@Service
@Transactional
public class SignInService {

    @Autowired
    SaleUserMapper saleUserMapper;

    protected static final Log logger = LogFactory.getLog(LoginController.class.getName());

    public String signIn(String userName, String inPassWord, HttpServletRequest request, HttpServletResponse response) {
        String passWord = EncryptKit.md5(inPassWord);
        Integer integer = saleUserMapper.selectCount(new EntityWrapper<SaleUser>().eq("NAME", userName).eq("PASSWORD", passWord));
        if (integer > 0) {
            request.getSession().setAttribute("userId", userName);
//            CookieKit.setCookieForever(response, "userId", userName);
            logger.info(userName + "登录成功");
            return "1";
        } else {
            return "0";
        }
    }
}
