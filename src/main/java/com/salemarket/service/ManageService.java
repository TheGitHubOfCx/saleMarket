package com.salemarket.service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.joinforwin.toolkit.kit.EncryptKit;
import com.joinforwin.toolkit.kit.IdKit;
import com.salemarket.entity.SaleGoods;
import com.salemarket.entity.SaleOrder;
import com.salemarket.entity.SaleUser;
import com.salemarket.mapper.SaleGoodsMapper;
import com.salemarket.mapper.SaleOrderMapper;
import com.salemarket.mapper.SaleUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by 14069 on 2019/5/12.
 */
@Service
@Transactional
public class ManageService {

    @Autowired
    SaleUserMapper saleUserMapper;

    @Autowired
    SaleGoodsMapper saleGoodsMapper;

    @Autowired
    SaleOrderMapper saleOrderMapper;


    public void addUser(SaleUser saleUser) {
        saleUser.setPassword(EncryptKit.md5(saleUser.getPassword()));
        saleUser.setId(saleUser.getName());
        saleUserMapper.insert(saleUser);
    }

    public void delUser(String id) {
        saleUserMapper.deleteById(id);
    }

    public void updateUser(SaleUser saleUser) {
        saleUserMapper.updateById(saleUser);
    }

    public void addGoods(SaleGoods saleGoods) {
        saleGoods.setId(IdKit.createId());
        saleGoodsMapper.insert(saleGoods);
    }

    public void delGoods(String id) {
        saleGoodsMapper.deleteById(id);
    }

    public void updateGoods(SaleGoods saleGoods) {
        saleGoodsMapper.updateById(saleGoods);
    }

    public List<SaleOrder> queryOrderList() {
        List<SaleOrder> orderList = saleOrderMapper.selectList(new EntityWrapper<SaleOrder>().orderBy("CREATE_DATE", false));
        return orderList;
    }

    public void addOrder(SaleOrder saleOrder) {
        saleOrder.setId(IdKit.createId());
        saleOrderMapper.insert(saleOrder);
    }

    public void delOrder(String id) {
        saleOrderMapper.deleteById(id);
    }

    public void updateOrder(SaleOrder saleOrder) {
        saleOrderMapper.updateById(saleOrder);
    }

}
