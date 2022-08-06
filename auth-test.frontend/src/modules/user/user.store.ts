import { PayloadAction, SliceCaseReducers, createSlice } from '@reduxjs/toolkit';

import { UserDto } from './models/User';

const initialState: UserDto | null = null;

const userStoreSlice = createSlice<UserDto | null, SliceCaseReducers<UserDto | null>, string>({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserDto>) => action.payload,
    },
});

export const { setUser } = userStoreSlice.actions;

export const userStoreReducer = userStoreSlice.reducer;
