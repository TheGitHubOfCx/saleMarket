package com.salemarket.kit;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

/**
 * Created by llb on 2017/6/30.
 */
public class Base64Kit {
    // 加密
    public static String getBase64(String str) {
        byte[] b = null;
        String s = null;
        try {
            b = str.getBytes("utf-8");
        } catch (Exception e) {
            throw new RuntimeException("base64加密失败", e);
        }
        if (b != null) {
            s = new BASE64Encoder().encode(b);
        }
        return s;
    }

    // 解密
    public static String getFromBase64(String s) {
        byte[] b = null;
        String result = null;
        if (s != null) {
            BASE64Decoder decoder = new BASE64Decoder();
            try {
                b = decoder.decodeBuffer(s);
                result = new String(b, "utf-8");
            } catch (Exception e) {
                throw new RuntimeException("base64解密失败", e);
            }
        }
        return result;
    }
}
