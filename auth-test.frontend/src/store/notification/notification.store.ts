import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { NotificationModel } from './models/notification-model';

const initialState: NotificationModel & { isShown: boolean } = {
    type: null,
    message: '',
    duration: 5000,
    isShown: false,
};

const notificationStoreSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification: (state, action: PayloadAction<NotificationModel>) => ({
            ...state,
            ...action.payload,
            isShown: true,
        }),
        onClose: () => initialState,
    },
});

export const { showNotification, onClose } = notificationStoreSlice.actions;

export const notificationStoreReducer = notificationStoreSlice.reducer;
