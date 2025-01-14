var express = require('express');
const NewsController = require('../../controllers/web/NewsController');
var NewsRouter = express.Router();


// 新闻列表
NewsRouter.get("/list",NewsController.getList)

// 查询新闻
NewsRouter.get("/list/:id",NewsController.getList)

// 最新数据新闻
NewsRouter.get("/toplist",NewsController.getTopList)

module.exports = NewsRouter