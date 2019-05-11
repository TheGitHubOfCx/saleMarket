package com.salemarket.kit;

import com.joinforwin.toolkit.kit.CloseKit;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

/**
 * Created by dad on 2017/9/29.
 */
public class FileIoHelper {

    public static void updateFolder(MultipartFile file, String fullPath) throws IOException {
        if (!file.isEmpty()) {
            File targetFile = new File(fullPath);
            if (!targetFile.getParentFile().exists()) {
                targetFile.getParentFile().mkdirs();
            }
            // 转存文件
            file.transferTo(targetFile);
        } else {
            throw new RuntimeException("上传文件为空");
        }
    }

    public static void downloadFile(String fullPath, String downLoadName, HttpServletResponse response) {
        File file = new File(fullPath);
        if (file.exists()) {
            FileInputStream fis = null;
            BufferedInputStream bis = null;
            ServletOutputStream out = null;
            try {
                String fileName = new String(downLoadName.getBytes("UTF-8"), "iso-8859-1");
                response.reset();
                response.setContentType("application/octet-stream;charset=ISO8859-1");// 设置强制下载不打开
                response.addHeader("Content-Disposition", "attachment;fileName=" + fileName);// 设置文件名
                byte[] buffer = new byte[1024*1024];
                out = response.getOutputStream();
                fis = new FileInputStream(file);
                bis = new BufferedInputStream(fis);
                int i = bis.read(buffer);
                while (i != -1) {
                    out.write(buffer, 0, i);
                    i = bis.read(buffer);
                }
                out.flush();
            } catch (Exception e) {
                throw new RuntimeException("下载失败", e);
            } finally {
                CloseKit.close(out);
                CloseKit.close(bis);
                CloseKit.close(fis);
            }
        } else {
            throw new RuntimeException("下载文件不存在:" + fullPath);
        }
    }

    public static void removeFile(String fullPath) throws IOException {
        File file = new File(fullPath);
        if (file.exists()) {
            file.delete();
        } else {
            throw new RuntimeException("未找到文件");
        }
    }
}