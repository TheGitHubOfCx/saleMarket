package com.salemarket.service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.joinforwin.toolkit.kit.IdKit;
import com.salemarket.entity.*;
import com.salemarket.mapper.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by 14069 on 2019/4/3.
 */
@Service
@Transactional
public class DetailsService {

  @Autowired
  DetailsMapper detailsMapper;

  @Autowired
  SaleCartMapper saleCartMapper;

  @Autowired
  SaleCommentMapper saleCommentMapper;

  @Autowired
  SaleOrderMapper saleOrderMapper;

  @Autowired
  SaleAdressMapper saleAdressMapper;

  /**
   * 查询购物车根据UserId
   */
  public List<SaleCart> queryCartList(String userId) {
    List<SaleCart> cartList = saleCartMapper.selectList(new EntityWrapper<SaleCart>().eq("USER_ID", userId));
    return cartList;
  }

  /**
   * 删除购物车得某件商品
   */
  public void deleteGoodOfCart(String userId, String cartGoodId) {
    saleCartMapper.delete(new EntityWrapper<SaleCart>().eq("USER_ID", userId).eq("ID", cartGoodId));
  }

  /**
   * 改变购物车中某件商品得数量
   */
  public void changeGoodNum(Integer goodNum, String goodsOfCartId) {
    SaleCart saleCart = new SaleCart();
    saleCart.setId(goodsOfCartId);
    saleCart.setGoodNum(goodNum);
    saleCartMapper.updateById(saleCart);
  }

  /**
   * 加入购物车
   */
  public void addShopCar(String goodId, String userId, Integer goodNum) {
    SaleGoods saleGoods = detailsMapper.selectById(goodId);
    SaleCart saleCart = new SaleCart();
    saleCart.setId(IdKit.createId());
    saleCart.setUserId(userId);
    saleCart.setCreateData(new Date());
    saleCart.setGoodsId(goodId);
    saleCart.setGoodNum(goodNum);
    saleCart.setGoodName(saleGoods.getGoodsName());
    saleCartMapper.insert(saleCart);
  }

  /**
   * 查询订单
   */
  public List<SaleOrder> queryOrderListByUserId(String userId) {
    if (userId.length() > 0) {
      List<SaleOrder> orderList = saleOrderMapper.queryOrderInfoList(userId);
      return orderList;
    } else {
      List<SaleOrder> orderList = saleOrderMapper.queryOrderInfoList(null);
      return orderList;
    }
  }

  /**
   * 删除订单
   */
  public void deleteOrderById(String orderId) {
    saleOrderMapper.deleteById(orderId);
  }

  /**
   * 新增订单
   */
  public void addOrder(String userId, String goodsId, Integer buyNum, String cartId, String code, String orderId) {
    if (!StringUtils.isEmpty(orderId)) {
      saleOrderMapper.deleteById(orderId);
    }
    List<SaleAdress> list = saleAdressMapper.selectList(new EntityWrapper<SaleAdress>().eq("USER_ID", userId).eq("IS_USEED", "1"));
    SaleAdress saleAdress = list.get(0);
    SaleGoods saleGoods = detailsMapper.selectById(goodsId);
    Integer salesvolume = Integer.parseInt(saleGoods.getSalesvolume());
    String s1 = String.valueOf(salesvolume + 1);
    saleGoods.setSalesvolume(s1);
    detailsMapper.updateById(saleGoods);
    Integer goodsPrice = saleGoods.getGoodsPrice();
    int i = goodsPrice * buyNum;
    String s = String.valueOf(i);
    SaleOrder saleOrder = new SaleOrder();
    saleOrder.setId(IdKit.createId());
    saleOrder.setUserId(userId);
    saleOrder.setGoodsId(goodsId);
    saleOrder.setGoodsName(saleGoods.getGoodsName());
    saleOrder.setBuyNum(buyNum);
    saleOrder.setIsBuy("1".equals(code) ? "1" : "0");
    saleOrder.setBuyPrice(s);
    saleOrder.setAddressId(saleAdress.getAdressId());
    saleOrderMapper.insert(saleOrder);
    deleteOrderById(orderId);
    saleCartMapper.delete(new EntityWrapper<SaleCart>().eq("ID", cartId));
  }


  /**
   * 查询商品详细
   */
  public SaleGoods getGoodsById(String goodId) {
    SaleGoods saleGoods = detailsMapper.selectById(goodId);
    return saleGoods;
  }


  /**
   * 查询商品评论
   */
  public List<SaleComment> queryCommentList(String goodId) {
    List<SaleComment> saleComments = saleCommentMapper.selectList(new EntityWrapper<SaleComment>().eq("GOODS_ID", goodId));
    return saleComments;
  }

  /**
   * 填写商品评论
   */
  public void addCommentById(String goodId, String comment, String userId) {
    SaleComment saleComment = new SaleComment();
    saleComment.setId(IdKit.createId());
    saleComment.setGoodsId(goodId);
    saleComment.setCreateDate(new Date());
    saleComment.setContent(comment);
    saleComment.setUserId(userId);
    saleCommentMapper.insert(saleComment);
  }

  /**
   * 根据用户Id查询收货地址
   */
  public List<SaleAdress> queryAdressById(String userId) {
    List<SaleAdress> list = saleAdressMapper.selectList(new EntityWrapper<SaleAdress>().eq("USER_ID", userId));
    return list;
  }

  /**
   * 修改使用收货地址
   */
  public void useAddress(String addressId, String userId) {
    List<SaleAdress> list = saleAdressMapper.selectList(new EntityWrapper<SaleAdress>().eq("USER_ID", userId));
    list.forEach(item -> {
      String adressId = item.getAdressId();
      if (adressId.equals(addressId)) {
        item.setIsUseed("1");
        saleAdressMapper.updateById(item);
      } else {
        item.setIsUseed("0");
        saleAdressMapper.updateById(item);
      }
    });
  }

  /**
   * 新增地址
   */
  public void addAddress(String detailAddress, String phoneNum, String userName, Map address, String userId) {
    String city = (String) address.get("city");
    String district = (String) address.get("district");
    String province = (String) address.get("province");
    SaleAdress saleAdress = new SaleAdress();
    saleAdress.setAdressId(IdKit.createId());
    saleAdress.setIsUseed("0");
    saleAdress.setProvince(province);
    saleAdress.setCity(city);
    saleAdress.setArea(district);
    saleAdress.setPhoneNum(phoneNum);
    saleAdress.setUserId(userId);
    saleAdress.setUserName(userName);
    saleAdress.setDetailAdress(detailAddress);
    saleAdressMapper.insert(saleAdress);
  }

  /**
   * 根据orderId查询商品
   */
  public SaleGoods getGoodInfo(String orderId) {
    SaleOrder saleOrder = saleOrderMapper.selectById(orderId);
    SaleGoods saleGoods = detailsMapper.selectById(saleOrder.getGoodsId());
    return saleGoods;
  }
}
