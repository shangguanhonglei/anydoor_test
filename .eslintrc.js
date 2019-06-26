module.exports = {
    //表示当前配置文件为根配置文件
    "root": true,
    //适用的环境
    "env": {
        "node": true,
        "mocha":true,
        "es6": true,
        "browser": true
    },
    //继承eslint默认的规则
    "extends": "eslint:recommended",
    //配置全局忽略的变量
    "globals": {
      "window": true
    },
    //检测滚则使用"babel-eslint"，babel可以验证es6语法
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "script"
    },
    //规则的值为关闭：off或0,警告：warn或1,错误：error或2
    "rules": {
      //禁止输入console
      "no-console": "off",
      "no-alert": "error",
      //禁止输入分号
      "semi": [
        "error",
        "never"
      ],
      //必须使用单引号
      "quotes":[
        "error",
        "single"
      ],
      //首行缩进两个空格
      "indent": [
        "error",
        2
      ],
      //换行使用unix换行
      "linebreak-style": [
        "error",
        "unix"
      ],
    }
};
