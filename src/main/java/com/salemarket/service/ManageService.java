package com.salemarket.service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.joinforwin.toolkit.kit.EncryptKit;
import com.joinforwin.toolkit.kit.IdKit;
import com.salemarket.entity.SaleGoods;
import com.salemarket.entity.SaleOrder;
import com.salemarket.entity.SaleUser;
import com.salemarket.kit.FileIoHelper;
import com.salemarket.kit.PreviewKit;
import com.salemarket.mapper.SaleGoodsMapper;
import com.salemarket.mapper.SaleOrderMapper;
import com.salemarket.mapper.SaleUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by 14069 on 2019/5/12.
 */
@Service
@Transactional
public class ManageService {

    @Autowired
    SaleUserMapper saleUserMapper;

    @Autowired
    SaleGoodsMapper saleGoodsMapper;

    @Autowired
    SaleOrderMapper saleOrderMapper;


    public void addUser(SaleUser saleUser) {
        saleUser.setPassword(EncryptKit.md5(saleUser.getPassword()));
        saleUser.setId(saleUser.getName());
        saleUserMapper.insert(saleUser);
    }

    public void delUser(String id) {
        saleUserMapper.deleteById(id);
    }

    public void updateUser(SaleUser saleUser) {
        saleUserMapper.updateById(saleUser);
    }

    public void addGoods(SaleGoods saleGoods,Map file) {
        saleGoods.setId(IdKit.createId());
        saleGoods.setUploadFile(((String) file.get("filePath")));
        saleGoods.setFileId((String) file.get("fileId"));
        saleGoodsMapper.insert(saleGoods);
    }

    public void addGoodsNoFile(SaleGoods saleGoods) {
        saleGoods.setId(IdKit.createId());
        saleGoodsMapper.insert(saleGoods);
    }

    public void delGoods(String id) {
        saleGoodsMapper.deleteById(id);
    }

    public void updateGoods(SaleGoods saleGoods,Map file) {
        saleGoods.setUploadFile(((String) file.get("filePath")));
        saleGoods.setFileId((String) file.get("fileId"));
        saleGoodsMapper.updateById(saleGoods);
    }

    public void updateGoodsNoFile(SaleGoods saleGoods) {
        saleGoodsMapper.updateById(saleGoods);
    }



    public List<SaleOrder> queryOrderList() {
        List<SaleOrder> orderList = saleOrderMapper.selectList(new EntityWrapper<SaleOrder>().orderBy("CREATE_DATE", false));
        return orderList;
    }

    public void addOrder(SaleOrder saleOrder) {
        saleOrder.setId(IdKit.createId());
        saleOrderMapper.insert(saleOrder);
    }

    public void delOrder(String id) {
        saleOrderMapper.deleteById(id);
    }

    public void updateOrder(SaleOrder saleOrder) {
        saleOrderMapper.updateById(saleOrder);
    }


    private String getFilePath(String storagePath, String fileName) {
        String separator = System.getProperty("file.separator");
        return System.getProperty("user.home") + separator + storagePath + separator + fileName;
    }

    /**
     * 上传附件
     *
     * @return
     */
    public Map uploadFile(MultipartFile file) {
        Map map = new HashMap();
        if (!file.isEmpty()) {
            try {
                String fileId = IdKit.createId();
                String fileNameFullName = file.getOriginalFilename();
                String fileSuffix;
                fileSuffix = fileNameFullName.substring(fileNameFullName.lastIndexOf("."), fileNameFullName.length());
                String path = getFilePath("taskManage", fileId + fileSuffix);
                // 转存文件
                FileIoHelper.updateFolder(file, path);
                map.put("filePath", fileId + fileSuffix);
                map.put("fileType", fileSuffix.substring(1));
                map.put("fileId", fileId);
            } catch (Exception e) {
                throw new RuntimeException("上传发生异常", e);
            }
        } else {
            throw new RuntimeException("上传文件为空");
        }
        return map;
    }

    /**
     * 图片回显
     */
    public void preview(String id, String name, HttpServletResponse response) throws Exception {
        String fileSuffix = name.substring(name.lastIndexOf("."), name.length());
        String path = getFilePath("taskManage", id + fileSuffix);
        PreviewKit.prew(path, response);
    }

    /**
     * 删除附件
     */
    public void onDeleteFile(String filePath,String fileId) {
        String fullPath = getFilePath("taskManage", filePath);
        try {
            FileIoHelper.removeFile(fullPath);
        } catch (IOException e) {
            throw new RuntimeException("删除附件失败" + e.getMessage());
        }
    }

}
