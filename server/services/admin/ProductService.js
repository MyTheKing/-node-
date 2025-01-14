const DBManager = new (require("../../utils/DBManager"))
const { generateCustomId } = require('../../utils/common');
const table = "product";

const ProductService = {
    // 添加产品
    add:async ({title,introduction,detail,cover,editTime,username})=>{
        const id = generateCustomId();
    
        return await DBManager.insert(table, {id,title,introduction,detail,cover,editTime,username})
    },

    // 产品列表
    getList:async ({id = null,username = ""} = {})=>{
        let where = {};
        if(id !== null && id !== "") {
            where = {id}
        } else if(username !== "") {
            where = {username}
        }
        
        return await DBManager.select(table,where)
    },

    // 删除产品
    delList:async ({id})=>{
        return await DBManager.delete(table,{id})
    },

    // 编辑产品
    updateList:async({title,introduction,detail,id,cover,editTime})=>{
        return await DBManager.update(table,{
            title,introduction,detail,cover,editTime
        },{id})
    },


}

module.exports = ProductService