import { configureStore } from '@reduxjs/toolkit';

import { notificationStoreReducer } from './notification/notification.store';
import { userStoreReducer } from './user/user.store';

export const store = configureStore({
    reducer: {
        user: userStoreReducer,
        notification: notificationStoreReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
