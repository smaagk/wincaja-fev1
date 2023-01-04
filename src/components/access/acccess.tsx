import { Divider, Paper } from '@material-ui/core';
import { VITE_API_URL } from 'constants/app.constants';
import useGetFetchData from 'custom-hooks/useGetFetchData';
import React, { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { RootState } from 'store';
import showRegisterFormReducer from 'store/showRegisterFormReducer';

import Login from '../login/login';
import RegisterComponent from '../register/register.component';
import Button from '../ui-components/button';
import useStyles from './access.styles';

function AccessComponent() {
    const classes = useStyles();
    const location = useLocation();
    const dispatch = useDispatch();
    const { showRegisterForm } = useSelector((state: RootState) => state.showRegisterForm);
    function handleShowRegisterForm() {
        dispatch({ type: 'SHOW_REGISTER_FORM'});
    }

    // const [dataLogin, dataLoginLoading]: any = useGetFetchData(
    //     `${VITE_API_URL}/checkpassportlogin`
    // );

    // const [imageData, setImageData] : any = useState();

    // useEffect(() => {
    //     if(dataLoginLoading === false && dataLogin.success){
    //       dispatch({
    //         type: 'LOGIN',
    //         payload: dataLogin,
    //       });
    //     }        
    // }, [dataLogin,dataLoginLoading]);

    useEffect(() => {
        console.log(showRegisterForm);
    }, [showRegisterForm]);

    return (
        <div className={classes.container}>
            <Paper className={classes.loginContainer} elevation={3}>
                {showRegisterForm === false ? (
                    <>
                        <Login />
                        <Divider />
                        {/* <div className={classes.loginContainerButtons}>
                            <GoogleButton
                                label='Inicia sesión con google'
                                onClick={() => {
                                    window.location.href = `http://localhost:5001/api/auth/google?returnTo=${window.location.href}`;
                                }}
                            />
                        </div> */}

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
