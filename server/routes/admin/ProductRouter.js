var express = require('express');
var ProductRouter = express.Router();
const ProductController = require('../../controllers/admin/ProductController');

//涉及文件上传, 普通post不行, 需要加上 multer中间件
const multer  = require('multer')
const upload = multer({ dest: 'public/productuploads/' })

// 添加产品
ProductRouter.post("/add",upload.single("file"),ProductController.add)

// 产品列表
ProductRouter.get("/list",ProductController.getList)

// 删除产品
ProductRouter.delete("/list/:id",ProductController.delList)
 
// 编辑产品
ProductRouter.post("/list",upload.single("file"),ProductController.updateList)

module.exports = ProductRouter