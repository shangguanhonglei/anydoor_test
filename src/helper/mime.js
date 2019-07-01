const path = require('path')
const mimeTypes = {
  html: 'text/html',
  css: 'text/css',
  js: 'application/x-javascript',
  jpg: 'image/jpeg',
  json: 'application/json',
  png: 'image/png',
  txt: 'text/plain'

}
//根据文件后缀获取文件类型
module.exports = (filePath) =>{
  let ext = path.extname(filePath).split('.').pop().toLowerCase()
  if(!ext){
    ext = filePath
  }
  return mimeTypes[ext] || mimeTypes['txt']
}
