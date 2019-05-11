package com.salemarket.kit;

import com.joinforwin.toolkit.kit.CloseKit;
import org.apache.poi.hssf.usermodel.HSSFFormulaEvaluator;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFFormulaEvaluator;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ExcelKit {
    /**
     * 读取Excel数据内容
     *
     * @return Map 包含单元格数据内容的Map对象
     */
    public static List<String[]> readExcel(InputStream is, String fileType)
            throws IOException {
        try {
            Workbook wb = null;
            FormulaEvaluator evaluator = null;
            if (fileType.equals("xls")) {
                wb = new HSSFWorkbook(is);
                evaluator = new HSSFFormulaEvaluator((HSSFWorkbook) wb);
            } else if (fileType.equals("xlsx")) {
                wb = new XSSFWorkbook(is);
                evaluator = new XSSFFormulaEvaluator((XSSFWorkbook) wb);
            } else {
                throw new RuntimeException("上传功能仅支持xls与xlsx格式Excel");
            }
            Sheet sheet = wb.getSheetAt(0);
            Row row = sheet.getRow(0);
            // 得到总行数
            int maxRowNum = sheet.getPhysicalNumberOfRows();
            int maxColNum = row.getPhysicalNumberOfCells();

            // 正文内容应该从第二行开始,第一行为表头的标题
            List<String[]> dataList = new ArrayList<String[]>();

            for (int i = 0; i <= maxRowNum; i++) {
                row = sheet.getRow(i);
                if (null != row) {
                    String[] item = new String[maxColNum];
                    for (int j = 0; j < maxColNum; j++) {
                        item[j] = getStringValueFromCell(row.getCell(j), "YYYY-MM-DD", evaluator);
                    }
                    dataList.add(item);
                }
            }
            return dataList;
        } catch (Exception e) {
            throw new RuntimeException("上传的Excel格式不符合规范", e);
        } finally {
            CloseKit.close(is);
        }
    }

    /**
     * @param cell
     * @return
     */
    public static String getStringValueFromCell(Cell cell, String formatParam, FormulaEvaluator evaluator) {
        SimpleDateFormat sFormat = new SimpleDateFormat("MM/dd/yyyy");
        String cellValue = "";
        if (cell == null) {
            return cellValue;
        } else if (cell.getCellType() == Cell.CELL_TYPE_STRING) {
            cellValue = cell.getStringCellValue().trim();
        } else if (cell.getCellType() == XSSFCell.CELL_TYPE_NUMERIC) {
//            if (HSSFDateUtil.isCellDateFormatted(cell)) {
//                double d = cell.getNumericCellValue();
//                Date date = HSSFDateUtil.getJavaDate(d);
//                cellValue = sFormat.format(date);
//            } else {
//                cellValue = decimalFormat.format((cell.getNumericCellValue()));
//            }
            short fm = cell.getCellStyle().getDataFormat();
            SimpleDateFormat sdf = null;
            if (fm == 17 || fm == 14 || fm == 31 || fm == 57 || fm == 58) {
                //日期
                sdf = new SimpleDateFormat(formatParam);
                Date date = DateUtil.getJavaDate(cell.getNumericCellValue());
                cellValue = sdf.format(date);
            } else if (fm == 20 || fm == 21 || fm == 32) {
                sdf = new SimpleDateFormat("HH:mm:SS");
                Date date = DateUtil.getJavaDate(cell.getNumericCellValue());
                cellValue = sdf.format(date);
            } else {
                double v = cell.getNumericCellValue();
                CellStyle style = cell.getCellStyle();
                DecimalFormat decimalFormat = new DecimalFormat("#.#");
                String temp = style.getDataFormatString();
                if (temp.equals("General")) {
                    decimalFormat.applyPattern("#.#######");
                }
                cellValue = String.valueOf(decimalFormat.format(v));
            }
        } else if (cell.getCellType() == Cell.CELL_TYPE_BLANK) {
            cellValue = "";
        } else if (cell.getCellType() == Cell.CELL_TYPE_BOOLEAN) {
            cellValue = String.valueOf(cell.getBooleanCellValue());
        } else if (cell.getCellType() == Cell.CELL_TYPE_ERROR) {
            cellValue = "";
        } else if (cell.getCellType() == Cell.CELL_TYPE_FORMULA) {
//            cellValue = cell.getCellFormula().toString().trim();
            try {
                CellValue value1;
                value1 = evaluator.evaluate(cell);
                switch (value1.getCellType()) {              //判断公式类型
                    case Cell.CELL_TYPE_BOOLEAN:
                        cellValue = String.valueOf(value1.getBooleanValue());
                        break;
                    case Cell.CELL_TYPE_NUMERIC:
                        // 处理日期
                        if (DateUtil.isCellDateFormatted(cell)) {
                            SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd");
                            Date date = cell.getDateCellValue();
                            cellValue = format.format(date);
                        } else {
                            cellValue = String.valueOf(value1.getNumberValue());
                        }
                        break;
                    case Cell.CELL_TYPE_STRING:
                        cellValue = value1.getStringValue();
                        break;
                    case Cell.CELL_TYPE_BLANK:
                        cellValue = "";
                        break;
                    case Cell.CELL_TYPE_ERROR:
                        cellValue = "";
                        break;
                    case Cell.CELL_TYPE_FORMULA:
                        cellValue = "";
                        break;
                }
            } catch (Exception e) {
                cellValue = cell.getCellFormula().toString().trim();
                cell.getCellFormula();
            }
        }
        return cellValue;
    }
}
