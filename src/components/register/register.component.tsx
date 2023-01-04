/* eslint-disable react-hooks/exhaustive-deps */
import { TextField } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useCustomFetch from '../../custom-hooks/useCustomFetch';
import useForm from '../../custom-hooks/useForm';
import { errorSnackbar, successSnackbar } from '../../utils/snackbar.utils';
import { setStatusAlert, StatusAlert } from '../../utils/snackbar.utils';
import { PasswordInputComponent, ValidationAdornment } from '../ui-components';
import Button from '../ui-components/button';
import useStyles from './register.styles';
import validateSchema, {
  IRegister,
  IRegisterErrors,
} from './validate-register';

const { VITE_API_URL, VITE_API2_URL } = import.meta.env;


function RegisterComponent() {
  const firstRender = useRef(true);
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    values,
    errors,
    isDirty,
    handleChange,
    handleSubmmit,
  }: {
    values: any;
    errors: any | undefined;
    isDirty: any;
    handleChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleSubmmit: (event: React.MouseEvent) => void;
  } = useForm(
    {
      email: '',
      password: '',
      passwordConfirmation: '',
      nombre: '',
      apellidop: '',
      apellidom: '',
      rfc: '',
      telefono: ''
    },
    validateSchema,
    submmitRegister
  );

  const [valuesRegister, setValuesRegister] = useState({})
  const [url, setUrl]: any = useState(null);
  const [register, registerLoading, registerError]: any = useCustomFetch(
    url,
    valuesRegister
  );

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (!registerLoading && register) {
      if (register.message === 'Usuario creado correctamente') {
        enqueueSnackbar(
          register.message,
          {
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            },
            variant: 'success',
            autoHideDuration: 3000
          });

        dispatch({
          type: 'HIDE_REGISTER_FORM'
        });
      } else {
        enqueueSnackbar(
          register.message,
          {
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            },
            variant: 'error',
            autoHideDuration: 3000
          }
        );
      }
    }

    setUrl(null);
  }, [url, registerLoading]);

  function submmitRegister() {
    setValuesRegister({
      nombre: values.nombre,
      apellido1: values.apellidop,
      apellido2: values.apellidom,
      rfc: values.rfc,
      email: values.email,
      idUsuario: values.email,
      password: values.password,
      telefono: values.telefono
    })

    setUrl(`${VITE_API2_URL}/user`)

  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

  }, [values]);

  function isValidAndTouched(field: string) {
    if (!errors[field].isValid && isDirty[field]) {
      return true;
    } else {
      return undefined;
    }
  }
  
  function cancelRegister() {
    dispatch({
      type: 'HIDE_REGISTER_FORM'
    });
  }

  return (
    <>
      <TextField
        className={classes.input}
        label="Email"
        name="email"
        variant="outlined"
        autoComplete="nope"
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <ValidationAdornment status={isValidAndTouched('email')} />
          ),
        }}
        error={isValidAndTouched('email')}
      ></TextField>
      {isValidAndTouched('email') ? <p className={classes.errorInputMessage}>{errors.email.msg}</p> : null}
      <PasswordInputComponent
        label="Contraseña"
        name="password"
        password={values.password}
        onChange={handleChange}
        error={isValidAndTouched('password')}
      />
      {isValidAndTouched('password') ? <p className={classes.errorInputMessage}>{errors.password.msg}</p> : null}
      <PasswordInputComponent
        label="Confirmar contraseña"
        name="passwordConfirmation"
        password={values.passwordConfirmation}
        onChange={handleChange}
        error={isValidAndTouched('passwordConfirmation')}
      />
      {isValidAndTouched('passwordConfirmation') ? (
        <p className={classes.errorInputMessage}>{errors.passwordConfirmation.msg}</p>
      ) : null}
      <TextField
        className={classes.input}
        label="Nombre"
        name="nombre"
        variant="outlined"
        onChange={handleChange}
        error={isValidAndTouched('nombre')}
        InputProps={{
          endAdornment: (
            <ValidationAdornment status={isValidAndTouched('nombre')} />
          ),
        }}
      ></TextField>
      {isValidAndTouched('nombre') ? <p className={classes.errorInputMessage}>{errors.nombre.msg}</p> : null}
      <TextField
        className={classes.input}
        label="Apellido paterno"
        name="apellidop"
        variant="outlined"
        onChange={handleChange}
        error={isValidAndTouched('apellidop')}
        InputProps={{
          endAdornment: (
            <ValidationAdornment status={isValidAndTouched('apellidop')} />
          ),
        }}
      ></TextField>
      {isValidAndTouched('apellidop') ? <p className={classes.errorInputMessage}>{errors.apellidop.msg}</p> : null}
      <TextField
        className={classes.input}
        label="Apellido materno"
        name="apellidom"
        onChange={handleChange}
        variant="outlined"
      ></TextField>
      <TextField
        className={classes.input}
        label="Telefono"
        name="telefono"
        onChange={handleChange}
        variant="outlined"
      ></TextField>
      {isValidAndTouched('telefono') ? <p className={classes.errorInputMessage}>{errors.telefono.msg}</p> : null}
      <TextField
        className={classes.input}
        label="RFC"
        name="rfc"
        onChange={handleChange}
        variant="outlined"
      ></TextField>
      <Button
        title="Continuar"
        color="deepGreen"
        height="40px"
        whiteSpace="break-spaces"
        onClick={handleSubmmit}
      ></Button>
      <Button
        title="Cancelar"
        color="deepRed"
        height="40px"
        whiteSpace="break-spaces"
        onClick={cancelRegister}
      />
    </>
  );
}

export default RegisterComponent;
