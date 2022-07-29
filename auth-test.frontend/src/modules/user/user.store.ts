import { PayloadAction, SliceCaseReducers, createSlice } from '@reduxjs/toolkit';

import { UserModel } from './models/user-model';

const initialState: UserModel | null = null;

const userStoreSlice = createSlice<UserModel | null, SliceCaseReducers<UserModel | null>, string>({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserModel>) => action.payload,
    },
});

export const { setUser } = userStoreSlice.actions;

export const userStoreReducer = userStoreSlice.reducer;