package com.salemarket.controller;

import com.joinforwin.toolkit.result.Result;
import com.joinforwin.toolkit.result.ResultBuilder;
import com.salemarket.entity.*;
import com.salemarket.mapper.SaleOrderMapper;
import com.salemarket.service.DetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Created by 14069 on 2019/4/3.
 */
@RestController
public class DetailsController {

  @Autowired
  DetailsService detailsService;

  @Autowired
  SaleOrderMapper saleOrderMapper;


  @RequestMapping(value = "/getGoodsById", method = RequestMethod.POST)
  public Result getGoodsById(@RequestBody Map map) {
    try {
      String goodId = (String) map.get("goodId");
      SaleGoods goodsById = detailsService.getGoodsById(goodId);
      return ResultBuilder.withPayload(goodsById).build();
    } catch (Exception e) {
      return ResultBuilder.error("查询商品失败", e).build();
    }
  }

  @RequestMapping(value = "/addShopCar", method = RequestMethod.POST)
  public Result addShopCar(@RequestBody Map map) {
    try {
      String goodId = (String) map.get("goodId");
      String userId = (String) map.get("userId");
      Integer goodNum = (Integer) map.get("goodNum");
      detailsService.addShopCar(goodId, userId, goodNum);
      return ResultBuilder.success().build();
    } catch (Exception e) {
      return ResultBuilder.error("加入购物车失败", e).build();
    }
  }

  @RequestMapping(value = "/addCommentById", method = RequestMethod.POST)
  public Result addCommentById(@RequestBody Map map) {
    try {
      String goodId = (String) map.get("goodId");
      String comment = (String) map.get("comment");
      String userId = (String) map.get("userId");
      detailsService.addCommentById(goodId, comment, userId);
      return ResultBuilder.success().build();
    } catch (Exception e) {
      return ResultBuilder.error("加入购物车失败", e).build();
    }
  }

  @RequestMapping(value = "/queryCartList", method = RequestMethod.POST)
  public Result queryCartList(@RequestBody Map map) {
    try {
      String userId = (String) map.get("userId");
      List<SaleCart> cartList = detailsService.queryCartList(userId);
      return ResultBuilder.withPayload(cartList).build();
    } catch (Exception e) {
      return ResultBuilder.error("加入购物车失败", e).build();
    }
  }

  @RequestMapping(value = "/deleteGoodOfCart", method = RequestMethod.POST)
  public Result deleteGoodOfCart(@RequestBody Map map) {
    try {
      String userId = (String) map.get("userId");
      String cartId = (String) map.get("cartId");
      detailsService.deleteGoodOfCart(userId, cartId);
      return ResultBuilder.success().build();
    } catch (Exception e) {
      return ResultBuilder.error("加入购物车失败", e).build();
    }
  }

  @RequestMapping(value = "/changeGoodNum", method = RequestMethod.POST)
  public Result changeGoodNum(@RequestBody Map map) {
    try {
      Integer goodNum = (Integer) map.get("goodNum");
      String goodsOfCartId = (String) map.get("goodsOfCartId");
      detailsService.changeGoodNum(goodNum, goodsOfCartId);
      return ResultBuilder.success().build();
    } catch (Exception e) {
      return ResultBuilder.error("加入购物车失败", e).build();
    }
  }

  @RequestMapping(value = "/queryOrderListByUserId", method = RequestMethod.POST)
  public Result queryOrderListByUserId(@RequestBody Map map) {
    try {
      String userId = (String) map.get("userId");
      List<SaleOrder> saleOrders = detailsService.queryOrderListByUserId(userId);
      return ResultBuilder.withPayload(saleOrders).build();
    } catch (Exception e) {
      return ResultBuilder.error("加入购物车失败", e).build();
    }
  }

  @RequestMapping(value = "/updateOrderStatus", method = RequestMethod.POST)
  public Result updateOrderStatus(@RequestBody Map map) {
    try {
      String id = (String) map.get("id");
      SaleOrder saleOrder = saleOrderMapper.selectById(id);
      saleOrder.setStatus("1");
      saleOrderMapper.updateById(saleOrder);
      return ResultBuilder.success().build();
    } catch (Exception e) {
      return ResultBuilder.error("发货失败", e).build();
    }
  }

