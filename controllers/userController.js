const { User } = require('../database/models');
const { Op, CITEXT } = require('sequelize');
const {
  verifyToken,
  makeAccessToken,
  makeRefreshToken,
} = require('../utils/jwt');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  silentRefresh: async (req, res) => {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      const verifyRefreshToken = verifyToken(refreshToken);
      if (verifyRefreshToken.id) {
        id = verifyRefreshToken.id;
        const accessToken = makeAccessToken(id);
        const refreshToken = makeRefreshToken(id);
        try {
          const result = await User.findOne({ where: { user_id: id } });
          const { user_id, user_name } = result;
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
          });
          res.json({
            success: true,
            status: 200,
            accessToken,
            user_id,
            user_name,
          });
        } catch (err) {
          throw err;
        }
      }
    } else {
      res.status(401).send('Refresh failed');
    }
  },
  login: async (req, res) => {
    const { user_id, user_password } = req.body;
    try {
      const result = await User.findOne({ where: { user_id } });
      if (!result) {
        res.json({
          success: false,
          code: 404,
          message: '존재하지 않는 계정입니다.',
        });
      } else {
        const ok = await bcrypt.compare(user_password, result.user_password); // bcrypt를 통한 비밀번호 비교
        if (ok) {
          const accessToken = makeAccessToken(user_id);
          const refreshToken = makeRefreshToken(user_id);
          res.cookie('accessToken', accessToken);
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
          });
          res.json({
            success: true,
            code: 200,
            message: '로그인에 성공하였습니다.',
            accessToken,
            user_id,
            user_name: result.user_name,
          });
        } else {
          res.json({
            success: false,
            code: 401,
            message: '비밀번호가 일치하지 않습니다.',
          });
        }
      }
    } catch (err) {
      throw err;
    }
  },
  logout: (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({
      success: true,
      code: 200,
      message: '로그아웃에 성공하였습니다.',
    });
  },
  register: async (req, res) => {
    const { user_id, user_password, user_name } = req.body;
    try {
      const result = await User.findOne({ where: { user_id } });
      if (result) {
        res.json({
          success: false,
          code: 409,
          message: '이미 존재하는 아이디입니다.',
        });
      } else {
        const encrypted = await bcrypt.hash(user_password, saltRounds);
        await User.create({ user_id, user_password: encrypted, user_name });
        res.json({
          success: true,
          code: 201,
          message: '회원가입이 성공적으로 완료되었습니다.',
        });
      }
    } catch (err) {
      throw err;
    }
  },
};
