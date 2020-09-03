// 引入依赖模块
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

// 创建token类
class Jwt {
  constructor(openid) {
    this.secret = 'myWeappNode'
    this._id = openid; // 用户自定义 存放userid
    this._creatDate = Math.floor(Date.now() / 1000); // 创建时间
    this._date = this._creatDate + 60 * 30; // 过期时间

  }
  // 重新生成 token
  refreshToken() {
    let data = this.data;
    let cert = 'myWeappNode'
    let token = jwt.sign({
      data,
      exp: this._date, // 过期时间 
      iat: created, // 创建时间
    }, cert, { algorithm: 'RS256' });
    return token;
  }
  // 生成token
  generateToken(openid) {
    if (openid) {
      this._id = openid;
    }
    let token = jwt.sign({
      aud: this._id,
      exp: this._date, // 过期时间 30 分钟
      iat: this._creatDate, // 创建时间
    }, this.secret);
    // { algorithm: 'RS256' }
    console.log(token)
    return token;
  }
  // 校验token
  verifyToken(data) {
    if (data) {
      this.data = data;
    }
    let token = this.data;
    let res;
    try {
      let result = jwt.verify(token, this.secret) || {};
      this._id = result.aud;
      this._date = result.exp;
      this._creatDate = result.iat;
      let { exp = 0 } = result, current = Math.floor(Date.now() / 1000);
      if (current <= exp) {
        res = result.aud || {};
      }
    } catch (e) {
      res = 'err';
    }
    return res;
  }
}
module.exports = Jwt;