/*
  range字段的作用是在http请求过程中分段进行请求。
  在终端工具运行curl -i -r 0-30  http://127.0.0.1:3000/LICENSE查看效果
*/
module.exports = (totalSize,req,res)=>{
  const range = req.headers['range']
  //如果未获取到range，则返回200状态码
  if(!range){
    return {code: 200}
  }
  //range一般的值是range:'bytes=0-125'，这里用正则获取到开始字节和结束字节
  const sizes = range.match(/bytes=(\d*)-(\d*)/)
  const end = sizes[2] || totalSize - 1
  const start = sizes[1] || totalSize - end
  //如果开始字节大于结束字节或者开始字节小于0或者结束字节大于总字节数，返回200状态码
  if(start > end || start < 0 || end > totalSize){
    return {code: 200}
  }
  //设置http请求response关于range的字段设置
  res.setHeader('Accept-Ranges','bytes')
  res.setHeader('Content-Range',`bytes ${start}-${end}/${totalSize}`)
  res.setHeader('Content-Length',end -start)
  return {
    code: 206,
    start: parseInt(start),
    end: parseInt(end)
  }

}
