package com.salemarket.controller;

import com.joinforwin.toolkit.result.Result;
import com.joinforwin.toolkit.result.ResultBuilder;
import com.salemarket.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * Created by 14069 on 2019/3/25.
 */
@RestController
public class RegisterController {

    @Autowired
    RegisterService registerService;

    @RequestMapping(value = "/getVcode", method = RequestMethod.POST)
    public Result getVcode(@RequestBody Map map) {
        try {
            String phoneNum = (String) map.get("phoneNum");
            String vcode = registerService.getVcode(phoneNum);
            return ResultBuilder.withPayload(vcode).build();
        } catch (Exception e) {
            return ResultBuilder.error("验证码发送失败", e).build();
        }
    }

    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    public Result addUser(@RequestBody Map map, HttpServletRequest request) {
        try {
            String phoneNum = (String) map.get("phoneNum");
            String userId = (String) map.get("userName");
            String sex = (String) map.get("sex");
            String passWord = (String) map.get("passWord");
            String s = registerService.addUser(phoneNum, userId, sex, passWord);
            return ResultBuilder.withPayload(s).build();
        } catch (Exception e) {
            return ResultBuilder.error("用户注册失败", e).build();
        }
    }


}
