const DBManager = new (require("../../utils/DBManager"))();
const table = "product";

const ProductService = {
  // 获取产品数据
  getList: async ({ id = null } = {}) => {
    let where = id !== null && id !== "" ? { id } : {};
    return await DBManager.select(table, where, "*", "ORDER BY editTime DESC");
  },
};

module.exports = ProductService;
