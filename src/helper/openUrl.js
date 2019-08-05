//利用子进程在浏览器中打开一个网页地址
const { exec } = require('child_process')
module.exports = url => {
  switch (process.platform) {
  //兼容mac
  case 'darwin':
    exec(`open ${url}`)
    break
    //兼容windows
  case 'win32':
    exec(`start ${url}`)
    break
  }
}
