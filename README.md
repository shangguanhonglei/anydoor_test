# anydoor
Tiny nodejs static web server
# 安装
```
npm i -g anydoor
```
# 使用方法
```
anydoor # 把当前文件夹作为静态资源服务器根目录

anydoor -p 8080 # 设置端口号为 8080

anydoor -h localhost # 设置host为localhost

anydoor -d /usr # 设置跟目录为/usr
```
# 配置bin目录
> 在package中配置bin参数并且在根目录下新建bin目录
```
  "bin": {
      "anydoor": "bin/anydoor"
  }
  //在anydoor文件中写入下面两句代码
  #!/usr/bin/env node
  require('../src/index')
```
# 版本号x.y.z
> z表示修改bug后升级，y表示功能迭代，x表示版本彻底升级并且不兼容之前的版本
- 1.2.*表示x和y位用固定的z位用最新的
- ～1.2.0等同^2.0.0表示x位大版本固定，y和z位版本用最新的
# 发布npm包
```
npm login //登录npm，此时不应使用cnpm
npm publish //推送项目，每次推送都需要升级版本
```
# 安装npm包
```
npm install anydoor_test_lulin -g
```
> 需要注意，安装包时，npm只会自动安装package.json中dependencies里面的依赖项


