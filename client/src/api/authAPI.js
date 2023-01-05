import axios from './axiosInstance';

export const silentRefresh = async () => {
  const response = await axios.get('/auth/silent-refresh');
  return response;
};

export const onLogin = async (infos) => {
  const response = await axios.post('/auth/login', infos);
  return response;
};

export const onLogout = async () => {
  const response = await axios.post('/auth/logout');
  return response;
};

export const onRegister = async (infos) => {
  const response = await axios.post('/auth/register', infos);
  return response;
};
