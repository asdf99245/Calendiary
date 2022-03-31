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
  onDelete: async (id) => {
    const response = await axios.delete(`/api/calendar/diary/${id}`);
    return response;
  },
};
