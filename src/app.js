const http = require('http')
const config = require('./config/index')
const chalk = require('chalk')
const path = require('path')
const route = require('./helper/route')
const handlebars = require('handlebars')
const server = http.createServer((req, res) => {
  //__dirname表示执行文件文件的目录
  //process.cwd()表示当前的执行目录
  const filePath = path.join(process.cwd(), req.url)
  route(req,res,filePath)

})
server.listen(config.port, config.host, () => {
  const startInfo = `http://${config.host}:${config.port}`
  console.log(`Servering runing at ${chalk.green(startInfo)}`)
})
