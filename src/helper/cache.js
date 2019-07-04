const { cache } = require('../config')
const refreshRes = (stats,res)=>{
  //获取缓存类型及支持情况
  const {maxAge,expires, cacheControl, lastModified, etag} = cache
  //是否支持expires缓存设置
  //Expires接收一个GMT格式的时间字符串
  //如果客户端和服务端时间不一致,那么这个缓存机制就会存在问题
  if(expires){
    res.setHeader('Expires',(new Date(Date.now()+ maxAge*1000)).toUTCString())
  }
  //是否支持cacheControl缓存设置
  //public表示客户端和代理服务器都可以缓存，private表示只有客户端可以缓存
  if(cacheControl){
    res.setHeader('Cache-Control',`public,max-age=${maxAge}`)
  }
  //是否支持lastModified缓存设置
  if(lastModified){
    res.setHeader('Last-Modified',stats.mtime.toUTCString())
  }
  //是否支持etag缓存设置
  if(etag){
    //以${stats.size}-${stats.mtime}作为当前文件的唯一标识，文件在第二次请求时会携带这个标识
    res.setHeader('ETag',`${stats.size}-${stats.mtime}`)
  }
}
module.exports = (stats,req,res)=>{
  refreshRes(stats,res)
  //获取请求参数if-modified-since，它对应响应参数的Last-Modified参数
  const lastModified = req.headers['if-modified-since']
  //获取请求参数if-none-match，它对应响应参数的ETag参数
  const etag = req.headers['if-none-match']
  //如果两个参数都未获取到，则表示是第一次请求,不使用缓存
  if(!lastModified && !etag){
    return false
  }
  //如果获取到的文件最后一次修改时间不一致，则不使用缓存
  if(lastModified && lastModified !== res.getHeader('Last-Modified')){
    return false
  }
  //如果唯一标识不一致，则不使用缓存
  if(etag && etag !== res.getHeader('ETag')){
    return false
  }
  return true

}
