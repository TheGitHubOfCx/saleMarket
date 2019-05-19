package com.salemarket.controller;

import com.alibaba.fastjson.JSON;
import com.joinforwin.toolkit.result.Result;
import com.joinforwin.toolkit.result.ResultBuilder;
import com.salemarket.entity.SaleGoods;
import com.salemarket.entity.SaleMessage;
import com.salemarket.entity.SaleOrder;
import com.salemarket.entity.SaleUser;
import com.salemarket.service.DataPlayService;
import com.salemarket.service.ManageService;
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

  @Autowired
  ManageService manageService;

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
      String foodType = (String) map.get("foodType");
      List<SaleGoods> goodList = dataPlayService.getGoodList(input, type, foodType);
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
      String foodType = (String) map.get("foodType");
      List<SaleGoods> goodList = dataPlayService.goodsPagin(current, pageSize, input, type,foodType);
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

  @RequestMapping(value = "/addUserInfo", method = RequestMethod.POST)
  public Result addUser(@RequestBody Map map) {
    try {
      SaleUser saleUser = JSON.parseObject(JSON.toJSONString(map.get("values")), SaleUser.class);
      manageService.addUser(saleUser);
      return ResultBuilder.success().build();
    } catch (Exception e) {
      return ResultBuilder.error("新增用户失败失败", e).build();
    }
  }

  @RequestMapping(value = "/delUserInfo", method = RequestMethod.POST)
  public Result delUser(@RequestBody Map map) {
    try {
      String id = (String) map.get("id");
      manageService.delUser(id);
      return ResultBuilder.success().build();
    } catch (Exception e) {
      return ResultBuilder.error("删除用户失败失败", e).build();
    }
  }

  @RequestMapping(value = "/updateUser", method = RequestMethod.POST)
  public Result updateUser(@RequestBody Map map) {
    try {
      SaleUser saleUser = JSON.parseObject(JSON.toJSONString(map.get("values")), SaleUser.class);
      manageService.updateUser(saleUser);
      return ResultBuilder.success().build();
    } catch (Exception e) {
      return ResultBuilder.error("修改用户失败失败", e).build();
    }
  }

  @RequestMapping(value = "/addGoods", method = RequestMethod.POST)
  public Result addGoods(@RequestBody Map map) {
    try {
      SaleGoods saleGoods = JSON.parseObject(JSON.toJSONString(map.get("values")), SaleGoods.class);
      manageService.addGoods(saleGoods);
      return ResultBuilder.success().build();
    } catch (Exception e) {
      return ResultBuilder.error("新增商品失败失败", e).build();
    }
  }

  @RequestMapping(value = "/delGoods", method = RequestMethod.POST)
  public Result delGoods(@RequestBody Map map) {
    try {
      String id = (String) map.get("id");
      manageService.delGoods(id);
      return ResultBuilder.success().build();
    } catch (Exception e) {
      return ResultBuilder.error("删除商品失败失败", e).build();
    }
  }

  @RequestMapping(value = "/updateGoods", method = RequestMethod.POST)
  public Result updateGoods(@RequestBody Map map) {
    try {
      SaleGoods saleGoods = JSON.parseObject(JSON.toJSONString(map.get("values")), SaleGoods.class);
      manageService.updateGoods(saleGoods);
      return ResultBuilder.success().build();
    } catch (Exception e) {
      return ResultBuilder.error("修改商品失败失败", e).build();
    }
  }

  @RequestMapping(value = "/queryOrderList", method = RequestMethod.POST)
  public Result queryOrderList() {
    try {
      List<SaleOrder> orderList = manageService.queryOrderList();
      return ResultBuilder.withPayload(orderList).build();
    } catch (Exception e) {
      return ResultBuilder.error("查询订单失败失败", e).build();
    }
  }

  @RequestMapping(value = "/addOrderInfo", method = RequestMethod.POST)
  public Result addOrder(@RequestBody Map map) {
    try {
      SaleOrder saleOrder = JSON.parseObject(JSON.toJSONString(map.get("values")), SaleOrder.class);
      manageService.addOrder(saleOrder);
      return ResultBuilder.success().build();
    } catch (Exception e) {
      return ResultBuilder.error("新增订单失败", e).build();
    }
  }

  @RequestMapping(value = "/updateOrder", method = RequestMethod.POST)
  public Result updateOrder(@RequestBody Map map) {
    try {
      SaleOrder saleOrder = JSON.parseObject(JSON.toJSONString(map.get("values")), SaleOrder.class);
      manageService.updateOrder(saleOrder);
      return ResultBuilder.success().build();
    } catch (Exception e) {
      return ResultBuilder.error("修改订单失败", e).build();
    }
  }

  @RequestMapping(value = "/delOrder", method = RequestMethod.POST)
  public Result delOrder(@RequestBody Map map) {
    try {
      String id = (String) map.get("id");
      manageService.delOrder(id);
      return ResultBuilder.success().build();
    } catch (Exception e) {
      return ResultBuilder.error("删除订单失败", e).build();
    }
  }


}
