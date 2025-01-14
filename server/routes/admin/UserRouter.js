const express = require('express');
const UserRouter = express.Router();
const UserController = require('../../controllers/admin/UserController');

const expressJoi = require('@escook/express-joi')//自动帮我们把接收到的数据进行我们自己定义的规则验证

// 导入验证规则对象
const { reg_login_schema } = require('../../schema/user')

//涉及文件上传, 普通post不行, 需要加上 multer中间件
const multer  = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })

// 登录
UserRouter.post('/login', expressJoi(reg_login_schema), UserController.login)

// 个人中心
UserRouter.post("/upload",upload.single('file'),UserController.upload)
 
// 添加用户
UserRouter.post("/add",upload.single('file'),UserController.add)

// 用户列表
UserRouter.get("/list",UserController.getList)

// 用户信息
UserRouter.get("/list/:id",UserController.getList)

// 删除用户
UserRouter.delete("/list/:id",UserController.delList)

// 编辑用户
UserRouter.put("/list/:id",UserController.putList)



module.exports = UserRouter;
