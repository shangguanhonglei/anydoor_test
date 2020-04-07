const fs = require('fs')
const handlebars = require('handlebars')
const path = require('path')
const promisify = require('util').promisify
const source = fs.readFileSync(path.join(__dirname,'../template/dir.tpl'),'utf-8')
const template = handlebars.compile(source)
const mime = require('./mime')
const compress = require('./compress')
const range = require('./range')
const cache = require('./cache')
//将回调函数改造成异步
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
module.exports = async function(req,res,filePath,config){
  try {
    //检测文件或目录是否存在
    const stats = await stat(filePath)
    //检测是否是一个文件
    if (stats.isFile()) {
      //根据文件后缀判断Content-Type的类型

      res.setHeader('Content-Type', mime(filePath))
      //如果开启缓存，则不返回数据同时状态置为304
      if(cache(stats,req,res)){
        res.statusCode = 304
        res.end()
        return
      }
      //提供客户端分段请求数据
      const { code,start,end } = range(stats.size,req,res)
      res.statusCode = code
      let rs
      if(code === 200){
        rs = fs.createReadStream(filePath)
      }else{
        rs = fs.createReadStream(filePath,{
          start,
          end
        })
      }
      //判断是否是需要压缩的文件类型，如果是则进行压缩
      if(filePath.match(config.compress)){
        rs = compress(rs,req,res)
      }
      rs.pipe(res)
    }
    //检测是否是一个目录
    else if (stats.isDirectory()) {
      const files = await readdir(filePath)
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      const dir = path.relative(process.cwd(),filePath)//解析为相对于app.js的相对路径
      const context = {
        title: 'anydoor目录结构',
        dir: dir ? `/${dir}` : '',
        files:files.map((file)=>{
          return {
            file,
            icon: mime(file)
          }
        })
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
