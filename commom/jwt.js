// 引入依赖模块
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

// 创建token类
class Jwt {
  constructor(data) {
    this.data = data;
    this._id = null; // 用户自定义 存放userid
    this._date = null; // 过期时间
    this._creatDate = null; // 创建时间
  }
  // 重新生成 token
  refreshToken() {
    let data = this.data;
    let created = Math.floor(Date.now() / 1000);
    let cert = 'myWeappNode'
    let token = jwt.sign({
      data,
      exp: created + 60 * 30, // 过期时间 
      iat: created, // 创建时间
    }, cert, { algorithm: 'RS256' });
    return token;
  }
  // 生成token
  generateToken(data) {
    console.log(data)
    if (data) {
      this.data = data;
    }
    let mydata = this.data;
    let created = Math.floor(Date.now() / 1000);
    // let cert = 'myWeappNode'
    let token = jwt.sign({
      mydata,
      exp: created + 60 * 30, // 过期时间 30 分钟
      iat: created, // 创建时间
    }, { algorithm: 'RS256' });
    console.log(token)
    return token;
  }
  // 校验token
  verifyToken(data) {
    if (data) {
      this.data = data;
    }
    let token = this.data;
    let cert = 'justWeappNode'
    let res;
    try {
      let result = jwt.verify(token, cert, { algorithms: ['RS256'] }) || {};
      this._id = result.data;
      this._date = result.exp;
      this._creatDate = result.iat;
      let { exp = 0 } = result, current = Math.floor(Date.now() / 1000);
      if (current <= exp) {
        res = result.data || {};
      }
    } catch (e) {
      res = 'err';
    }
    return res;
  }
}
module.exports = new Jwt();