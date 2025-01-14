// 定义模块中创建数据库的连接对象
// 导入mysql模块
const mysql = require("mysql2");

const db = mysql.createPool({
  user: "root", //用户名
  password: "1234", //密码
  host: "192.168.88.130", // mysql服务地址
  database: "company-system", //数据库名
  connectionLimit: 3, // 最大连接数
  queueLimit: 0, // 排队等待连接的最大请求数，0表示无限制
  waitForConnections: true, // 当连接池达到最大连接数时，是否等待可用连接
});

module.exports = db;
