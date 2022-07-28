import axios from 'axios';

const a = axios.create({ baseURL: `/api` });

a.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(error.response.data);
        return Promise.reject(error);
    }
);

export default a;
