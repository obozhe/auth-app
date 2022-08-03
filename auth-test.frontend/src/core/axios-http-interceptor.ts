import axios from 'axios';

import { ErrorDto } from './models/error-dto';
import snackbar from './snackbar';

const axiosApi = axios.create({ baseURL: `/api` });

axiosApi.interceptors.response.use(
    (response) => response.data,
    (err) => {
        const errorDto: ErrorDto = err.response.data;
        if (errorDto.code !== 'NOT_AUTHORIZED') {
            snackbar.error(errorDto.description || 'Oops... Something went wrong');
        }

        return Promise.reject(errorDto);
    }
);

export default axiosApi;
