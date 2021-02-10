import { Divider,Paper } from '@material-ui/core';
import React, { useState } from 'react';

import Login from '../login/login';
import RegisterComponent from '../register/register.component'
import Button from '../ui-components/button';
import useStyles from './access.styles';
function AccessComponent() {
  const classes = useStyles();
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
            <br />
            <span>¿No tienes cuenta?</span>
            <Button
              title="Crear cuenta"
              color="deepGreen"
              onClick={handleShowRegisterForm}
            />
          </>
        ) : (
          <RegisterComponent/>
        )}
      </Paper>
    </div>
  );
}

export default AccessComponent;
