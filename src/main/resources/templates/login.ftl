<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
<#--<head>-->
<#--<meta charset="UTF-8">-->
<#--<meta name="viewport"-->
<#--content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">-->
<#--<meta http-equiv="X-UA-Compatible" content="ie=edge">-->
<#--<link rel="stylesheet" href="/style/login.css">-->
<#--<title>网上零食销售系统</title>-->
<#--</head>-->
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
<#--<link href="framework/init/init.css?t=${time}" rel="stylesheet"/>-->
    <link href="${jsPath}/umi.css?t=${time}" rel="stylesheet"/>
    <title>网上零食销售系统</title>
    <style>
        body {
            --primary-color: #2663bc;
        }
    </style>
</head>

<script type="text/javascript">
    function post(url, params) {
        var temp = document.createElement("form"); //创建form表单
        temp.action = url;
        temp.method = "post";
        temp.style.display = "none";//表单样式为隐藏
        for (var item in params) {//初始化表单内部的控件
            //根据实际情况创建不同的标签元素
            var opt = document.createElement("input");  //添加input标签
            opt.type = "text";   //类型为text
            opt.id = item;      //设置id属性
            opt.name = item;    //设置name属性
            opt.value = params[item];   //设置value属性
            temp.appendChild(opt);
        }

        document.body.appendChild(temp);
        temp.submit();
        return temp;
    }
</script>
<#--<body>-->
<#--<img class="bg-img" src="/img/login.png"/>-->
<#--<form action="/login.do" method="post">-->
<#--<div class="login">登录</div>-->
<#--<div class="middle">-->
<#--请输入账号,密码登录-->
<#--</div>-->
<#--<input class="username" type="text" name="userId" placeholder="请输入用户名">-->
<#--<input class="password" type="password" name="password" placeholder="请输入密码">-->
<#--<div id="error">${error!""}</div>-->
<#--<button type="submit">登录</button>-->
<#--<a href="javascript:post('/registerPage.do')">注册</a>-->
<#--&lt;#&ndash;<div class="forget">忘记密码?</div>&ndash;&gt;-->
<#--</form>-->

<#--</body>-->
<body>
<div id="root"></div>
<script>
    window.sessionStorage.setItem('userId', '${(userId)?default("")}')
</script>
<script src="${jsPath}/umi.js?t=${time}"></script>
</body>

</html>