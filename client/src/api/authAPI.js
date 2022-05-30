import axios from 'axios';

export const silentRefresh = async () => {
  const response = await axios.get('/api/user/auth/silent-refresh');
  return response;
};

export const onLogin = async (infos) => {
  const response = await axios.post('/api/user/auth/login', infos);
  return response;
};

export const onLogout = async () => {
  const response = await axios.post('/api/user/auth/logout', {});
  return response;
};

export const onRegister = async (infos) => {
  const response = await axios.post('/api/user/auth/register', infos);
  return response;
};
