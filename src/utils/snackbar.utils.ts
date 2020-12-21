export interface StatusAlert {
    msg?: string;
    severity?: string;
    date?: Date;
}
export const setStatusAlert = (msg: string, severity: string) => {
    return { msg, severity, date: new Date() };
};

export const errorSnackbar = {
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
    },
    variant: 'error',
    autoHideDuration: 3000
};

export const successSnackbar = {
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
    },
    variant: 'success',
    autoHideDuration: 3000
}
