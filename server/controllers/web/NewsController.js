const NewsService = require("../../services/web/NewsService")
const { sendError, sendSuccess } = require("../../utils/common");


const NewsController = {
    // 新闻列表
    getList:async (req,res)=>{
        try {
            const result = await NewsService.getList(req.params)
            sendSuccess(res,result)
        } catch (error) {
            sendError(res, "获取数据失败");
        }
    },

    // 最新数据新闻
    getTopList:async (req,res)=>{
        try {
            const result =await NewsService.getTopList(req.query)
            sendSuccess(res,result)
        } catch (error) {
            sendError(res, "获取数据失败");
        }

    },


}

module.exports = NewsController