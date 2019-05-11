package com.salemarket.controller;

import com.joinforwin.toolkit.result.Result;
import com.joinforwin.toolkit.result.ResultBuilder;
import com.salemarket.entity.SaleGoods;
import com.salemarket.entity.SaleMessage;
import com.salemarket.entity.SaleUser;
import com.salemarket.service.DataPlayService;
import com.wordnik.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * Created by 14069 on 2019/3/21.
 */
@RestController
public class DataPlayController {

    @Autowired
    DataPlayService dataPlayService;

    @RequestMapping(value = "/queryUserList", method = RequestMethod.POST)
    public Result queryUserList() {
        try {
            List<SaleUser> saleUsersList = dataPlayService.queryUserList();
            return ResultBuilder.withPayload(saleUsersList).build();
        } catch (Exception e) {
            return ResultBuilder.error("查询用户列表失败", e).build();
        }
    }

    /**
     * 注册
     */
    @ApiOperation("获取手机验证码")
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public Result registerUser(@RequestBody Map map, HttpServletResponse response) {
        try {
            String userName = (String) map.get("userName");
            String passWord = (String) map.get("passWord");
            String phoneNum = (String) map.get("phoneNum");
            String sex = (String) map.get("sex");
            dataPlayService.registerUser(userName, passWord, phoneNum, sex, response);
            return ResultBuilder.success().build();
        } catch (Exception e) {
            return ResultBuilder.error("注册失败", e).build();
        }
    }

    @RequestMapping(value = "/getGoodList", method = RequestMethod.POST)
    public Result getGoodList(@RequestBody Map map) {
        try {
            String input = (String) map.get("input");
            String type = (String) map.get("type");
            List<SaleGoods> goodList = dataPlayService.getGoodList(input, type);
            return ResultBuilder.withPayload(goodList).build();
        } catch (Exception e) {
            return ResultBuilder.error("查询商品列表失败", e).build();
        }
    }

    @RequestMapping(value = "/goodsPagin", method = RequestMethod.POST)
    public Result goodsPagin(@RequestBody Map map) {
        try {
            int current = (int) map.get("current");
            int pageSize = (int) map.get("pageSize");
            String input = (String) map.get("input");
            String type = (String) map.get("type");
            List<SaleGoods> goodList = dataPlayService.goodsPagin(current, pageSize, input, type);
            return ResultBuilder.withPayload(goodList).build();
        } catch (Exception e) {
            return ResultBuilder.error("查询分页商品列表失败", e).build();
        }
    }

    @RequestMapping(value = "/queryMessage", method = RequestMethod.POST)
    public Result queryMessage() {
        try {
            List<SaleMessage> saleMessages = dataPlayService.queryMessage();
            return ResultBuilder.withPayload(saleMessages).build();
        } catch (Exception e) {
            return ResultBuilder.error("发布留言失败", e).build();
        }
    }


    @RequestMapping(value = "/addMessage", method = RequestMethod.POST)
    public Result addMessage(@RequestBody Map map) {
        try {
            String message = (String) map.get("message");
            String userId = (String) map.get("userId");
            dataPlayService.addMessage(message, userId);
            return ResultBuilder.success().build();
        } catch (Exception e) {
            return ResultBuilder.error("发布留言失败", e).build();
        }
    }


}
