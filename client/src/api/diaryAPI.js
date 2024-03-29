import axios from './axiosInstance';

export const onWrite = async (infos) => {
  const response = await axios.post('/diary', infos);
  return response;
};

export const getDiaries = async (payload) => {
  const { from, to } = payload;
  if (!from || !to) return [];

  const { data } = await axios.get('/diary', {
    params: {
      from: from.toDate(),
      to: to.toDate(),
    },
  });

  return data;
};

export const onDelete = async (id) => {
  const response = await axios.delete(`/diary/${id}`);
  return response;
};

export const onUpdate = async ({ id, infos }) => {
  const response = await axios.post(`/api/diary/${id}`, infos);
  return response;
};
