import a from 'axios';

import { ErrorDto } from './models/ErrorDto';
import snackbar from './snackbar';

const axios = a.create({ baseURL: `/api` });

axios.interceptors.response.use(
    (response) => response.data,
    (err) => {
        const errorDto: ErrorDto = err.response.data;
        if (errorDto.code !== 'NOT_AUTHORIZED') {
            snackbar.error(errorDto.description || 'Oops... Something went wrong');
        }

        return Promise.reject(errorDto);
    }
);

export default axios;
