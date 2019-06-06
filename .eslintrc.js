module.exports = {
    "root": true,
    "env": {
        //"node": true,
        "mocha":true,
        "es6": true,
        "browser": true
    },
    "extends": "eslint:recommended",
    "globals": {
      "window": true
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "script"
    },
    "rules": {
      "no-console": "error",
      "no-alert": "error",
      "semi": [
        "error",
        "never"
      ],
      "quotes":[
        "error",
        "single"
      ],
      "indent": [
        "error",
        2
      ],
      "linebreak-style": [
        "error",
        "unix"
      ],
    }
};
