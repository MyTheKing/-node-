const DBManager = new (require("../../utils/DBManager"))

const table = "news";

const NewsService = {
    // 新闻列表
    getList:async ({id = null} = {})=>{
        let where = {isPublish:'1'};
        if(id !== null && id !== "") {
            Object.assign(where,{id})
        }
        return await DBManager.select(table,where,'*','ORDER BY editTime DESC')
    },  
    
    // 最新数据新闻
    getTopList:async ({limit})=>{
        return await DBManager.select(table,{isPublish:'1'},'*','ORDER BY editTime DESC LIMIT ?',Number(limit))
    },   

}

module.exports = NewsService