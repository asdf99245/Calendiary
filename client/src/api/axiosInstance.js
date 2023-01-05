import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.response.use(
  (res) => {
    const accessToken = res.data.accessToken;
    if (accessToken) {
      instance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${accessToken}`;
    }

    return res;
  },
  async (err) => {
    const originConfig = err.config;

    if (err.response) {
      if (
        err.response.status === 401 &&
        err.response.data.message === 'Token Expired'
      ) {
        try {
          const { data } = await instance.get('/auth/silent-refresh');

          originConfig.headers['Authorization'] = `Bearer ${data.accessToken}`;
          return instance(originConfig);
        } catch (_err) {
          return Promise.reject(_err);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
