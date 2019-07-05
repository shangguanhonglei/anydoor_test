module.exports = {
  host: '127.0.0.1',
  port: 3000,
  compress: /\.(html|js|css|md)$/,
  cache:{
    maxAge: 600,
    expires: true,//属于强制缓存，但本身存在缺陷
    cacheControl: true,//属于强制缓存
    lastModified: true,//属于协商缓存
    etag: true,//属于协商缓存
  }
}
