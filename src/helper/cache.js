const { cache } = require('../config')
const refreshRes = (stats,res)=>{
  const {maxAge,expires, cacheControl, lastModified, etag} = cache
  if(expires){
    res.setHeader('Expires',(new Date(Date.now()+ maxAge*1000)).toUTCString())
  }
  if(cacheControl){
    res.setHeader('Cache-Control',`public,max-age=${maxAge}`)
  }
  if(lastModified){
    res.setHeader('Last-Modified',stats.mtime.toUTCString())
  }
  if(etag){
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
  //如果获取到lastModified参数，但是和响应的Last-Modified参数的值不向等时，不使用缓存
  if(lastModified && lastModified !== res.getHeader('Last-Modified')){
    return false
  }
  if(etag && etag !== res.getHeader('ETag')){
    return false
  }
  return true

}
