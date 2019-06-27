const fs = require('fs')
const handlebars = require('handlebars')
const path = require('path')
const source = require(path.resolve(__dirname,'../template/dir'))
const promisify = require('util').promisify
//将回调改造成异步
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
module.exports = async function(req,res,filePath){
  try {
    //检测文件或目录是否存在
    const stats = await stat(filePath)
    //检测是否是一个文件
    if (stats.isFile()) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      fs.createReadStream(filePath).pipe(res)
    }
    //检测是否是一个目录
    else if (stats.isDirectory()) {
      const files = await readdir(filePath)
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      const template = handlebars.compile(source)
      const context = {
        title: 'anydoor目录结构',
        files
      }
      res.end(template(context))
    }
  } catch (e) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(`${filePath} is not a directory or file`)
    return
  }
}
