package com.salemarket.controller;

import com.joinforwin.toolkit.helper.DbInitializeHelper;
import com.joinforwin.toolkit.result.Result;
import com.joinforwin.toolkit.result.ResultBuilder;
import com.salemarket.service.DBInitService;
import com.salemarket.service.IndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Map;


/**
 * <p>
 * Title :
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Author :tyz 2017/6/5
 * </p>
 * <p>
 * Department : 研发部
 * </p>
 * Copyright : ©2014-2014 江苏汇鑫融智软件科技有限公司
 * </p>
 */
@Controller
@ConfigurationProperties(prefix = "jfw")
public class IndexController {

    final static long time = System.currentTimeMillis();

    @Value("${jfw.is-dev}")
    private boolean isDev;

    @Value("${jfw.dev-server-port}")
    private int port;

    @Autowired
    IndexService indexService;

    @Autowired
    DBInitService dbInitService;

    @RequestMapping(value = {"/"})
    public String index(HttpServletRequest request, HttpSession session, Model model) {
        model.addAttribute("time", time);
        String userId = (String) session.getAttribute("userId");
        model.addAttribute("jsPath", getIndexPath(isDev, port));
        if (StringUtils.isEmpty(userId)) {
            return "login";
        } else {
            return "index";
        }
    }

    @RequestMapping(value = {"/register"})
    public String register(HttpServletRequest request, HttpSession session, Model model) {
        model.addAttribute("time", time);
        String userId = (String) session.getAttribute("userId");
        model.addAttribute("jsPath", getIndexPath(isDev, port));
        return "index";
    }

    @RequestMapping(value = {"/login"})
    public String taskManageLogin(HttpSession session, Model model, HttpServletRequest request, HttpServletResponse response) {
        String user = (String) session.getAttribute("user");
        model.addAttribute("user", user);
        model.addAttribute("loginUser", session.getAttribute("loginUser"));
        return "login";
    }

    @RequestMapping("/versionPass")
    @ResponseBody
    public Result versionPass() {
        DbInitializeHelper.InitResult initResult = dbInitService.versionPass();
        if (null == initResult) {
            return ResultBuilder.success().build();
        } else {
            return ResultBuilder.withPayload(initResult).build();
        }
    }

    /**
     * 数据库初始化
     *
     * @param param
     * @return
     */
    @RequestMapping(value = "/runSql", method = RequestMethod.POST)
    @ResponseBody
    public Result runSql(@RequestBody Map<String, Object> param) {
        DbInitializeHelper.InitResult initResult = dbInitService.runSql(param);
        return ResultBuilder.withPayload(initResult).build();
    }

    @RequestMapping(value = "/updateSql", method = RequestMethod.POST)
    @ResponseBody
    public Result updateSql(@RequestBody Map<String, Object> param) {
        DbInitializeHelper.InitResult initResult = dbInitService.updateSql(param);
        return ResultBuilder.withPayload(initResult).build();
    }

    String getIndexPath(boolean isDev, int port) {
        if (isDev) {
            return "http://localhost:" + port;
        } else {
            return "../dist";
        }
    }

    private String getInitPath() {
        return "framework/init/init.js?k=" + time;
    }
}
