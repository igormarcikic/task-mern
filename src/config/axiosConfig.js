// Configure authentication in axios
export const axiosConfig = (axios, token) => {
  axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['Access-Control-Allow-Origin'] = '*';
    return config
  },
    err => Promise.reject(err)
  )
};
