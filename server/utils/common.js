  /**
   * 处理图片变量值
   * @param {Object} file - 接口获取的文件对象
   * @param {String} url - 文件路径
   * @returns {String} 返回处理后的图片路径或为空标识
   */
function imgIsNull(file,url) {
  return file ? `/${url}/${file.filename}` : "imgNull";
}

  /**
   * 随机id
   * @returns {String} 返回随机出来的id
   */
function generateCustomId() {
    const timestamp = Date.now(); // 获取当前时间戳（毫秒）
    let sequence = Math.floor(Math.random() * 1000); // 生成0到999之间的随机数作为序列号
    const id = BigInt(`${timestamp}${sequence.toString().padStart(3, '0')}`);
    return id; // 将 BigInt 转换为纯数字字符串
}
  /**
   * 报错响应
   * @param {Object} res - 响应对象
   * @param {String} message - 响应前端的说明
   * @param {String} code - 状态码
   */
function sendError(res, message, code = '-1') {
  res.send({
    code,
    message,
  });
}

  /**
   * 报错响应
   * @param {Object} res - 响应对象
   * @param {Object} data - 响应前端的数据
   * @param {String} ActionType - 状态信息
   */
function sendSuccess(res, data = {}, ActionType = "OK") {
  res.send({
    ActionType,
    data,
  });
}

// 导出所有函数
module.exports = {
  imgIsNull,
  generateCustomId,
  sendError,
  sendSuccess
};
