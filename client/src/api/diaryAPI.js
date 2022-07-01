import axios from 'axios';

export const onWrite = async (infos) => {
  const response = await axios.post('/api/calendar/diary', infos);
  return response;
};

export const getDiaries = async (payload) => {
  const { from, to } = payload;
  if (from === null) return [];

  const response = await axios.get('/api/calendar/diaries', {
    params: {
      from: from.toDate(),
      to: to.toDate(),
    },
  });
  return response;
};

export const onDelete = async (id) => {
  const response = await axios.delete(`/api/calendar/diary/${id}`);
  return response;
};

export const onUpdate = async ({ id, infos }) => {
  const response = await axios.post(`/api/calendar/diary/${id}`, infos);
  return response;
};
