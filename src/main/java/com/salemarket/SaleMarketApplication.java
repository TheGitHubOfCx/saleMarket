package com.salemarket;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@MapperScan(basePackages = "com.salemarket") //mapper扫描
@EnableScheduling //定时任务
@Configuration //定义配置类
public class SaleMarketApplication {

    public static void main(String[] args) {
        SpringApplication.run(SaleMarketApplication.class, args);
    }

}
