var express = require('express');
const ProductController = require('../../controllers/web/ProductController');
var ProductRouter = express.Router();


// 获取产品数据
ProductRouter.get("/list",ProductController.getList)

module.exports = ProductRouter