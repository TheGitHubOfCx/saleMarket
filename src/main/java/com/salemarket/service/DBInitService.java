package com.salemarket.service;

import com.joinforwin.toolkit.helper.DbInitializeHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * Title : 数据库初始化服务
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Author :tyz 2017/6/8
 * </p>
 * <p>
 * Department : 研发部
 * </p>
 * Copyright : ©2014-2014 江苏汇鑫融智软件科技有限公司
 * </p>
 */
@Service
public class DBInitService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * 执行初始化或升级
     */
    public DbInitializeHelper.InitResult initialize() {
        return DbInitializeHelper.initialize(jdbcTemplate, "documentBase");
    }

    /**
     * 版本通过
     *
     * @return
     */
    public DbInitializeHelper.InitResult versionPass() {
        return DbInitializeHelper.versionPass(jdbcTemplate);
    }

    /**
     * @param paramMap
     * @return
     */
    public DbInitializeHelper.InitResult runSql(Map<String, Object> paramMap) {
        List<String> pathItems = (List<String>) paramMap.get("pathItem");
        return DbInitializeHelper.runSql(jdbcTemplate, pathItems);
    }

    /**
     * 修改Sql
     */
    public DbInitializeHelper.InitResult updateSql(Map<String, Object> param) {
        String sql = (String) param.get("sql");
        String statusCode = (String) param.get("statusCode");
        List<String> pathItems = (List<String>) param.get("pathItem");
        return DbInitializeHelper.updateSql(sql, statusCode, pathItems);
    }
}
