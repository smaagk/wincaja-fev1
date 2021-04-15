import { Divider, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import GoogleButton from 'react-google-button';
import { useLocation } from 'react-router-dom'

import Login from '../login/login';
import RegisterComponent from '../register/register.component';
import Button from '../ui-components/button';
import useStyles from './access.styles';

function AccessComponent() {
    const classes = useStyles();
    const location = useLocation();
    const [showLoginForm, setShowLoginForm] = useState(true);
    function handleShowRegisterForm() {
        setShowLoginForm(false);
    }

    return (
        <div className={classes.container}>
            <Paper className={classes.loginContainer} elevation={3}>
                {showLoginForm === true ? (
                    <>
                        <Login />
                        <Divider />
                        <div className={classes.loginContainerButtons}>
                            <GoogleButton
                                label='Inicia sesión con google'
                                onClick={() => {
                                    window.location.href = `http://localhost:5001/api/auth/google?returnTo=${window.location.href}`;
                                }}
                            />
                        </div>

                        <Divider />
                        <br />
                        <span>¿No tienes cuenta?</span>
                        <Button
                            title="Crear cuenta"
                            color="deepGreen"
                            onClick={handleShowRegisterForm}
                        />
                    </>
                ) : (
                    <RegisterComponent />
                )}
            </Paper>
        </div>
    );
}

export default AccessComponent;
