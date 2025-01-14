const ProductService = require("../../services/web/ProductService");
const { sendError, sendSuccess } = require("../../utils/common");

const ProductController = {
  // 获取产品数据
  getList: async (req, res) => {
    try {
      const result = await ProductService.getList(req.params);
      sendSuccess(res, result);
    } catch (error) {
      sendError(res, "获取数据失败");
    }
  }
};

module.exports = ProductController;
