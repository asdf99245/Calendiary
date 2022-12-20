const bycrypt = require('bcrypt');

const saltRounds = process.env.SALT_ROUNDS;

module.exports = {
  generateHashed: async (origin) => {
    const salt = await bycrypt.genSalt(saltRounds);
    const hashed = await bycrypt.hash(origin, salt);
    return hashed;
  },
  compareHash: async (plain, hash) => {
    return await bycrypt.compare(plain, hash);
  },
};
