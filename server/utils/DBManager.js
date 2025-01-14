const db = require("../db");

class DBManager {
  /**
   * 执行SQL查询
   * @param {String} sql - SQL语句
   * @param {Array} params - SQL参数列表
   * @returns {Promise} 返回Promise对象，resolve查询结果或reject错误信息
   */
  query(sql, params) {
    return new Promise((resolve, reject) => {
      db.query(sql, params, (error, results, fields) => {
        if (error || results.length === 0) {
          return reject(error);
        }

        resolve(results);
      });
    });
  }

  /**
   * 查询数据
   * @param {String} table - 表名
   * @param {Object} condition - 查询条件，例如：{name: 'John'}
   * @param {String} [fields='*'] - 需要查询的字段，默认为所有字段
   * @param {String} [modifiers] - 查询选项，例如：ORDER BY editTime DESC 
   * @param {Number} [limit=10] - 页数，如果查询选项是 limit，那么这个参数代表页数,注意：只有 modifiers为limit 或 LIMIT才会执行到这个参数，否则参数失效
   * @returns {Promise} 返回Promise对象，resolve查询结果或reject错误信息
   */
  select(table, condition = {}, fields = "*", modifiers = '',limit = 10) {
    let whereSql = "";
    let whereParams = [];

    for (let key in condition) {
      whereSql += `${key} = ? AND `;
      whereParams.push(condition[key]);
    }

    whereSql = whereSql ? `WHERE ${whereSql.slice(0, -5)}` : "";

    let sql = `SELECT ${fields} FROM ${table} ${whereSql} ${modifiers}`;
    let params = whereParams;

    if(modifiers.toLocaleLowerCase().includes('limit')){
      params.push(limit)
    }
    
    return this.query(sql, params);
  }

  /**
   * 插入数据
   * @param {String} table - 表名
   * @param {Object} data - 要插入的数据对象，键值对形式
   * @returns {Promise} 返回Promise对象，resolve影响行数或reject错误信息
   */

  insert(table, data) {
    let filteredData = filterImgNull(data);

    let keys = Object.keys(filteredData).join(", ");
    let values = Object.values(filteredData)
      .map(() => "?")
      .join(", ");

    let sql = `INSERT INTO ${table} (${keys}) VALUES (${values})`;
    let params = Object.values(filteredData);

    return this.query(sql, params);
  }

  /**
   * 更新数据
   * @param {String} table - 表名
   * @param {Object} data - 更新的数据对象，键值对形式
   * @param {Object} condition - 更新条件，例如：{id: 1}
   * @returns {Promise} 返回Promise对象，resolve影响行数或reject错误信息
   */
  update(table, data, condition) {
    let filteredData = filterImgNull(data);

    let setValues = Object.entries(filteredData)
      .map(([key]) => {
        return `${key} = ?`;
      })
      .join(", ");

    let conditionSql = "";
    let conditionParams = [];
    for (let key in condition) {
      conditionSql += `${key} = ? AND `;
      conditionParams.push(condition[key]);
    }
    conditionSql = `WHERE ${conditionSql.slice(0, -5)}`;

    let sql = `UPDATE ${table} SET ${setValues} ${conditionSql}`;

    let params = [...Object.values(filteredData), ...conditionParams];

    return this.query(sql, params);
  }

  /**
   * 删除数据
   * @param {String} table - 表名
   * @param {Object} condition - 删除条件，例如：{id: 1}
   * @returns {Promise} 返回Promise对象，resolve影响行数或reject错误信息
   */
  delete(table, condition) {
    let conditionSql = "";
    let conditionParams = [];
    for (let key in condition) {
      conditionSql += `${key} = ? AND `;
      conditionParams.push(condition[key]);
    }
    conditionSql = `WHERE ${conditionSql.slice(0, -5)}`;

    let sql = `DELETE FROM ${table} ${conditionSql}`;
    let params = conditionParams;

    return this.query(sql, params);
  }
}

/**
 * 处理img为空的键值对
 * @param {Object} data - 需要处理的数据
 * @returns {Promise} 去除img为imgNull的键值对，并组成新的对象返回
 */
function filterImgNull(data) {
  return Object.fromEntries(
    Object.entries(data).filter(([key, value]) => value !== "imgNull")
  );
}

module.exports = DBManager;
