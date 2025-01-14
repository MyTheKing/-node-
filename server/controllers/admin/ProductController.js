const ProductService = require("../../services/admin/ProductService")
const { imgIsNull, sendError, sendSuccess } = require("../../utils/common");

const ProductController = {
    // 添加产品
    add:async (req,res)=>{
        const {title,introduction,detail,username} = req.body
        const cover = imgIsNull(req.file, "productuploads");

        try {
            await ProductService.add({
                title,introduction,detail,
                cover,
                username,
                editTime:new Date()
            });
            sendSuccess(res);
          } catch (error) {
            sendError(res, "添加失败");
          }
    },

    // 产品列表
    getList:async (req,res)=>{
        try {
            const result = await ProductService.getList(req.query);
            
            sendSuccess(res,result)
        } catch (error) {
            sendError(res, "获取数据失败");
        }
    },
    
    // 删除产品
    delList:async (req,res)=>{
        try {
            await ProductService.delList(req.params)
            sendSuccess(res)
        } catch (error) {
            sendError(res, "删除失败");
        }
    },

    // 编辑产品
    updateList:async(req,res)=>{
        const {title,introduction,detail,id} = req.body
        const cover = imgIsNull(req.file, "productuploads");

        try {
            await ProductService.updateList({
                id,
                title,introduction,detail,
                cover,
                editTime:new Date()
            })
            sendSuccess(res)
        } catch (error) {
            sendError(res, "编辑失败");
        }

    },
}

module.exports = ProductController