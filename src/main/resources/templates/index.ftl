<!doctype html>
<html lang="en">
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
<body>
<div id="root"></div>
<script>
    window.sessionStorage.setItem('userId', '${(userId)?default("")}')
</script>
<script src="${jsPath}/umi.js?t=${time}"></script>
</body>
</html>