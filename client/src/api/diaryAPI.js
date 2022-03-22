const axios = require('axios');

module.exports = {
  onWrite: async (infos) => {
    const response = await axios.post('/api/calendar/diary', infos);
    return response;
  },
  getDiaries: async () => {
    const response = await axios.get('/api/calendar/diaries');
    return response;
  },
};
