package com.salemarket.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.salemarket.entity.SaleOrder;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by 14069 on 2019/4/3.
 */
@Repository
public interface SaleOrderMapper extends BaseMapper<SaleOrder> {

  List<SaleOrder> queryOrderInfoList(@Param("userId") String userId);
}
