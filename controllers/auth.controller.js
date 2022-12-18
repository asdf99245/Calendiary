const authService = require('../services/auth.service');
const userService = require('../services/user.service');
const { makeAccessToken, makeRefreshToken } = require('../utils/jwt');
const STATUS_CODE = require('../utils/statusCode');

module.exports = {
  silentRefresh: async (req, res, next) => {
    try {
      const id = await authService.checkRefreshToken(req.cookies.refreshToken);
      const accessToken = makeAccessToken(id);
      const refreshToken = makeRefreshToken(id);

      const { user_id, user_name } = userService.findOneByFilter({
        user_id: id,
      });
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
      });
      res.status(STATUS_CODE.OK).json({
        accessToken,
        user_id,
        user_name,
      });
    } catch (err) {
      next(err);
    }
  },
  login: async (req, res, next) => {
    const { user_id, user_password } = req.body;
    try {
      const user = await authService.signIn(user_id, user_password);
      const accessToken = makeAccessToken(user_id);
      const refreshToken = makeRefreshToken(user_id);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
      });

      res.status(STATUS_CODE.OK).json({
        message: '로그인에 성공하였습니다.',
        user_id,
        user_name: user.user_name,
        accessToken,
      });
    } catch (err) {
      next(err);
    }
  },
  logout: (req, res) => {
    res.clearCookie('refreshToken');
    res.status(STATUS_CODE.OK).json({
      message: '로그아웃에 성공하였습니다.',
    });
  },
  register: async (req, res, next) => {
    const { user_id, user_password, user_name } = req.body;
    try {
      await authService.signUp(user_id, user_password, user_name);
      res.status(STATUS_CODE.CREATED).json({
        message: '회원가입이 성공적으로 완료되었습니다.',
      });
    } catch (err) {
      next(err);
    }
  },
};
