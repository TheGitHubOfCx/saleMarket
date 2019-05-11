package com.salemarket.controller;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.joinforwin.toolkit.entity.JFW_USER;
import com.joinforwin.toolkit.exception.UserException;
import com.salemarket.entity.SaleUser;
import com.salemarket.kit.CookieKit;
import com.salemarket.mapper.SaleUserMapper;
import com.salemarket.service.LoginService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

/**
 * <p>
 * Title :
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Author :zyj2019/1/15
 * </p>
 * <p>
 * Department : 研发部
 * </p>
 * <p> Copyright : ©江苏汇鑫融智软件科技有限公司 </p>
 */
@Controller
@ConfigurationProperties(prefix = "jfw")
public class LoginController {

    protected static final Log logger = LogFactory.getLog(LoginController.class.getName());

    @Autowired
    private LoginService loginService;

    final static long time = System.currentTimeMillis();

    @Value("${jfw.is-dev}")
    private boolean isDev;

    @Value("${jfw.dev-server-port}")
    private int port;

    @Autowired
    SaleUserMapper saleUserMapper;

    @RequestMapping(value = "/login.do", method = RequestMethod.POST)
    public String doLogin(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {
        String userId = request.getParameter("userId");
        String password = request.getParameter("password");
        HttpSession session = request.getSession();
        session.setMaxInactiveInterval(-1);
        try {
            JFW_USER user = loginService.verify(userId, password);
            request.getSession().setAttribute("userId", userId);
            request.getSession().setAttribute("password", password);
            CookieKit.setCookieForever(response, "userId", userId);
            response.sendRedirect("/");
            logger.info(userId + "登录成功");
        } catch (UserException e) {
            model.addAttribute("error", e.getMessage());
        }
        return "login";
    }

    @RequestMapping(value = "/registerUser.do", method = RequestMethod.POST)
    public String registerUser(HttpServletRequest request, HttpServletResponse response, Model model) {
        String userName = request.getParameter("userName");
        String password = request.getParameter("passWord");
        String sex = request.getParameter("sex");
        String phoneNum = request.getParameter("phoneNum");
        HttpSession session = request.getSession();
        session.setMaxInactiveInterval(-1);
        try {
            List<SaleUser> nameList = saleUserMapper.selectList(new EntityWrapper<SaleUser>().eq("NAME", userName));
            if (nameList.size() > 0) {
                model.addAttribute("error", userName + "已被注册");
            } else {
                request.getSession().setAttribute("userId", userName);
                request.getSession().setAttribute("password", password);
//                CookieKit.setCookieForever(response, "userId", userName);
                CookieKit.setCookieForever(response, "userId", "");
                response.sendRedirect("/logout.do");
                logger.info(userName + "注册成功");
            }
        } catch (Exception e) {
            model.addAttribute("error", e.getMessage());
        }
        return "login";
    }

    @RequestMapping(value = "/registerPage.do", method = RequestMethod.POST)
    public void registerPage(HttpServletRequest request, HttpServletResponse response, Model model, HttpSession session) throws IOException, ServletException {
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
//        request.getRequestDispatcher("register").forward(request, response);
        response.sendRedirect("/register");
    }
}
