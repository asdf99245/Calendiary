const userRepository = require('../repositories/user.repository');

module.exports = {
  findOneByFilter: async (filter) => {
    return await userRepository.findOneByFilter(filter);
  },
};
