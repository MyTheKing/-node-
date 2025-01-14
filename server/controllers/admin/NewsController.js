const NewsService = require("../../services/admin/NewsService");
const { imgIsNull, sendError, sendSuccess } = require("../../utils/common");

const NewsController = {
  // 添加新闻
  add: async (req, res) => {
    const { title, content, category, isPublish,username } = req.body;
    const cover = imgIsNull(req.file, "newsuploads");

    try {
      await NewsService.add({
        title,
        content,
        category,
        isPublish,
        cover,
        username,
        editTime: new Date(),
      });
      sendSuccess(res);
    } catch (error) {
      sendError(res, "添加失败");
    }
  },

  // 新闻列表
  getList:async (req,res)=>{
    try {
        const result = await NewsService.getList(req.query);
        sendSuccess(res,result)
      } catch (error) {
        sendError(res, "获取数据失败");
      }
  },

  // 发布新闻
  publish:async (req,res)=>{
    try {
        await NewsService.publish({
            ...req.body,
            editTime:new Date()
        })
        sendSuccess(res)
    } catch (error) {
        sendError(res, "发布失败");
    }
  },

  // 删除新闻
  delList:async (req,res)=>{
    try {
        await NewsService.delList(req.params)
        sendSuccess(res)
    } catch (error) {
        sendError(res, "删除失败");
    }
  },

  // 编辑新闻
  updateList:async(req,res)=>{
    const {title,content,category,isPublish,id} = req.body
    const cover = imgIsNull(req.file, "newsuploads");

    try {
        await NewsService.updateList({
            id,
            title,
            content,
            category,
            isPublish,
            cover,
            editTime:new Date()
        })
        sendSuccess(res)
    } catch (error) {
        sendError(res, "编辑失败");
    }

  },

};

module.exports = NewsController;
