import React from 'react'

export default function fileKit(type) {
  const picture = ["png","bmp","pcx","tiff","gif","jpeg","tga","exif","fpx","svg","psd","cdr","pcd","dxf","ufo","eps","jpg"],
    zip = ["rar","zip","cad","iso","7z"],word = ["doc","docx","docm","dotm","xml","dot","dotx"],txt = ["txt"],excel = ["xls","xlsx","xlsm"],pdf = ["pdf"]
  type = type.indexOf(".") === -1 ? type.toLowerCase() : type.toLowerCase().substring(1)
  if(picture.indexOf(type) !== -1){
    return "picture"
  }else if(zip.indexOf(type) !== -1){
    return "rar.png"
  }else if(word.indexOf(type) !== -1){
    return "doc.png"
  }else if(txt.indexOf(type) !== -1){
    return "txt.png"
  }else if(excel.indexOf(type) !== -1){
    return "xls.png"
  }else if(pdf.indexOf(type) !== -1){
    return "pdf.png"
  }else{
    return "default.png"
  }
}
