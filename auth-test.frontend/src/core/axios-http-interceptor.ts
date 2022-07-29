import axios from 'axios';

import { NotificationTypes } from '../store/notification/consts/notification-types';
import { showNotification } from '../store/notification/notification.store';
import { store } from '../store/store';

const axiosApi = axios.create({ baseURL: `/api` });

axiosApi.interceptors.response.use(
    (response) => response.data,
    (err) => {
        const error = err.response.data;
        if (error.code !== 'NOT_AUTHORIZED') {
            store.dispatch(
                showNotification({
                    type: NotificationTypes.Error,
                    message: error.description,
                })
            );
        }

        return Promise.reject(error);
    }
);

export default axiosApi;
