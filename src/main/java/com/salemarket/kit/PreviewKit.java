package com.salemarket.kit;

import com.joinforwin.toolkit.kit.CloseKit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

/**
 * <p>
 * Title :JAVA_WEB 預覽
 * </p>
 * <p>
 * Author :dhl  2018/12/26
 * </p>
 */
public class PreviewKit {

    final Logger logger = LoggerFactory.getLogger(this.getClass());

    public static void prew(String path, HttpServletResponse response){
        String[] splitPath = path.split("/");
        String name = splitPath[splitPath.length - 1];
        String savePath = path.replace(name, "");
        String[] splitStr = name.split("\\.");
        String suffix = splitStr[1].toLowerCase();
        try {
            if (suffix.equals("png") || suffix.equals("jpg") || suffix.equals("jpeg") || suffix.equals("pdf")) {
                imgAndPdfPrew(path, suffix, response);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 图片，pdf预览
     *
     * @param path
     * @param response
     * @throws IOException
     */
    public static void imgAndPdfPrew(String path, String suffix, HttpServletResponse response) throws IOException {
        FileInputStream fileIs = null;
        //得到向客户端输出二进制数据的对象
        OutputStream outStream = response.getOutputStream();
        try {
            fileIs = new FileInputStream(path);
            //得到文件大小
            int i = fileIs.available();
            byte data[] = new byte[i];
            //读数据
            fileIs.read(data);
            if (suffix.equals("pdf")) {
                response.setContentType("application/pdf");
            } else {
                response.setContentType("image/" + suffix);
            }
            //输出数据
            outStream.write(data);
            outStream.flush();
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            CloseKit.close(outStream);
            CloseKit.close(fileIs);
        }
    }
}
