const http = require('http')
const config = require('./config')
const chalk = require('chalk')
const path = require('path')
const route = require('./helper/route')
const openUrl = require('./helper/openUrl')

class Server {
  constructor(conf){
    this.config = Object.assign({},config,conf)
  }

  start(){
    const server = http.createServer((req, res) => {
      //__dirname表示当前编辑的文件所在目录
      //process.cwd()表示node启动的文件所在目录
      const filePath = path.join(process.cwd(), req.url)
      route(req,res,filePath,this.config)

    })
    server.listen(this.config.port, this.config.host, () => {
      const startInfo = `http://${this.config.host}:${this.config.port}`
      /* eslint-disable no-console*/
      console.log(`Servering runing at ${chalk.green(startInfo)}`)
      openUrl(startInfo)
    })
  }
}
module.exports = Server

