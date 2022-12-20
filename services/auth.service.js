const userService = require('./user.service');
const bcrypt = require('../utils/bycrypt');
const { verifyToken } = require('../utils/jwt');
const {
  UnauthorizedError,
  ConflictError,
  NotFoundError,
} = require('../utils/error');

module.exports = {
  checkIsPasswordValidate: async function (plain, origin) {
    const result = await bcrypt.compareHash(plain, origin);
    if (!result) {
      throw new UnauthorizedError('비밀번호가 일치하지 않습니다.');
    }

    return result;
  },
  signIn: async function (user_id, user_password) {
    const user = await userService.findOneByFilter({ user_id });
    if (!user) {
      throw new NotFoundError('존재하지 않는 사용자입니다.');
    }
    await this.checkIsPasswordValidate(user_password, user.user_password);

    return user;
  },
  signUp: async function (user_id, user_password, user_name) {
    const user = await userService.findOneByFilter({ user_id });
    if (!user) {
      throw new ConflictError('이미 존재하는 아이디입니다.');
    }

    const hashed = bcrypt.generateHashed(user_password);
    await userRepository.createOne({ user_id, password: hashed, user_name });
  },
  checkRefreshToken: async function (refreshToken) {
    if (!refreshToken) {
      throw new UnauthorizedError('다시 로그인 해주세요.');
    }
    const verifyRefreshToken = verifyToken(refreshToken);
    const id = verifyRefreshToken.id;
    if (!id) {
      throw new UnauthorizedError('다시 로그인 해주세요.');
    }

    return id;
  },
};
