const UserService = require("../../services/admin/UserService");
const JWT = require("../../utils/JWT");
const { imgIsNull, sendError, sendSuccess } = require('../../utils/common');


const UserController = {
  // 登录
  login: async (req, res) => {
    try {
      const result = await UserService.login(req.body);

      //生成token
      const token = JWT.generate(
        {
          id: result[0].id,
          username: result[0].username,
        },
        "1d"
      );
      res.header("Authorization", token);
      res.send({
        ActionType: "OK",
        data: {
          username: result[0].username,
          gender: result[0].gender ? result[0].gender : 0, //性别 ,0,1,2
          introduction: result[0].introduction, //简介
          avatar: result[0].avatar,
          role: result[0].role,
        },
      });
    } catch (err) {
      res.send({
        code: "-1",
        message: "用户名密码不匹配",
      });
    }
  },

  // 个人中心
  upload: async (req, res) => {
    const { username, introduction, gender } = req.body;
    const token = req.headers["authorization"].split(" ")[1];
    // const avatar = req.file?`/avataruploads/${req.file.filename}`:"imgNull"
    const avatar = imgIsNull(req.file,'avataruploads');
    var payload = JWT.verify(token);

    try {
      const result = await UserService.upload({
        id: payload.id,
        username,
        introduction,
        gender: Number(gender),
        avatar,
      });
      definitionSend(result, avatar, res, req.body);
    } catch (error) {
      sendError(res, error.errno == 1062 ? "用户名已存在" : "更新失败");
    }
  },

  // 添加用户
    add: async (req, res) => {
    const { username, introduction, gender, role, password } = req.body;
    const avatar = imgIsNull(req.file,'avataruploads');
    try {
      const result = await UserService.add({
        username,
        introduction,
        gender: Number(gender),
        avatar,
        role: Number(role),
        password,
      });
      definitionSend(result, avatar, res, req.body);
    } catch (error) {
      sendError(res, error.errno == 1062 ? "用户名已存在" : "添加失败");
    }
  },

  // 用户列表
  getList: async (req, res) => {
    try {
      const result = await UserService.getList(req.params);
      sendSuccess(res,result)
    } catch (error) {
      sendError(res, "获取数据失败");
    }
  },

  // 删除用户
  delList: async (req, res) => {
    if (req.params.id == 1) {
      return sendSuccess(res, { message: "超级管理员不可删除..." }, "FAIL!!!");
    } else {
      try {
        await UserService.delList(req.params);
        sendSuccess(res);
      } catch (error) {
        sendError(res, "删除失败");
      }
    }
  },

  // 编辑用户
  putList: async (req, res) => {
    try {
        await UserService.putList(req.body);
        sendSuccess(res);
    } catch (error) {
        sendError(res, error.errno == 1062 ? "用户名已存在" : "编辑失败");
    }
  },
};


  /**
   * 处理响应数据，如果有头像就返回头像，没有就不返回
   * @param {Object} result - 后端编辑返回的信息
   * @param {String} avatar - 头像
   * @param {Object} res - 响应对象
   * @param {Object} Object - 响应数据
   */
function definitionSend(
  result,
  avatar,
  res,
  { username, introduction, gender }
) {
  if (result.affectedRows > 0 || result.changedRows > 0) {
    sendSuccess(res,{
      username,
      introduction,
      gender: Number(gender),
      ...(avatar !== "imgNull" ? { avatar } : {}),
    })
  }
}
module.exports = UserController;
