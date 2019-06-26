const http = require('http')
const config = require('./config/index')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const server = http.createServer((req,res)=>{
  //__dirname文件的目录
  //process.cwd()执行目录
  const filePath = path.join(process.cwd(),req.url)
  //检测文件或目录是否存在
  fs.stat(filePath,(err,stats)=>{
    //文件或目录不存在
    if(err){
      res.statusCode = 404
      res.setHeader('Content-Type','text/plain')
      res.end(`${filePath} is not a directory or file`)
      return
    }
    //检测是否是一个文件
    if(stats.isFile()){
      res.statusCode = 200
      res.setHeader('Content-Type','text/plain')
      fs.createReadStream(filePath).pipe(res)
    }
    //检测是否是一个目录
    else if(stats.isDirectory()){
      fs.readdir(filePath,(err,files)=>{
        res.statusCode = 200
        res.setHeader('Content-Type','text/plain')
        res.end(files.join(','))
      })
    }
  })
})
server.listen(config.port,config.host,()=>{
  const startInfo = `http://${config.host}:${config.port}`
  console.log(`Servering runing at ${chalk.green(startInfo)}`)
})
