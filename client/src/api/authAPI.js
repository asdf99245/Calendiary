const axios = require('axios');

module.exports = {
  onLogin: async (infos) => {
    const response = await axios.post('/api/user/auth/login', infos);
    return response;
  },
  onLogout: async () => {
    const response = await axios.post('/api/user/auth/logout', {});
    return response;
  },
  onRegister: async (infos) => {
    const response = await axios.post('/api/user/auth/register', infos);
    return response;
  },
};
