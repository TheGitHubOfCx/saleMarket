package com.salemarket.service;

import com.joinforwin.toolkit.entity.JFW_USER;
import com.joinforwin.toolkit.exception.UserException;
import com.joinforwin.toolkit.kit.EncryptKit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

/**
 * <p>
 * Title :
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
public class LoginService {
    private static final Logger LOG = LoggerFactory.getLogger(LoginService.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * 登录验证
     *
     * @param userId
     * @param password
     * @return
     */
    public JFW_USER verify(String userId, String password) throws UserException {
        if(userId.indexOf("@")==-1){
            JFW_USER userIdVerify=verifyUserId(userId, password, jdbcTemplate);
            return userIdVerify;
        }else{
            JFW_USER userEmailVerify= verifyEmail(userId, password, jdbcTemplate);
            return userEmailVerify;
        }


    }

    public JFW_USER verifyEmail(String email, String password, JdbcTemplate jdbcTemplate) throws UserException {
        LOG.debug("用户尝试登录{}", email);
        if(StringUtils.isEmpty(password)) {
            throw new UserException("密码不能为空");
        } else {
            String sql = "SELECT * FROM SALE_USER WHERE EMAIL = ?";
            List<JFW_USER> users = jdbcTemplate.query(sql, new Object[]{email}, new BeanPropertyRowMapper(JFW_USER.class));
            if(users.isEmpty()) {
                throw new UserException("该邮箱不存在:" + email);
            } else {
                JFW_USER user = (JFW_USER)users.get(0);
                if(!EncryptKit.md5(password).equals(user.getPassword())) {
                    throw new UserException("密码不正确:" + email);
                } else {
                    LOG.debug("用户登录成功{}", email);
                    return user;
                }
            }
        }

    }

    public JFW_USER verifyUserId(String userId, String password, JdbcTemplate jdbcTemplate) throws UserException {
        LOG.debug("用户尝试登录{}", userId);
        if(StringUtils.isEmpty(password)) {
            throw new UserException("密码不能为空");
        } else {
            String sql = "SELECT * FROM SALE_USER WHERE ID = ?";
            List<JFW_USER> users = jdbcTemplate.query(sql, new Object[]{userId}, new BeanPropertyRowMapper(JFW_USER.class));
            if(users.isEmpty()) {
                throw new UserException("该用户不存在:" + userId);
            } else {
                JFW_USER user = (JFW_USER)users.get(0);
                if(!EncryptKit.md5(password).equals(user.getPassword())) {
                    throw new UserException("密码不正确:" + userId);
                } else {
                    LOG.debug("用户登录成功{}", userId);
                    return user;
                }
            }
        }
    }
}
