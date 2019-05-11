package com.salemarket.controller;

import com.joinforwin.toolkit.result.Result;
import com.joinforwin.toolkit.result.ResultBuilder;
import com.salemarket.service.SignInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * Created by 14069 on 2019/3/30.
 */
@RestController
public class SignInController {

    @Autowired
    SignInService signInService;

    @RequestMapping(value = "/userSignIn.do", method = RequestMethod.POST)
    public Result userSignIn(@RequestBody Map map, HttpServletRequest request, HttpServletResponse response) {
        try {
            String userName = (String) map.get("userName");
            String inPassWord = (String) map.get("inPassWord");
            String s = signInService.signIn(userName, inPassWord, request, response);
            if (s.equals("1")) {
                return ResultBuilder.withPayload(s).build();
            } else {
                return ResultBuilder.error("用户名或密码输入错误").build();
            }
        } catch (Exception e) {
            return ResultBuilder.error("登陆失败", e).build();
        }
    }

    @RequestMapping(value = "/userLayout.do", method = RequestMethod.POST)
    public Result userLayout(HttpServletRequest request) {
        try {
            request.getSession().setAttribute("userId", "");
            return ResultBuilder.success().build();
        } catch (Exception e) {
            return ResultBuilder.error("登陆失败", e).build();
        }
    }
}