  @RequestMapping(value = "/completeOder", method = RequestMethod.POST)
  public Result completeOder(@RequestBody Map map) {
    try {
      String id = (String) map.get("id");
      SaleOrder saleOrder = saleOrderMapper.selectById(id);
      saleOrder.setStatus("2");
      saleOrderMapper.updateById(saleOrder);
      return ResultBuilder.success().build();
    } catch (Exception e) {
      return ResultBuilder.error("发货失败", e).build();
    }
  }


  @RequestMapping(value = "/deleteOrderById", method = RequestMethod.POST)
  public Result deleteOrderById(@RequestBody Map map) {
    try {
      String orderId = (String) map.get("orderId");
      detailsService.deleteOrderById(orderId);
      return ResultBuilder.success().build();
    } catch (Exception e) {
      return ResultBuilder.error("加入购物车失败", e).build();
    }
  }

  @RequestMapping(value = "/addOrder", method = RequestMethod.POST)
  public Result addOrder(@RequestBody Map map) {
    try {
      String userId = (String) map.get("userId");
      String goodsId = (String) map.get("goodId");
      Integer buyNum = (Integer) map.get("buyNum");
      String cartId = (String) map.get("cartId");
      String code = (String) map.get("code");
      String orderId = (String) map.get("orderId");
      detailsService.addOrder(userId, goodsId, buyNum, cartId, code, orderId);
      return ResultBuilder.success().build();
    } catch (Exception e) {
      return ResultBuilder.error("加入购物车失败", e).build();
    }
  }

  @RequestMapping(value = "/queryCommentList", method = RequestMethod.POST)
  public Result queryCommentList(@RequestBody Map map) {
    try {
      String goodId = (String) map.get("goodId");
      List<SaleComment> saleComments = detailsService.queryCommentList(goodId);
      return ResultBuilder.withPayload(saleComments).build();
    } catch (Exception e) {
      return ResultBuilder.error("加入购物车失败", e).build();
    }
  }

  @RequestMapping(value = "/queryAdressById", method = RequestMethod.POST)
  public Result queryAdressById(@RequestBody Map map) {
    try {
      String userId = (String) map.get("userId");
      List<SaleAdress> list = detailsService.queryAdressById(userId);
      return ResultBuilder.withPayload(list).build();
    } catch (Exception e) {
      return ResultBuilder.error("查询收获地址失败", e).build();
    }
  }

  @RequestMapping(value = "/useAddress", method = RequestMethod.POST)
  public Result useAddress(@RequestBody Map map) {
    try {
      String addressId = (String) map.get("addressId");
      String userId = (String) map.get("userId");
      detailsService.useAddress(addressId, userId);
      return ResultBuilder.success().build();
    } catch (Exception e) {
      return ResultBuilder.error("修改收获地址失败", e).build();
    }
  }

  @RequestMapping(value = "/addAddress", method = RequestMethod.POST)
  public Result addAddress(@RequestBody Map map) {
    try {
      String detailAddress = (String) map.get("detailAddress");
      String phoneNum = (String) map.get("phoneNum");
      String userName = (String) map.get("userName");
      Map address = (Map) map.get("address");
      String userId = (String) map.get("userId");
      detailsService.addAddress(detailAddress, phoneNum, userName, address, userId);
      return ResultBuilder.success().build();
    } catch (Exception e) {
      return ResultBuilder.error("新增收获地址", e).build();
    }
  }

  @RequestMapping(value = "/getGoodInfo", method = RequestMethod.POST)
  public Result getGoodInfo(@RequestBody Map map) {
    try {
      String orderId = (String) map.get("orderId");
      SaleGoods goodInfo = detailsService.getGoodInfo(orderId);
      return ResultBuilder.withPayload(goodInfo).build();
    } catch (Exception e) {
      return ResultBuilder.error("新增收获地址", e).build();
    }
  }


}
