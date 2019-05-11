package com.salemarket.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * <p>
 * Title :
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Author :tyz 2017/6/8
 * </p>
 * <p>
 * Department : 研发部
 * </p>
 * Copyright : ©2014-2014 江苏汇鑫融智软件科技有限公司
 * </p>
 */
@Controller
public class LogoutController {

    protected final Log logger = LogFactory.getLog(getClass());

    @RequestMapping(value = "/logout.do")
    public String logout(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {
        String taskUserId = (String) request.getSession().getAttribute("userId");
        request.getSession().removeAttribute("userId");
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("userId")) {
                cookie.setValue("");
                cookie.setMaxAge(0);
                cookie.setPath("/");
                response.addCookie(cookie);
            }
        }
        response.sendRedirect("/");
        return "register";
    }
}
