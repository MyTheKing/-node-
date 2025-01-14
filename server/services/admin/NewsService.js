const DBManager = new (require("../../utils/DBManager"))
const { generateCustomId } = require('../../utils/common');
const table = "news";

const NewsService = {
    // 添加新闻
    add:async ({title,content,category,cover,isPublish,editTime,username})=>{
        const id = generateCustomId();
    
        return await DBManager.insert(table, {id,title,content,category,cover,isPublish,editTime,username})
    },
    
    // 新闻列表
    getList:async ({id = null,username = ""} = {})=>{
        let where = {};
        if(id !== null && id !== "") {
            where = {id}
        } else if(username !== "") {
            where = {username}
        }
        return await DBManager.select(table,where)
    },

    // 发布新闻
    publish:async ({id,isPublish,editTime})=>{
        return DBManager.update(table, { isPublish,editTime}, { id })
    },

    // 删除新闻
    delList:async ({id})=>{
        return await DBManager.delete(table,{id})
    },

    // 编辑新闻
    updateList:async({id,title,content,category,isPublish,cover,editTime})=>{
        return await DBManager.update(table,{
            title,content,category,isPublish,cover,editTime
        },{id})
    },
}

module.exports = NewsService