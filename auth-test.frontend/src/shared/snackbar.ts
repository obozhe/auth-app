import { OptionsObject, WithSnackbarProps, useSnackbar } from 'notistack';
import React from 'react';

let snackbarRef: WithSnackbarProps;
export const SnackbarConfigurator: React.FC = () => {
    snackbarRef = useSnackbar();
    return null;
};

export default {
    success(msg: string, options: OptionsObject = {}): void {
        this.toast(msg, { ...options, variant: 'success' });
    },
    warning(msg: string, options: OptionsObject = {}): void {
        this.toast(msg, { ...options, variant: 'warning' });
    },
    info(msg: string, options: OptionsObject = {}): void {
        this.toast(msg, { ...options, variant: 'info' });
    },
    error(msg: string, options: OptionsObject = {}): void {
        this.toast(msg, { ...options, variant: 'error' });
    },
    toast(msg: string, options: OptionsObject = {}): void {
        snackbarRef.enqueueSnackbar(msg, options);
    },
};
