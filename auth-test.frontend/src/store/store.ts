import { configureStore } from '@reduxjs/toolkit';

import { userStoreReducer } from '../modules/user/user.store';
import { notificationStoreReducer } from './notification/notification.store';

export const store = configureStore({
    reducer: {
        user: userStoreReducer,
        notification: notificationStoreReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
