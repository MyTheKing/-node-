var express = require('express');
var NewsRouter = express.Router();
const NewsController = require('../../controllers/admin/NewsController');

//涉及文件上传, 普通post不行, 需要加上 multer中间件
const multer  = require('multer')
const upload = multer({ dest: 'public/newsuploads/' })

// 添加新闻
NewsRouter.post("/add",upload.single("file"),NewsController.add)

// 新闻列表
NewsRouter.get("/list",NewsController.getList)

// 发布新闻
NewsRouter.put("/publish",NewsController.publish)

// 删除新闻
NewsRouter.delete("/list/:id",NewsController.delList)

// 编辑新闻
NewsRouter.post("/list",upload.single("file"),NewsController.updateList)

module.exports = NewsRouter