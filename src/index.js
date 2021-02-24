//用户在终端运行anydoor时可以自定义参数
const yargs = require('yargs')
const Server = require('./app')
const argv = yargs
  .option('p', {
    alias: 'port',//和config.js中port名字保持一致
    describe: '端口号',
    default: 3000
  })
  .option('h', {
    alias: 'host',
    describe: 'hostname',
    default: '127.0.0.1'
  })
  .option('d', {
    alias: 'root',
    describe: '根目录',
    default: process.cwd()
  })
  .version()
  .alias('v', 'version')
  .help()
  .argv
const server = new Server(argv)
server.start()
