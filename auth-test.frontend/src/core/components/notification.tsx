import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React from 'react';
import { useSelector } from 'react-redux';

import { onClose } from '../../store/notification/notification.store';
import { RootState, store } from '../../store/store';

export default function Notification() {
    const { isShown, duration, message, type } = useSelector(({ notification }: RootState) => notification);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason !== 'clickaway') {
            store.dispatch(onClose());
        }
    };

    return (
        type && (
            <Snackbar
                open={isShown}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={duration}
                onClose={handleClose}
            >
                <MuiAlert elevation={6} variant="filled" severity={type} sx={{ width: '100%' }}>
                    {message}
                </MuiAlert>
            </Snackbar>
        )
    );
}
