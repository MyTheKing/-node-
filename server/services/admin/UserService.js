const DBManager = new (require("../../utils/DBManager"))
const { generateCustomId } = require('../../utils/common');
const table = "user";

const UserService = {
  // 登录
  login: async ({ username, password }) => {
    return await DBManager.select(table,{username,password})
  },

  // 个人中心
  upload:async ({id,username,introduction,gender,avatar})=>{
      return await DBManager.update(table, { username,introduction,gender,avatar}, { id })
  },

  // 添加用户
  add:async ({username,introduction,gender,avatar,password,role})=>{
    const id = generateCustomId();
    
    return await DBManager.insert(table, {id,username,introduction,gender,avatar,password,role})
  },

  // 用户列表
  getList:async ({id = null} = {})=>{
    let where = {};
    let column = "id, username, role, avatar, introduction, gender";
    if(id !== null && id !== "") {
      where = {id}
      column = "id, username, password, role, introduction, gender"
    }
    return await DBManager.select(table,where,column)
  },

  // 删除用户
  delList:async ({id})=>{
    return await DBManager.delete(table,{id})
  },

  // 编辑用户
  putList:async({username,password,role,introduction,id})=>{
    return DBManager.update(table, { username,password,role,introduction}, { id })
  },
};


module.exports = UserService;
