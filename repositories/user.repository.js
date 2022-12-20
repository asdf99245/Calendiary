const { User } = require('../database/models');

module.exports = {
  findOneByFilter: async (filter) => {
    return await User.findOne({ where: filter });
  },
  createOne: async (data) => {
    await User.create(data);
  },
};
