package com.salemarket.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.salemarket.entity.SaleGoods;
import com.salemarket.entity.SaleUser;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by 14069 on 2019/3/21.
 */
@Repository
public interface DataPlayMapper extends BaseMapper<SaleUser> {

    List<SaleGoods> getGoodList(@Param("input") String input, @Param("type") String type);

    List<SaleGoods> goodsPagin(@Param("limit") int limit, @Param("pageSize") int pageSize, @Param("input") String input, @Param("type") String type);

}
