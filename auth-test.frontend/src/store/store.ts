import { configureStore } from '@reduxjs/toolkit';

import { userStoreReducer } from '../modules/user/user.store';

export const store = configureStore({
    reducer: {
        user: userStoreReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
