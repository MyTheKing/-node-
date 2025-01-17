// 用户信息验证模块
// 导入验证模块
const Joi = require('joi')

// 定义规则
const username = Joi.string().alphanum().min(1).max(10).required()
const password = Joi.string().pattern(/^[\S]{6,12}$/).required()
// const id = Joi.number().integer().min(1).required()
// const avatar = Joi.string().dataUri().required()

// 注册和登录的验证规则
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}