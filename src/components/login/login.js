import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useCustomFetch from '../../custom-hooks/useCustomFetch';
import CustomSnackBar from '../ui-components/custom-snackbar';
import Button from '../ui-components/button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import useStyles from './logincss';
import { setStatusAlert } from '../../utils/snackbar.utils';
function Login() {
  let history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [values, setValues] = useState({
    idUsuario: '',
    password: '',
    showPassword: false,
  });
  const [method, setMethod] = useState(null);
  const [url, setUrl] = useState(null);
  const [auth_values, auth_loading, auth_error] = useCustomFetch(url, values);

  const [snackStatus, setSnackStatus] = useState(null);

  useEffect(() => {
    if (!auth_loading && url !== null) {
      if (auth_values.success) {
        dispatch({
          type: 'LOGIN',
          payload: auth_values,
        });
        setSnackStatus(setStatusAlert('Acceso autorizado', 'success'));
        history.push('/productos');
      } else {
        setSnackStatus(setStatusAlert(auth_values.error, 'error'));
      }
      setUrl(null);
    }
  }, [url, auth_loading]);

  const handleInpuChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMethod('POST');
    setUrl('http://localhost:3000/api/authenticate');
  };

  return (
    <>
      <TextField
        className={classes.inputLogin}
        label="Usuario"
        onChange={handleInpuChange}
        name="idUsuario"
        variant="outlined"
      ></TextField>
      <FormControl className={classes.inputLogin} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          name="password"
          onChange={handleInpuChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>
      <Button
        title="Acceder"
        onClick={handleSubmit}
        color={'deepOrange'}
      ></Button>
      {snackStatus ? (
        <CustomSnackBar key={snackStatus.date} status={snackStatus} />
      ) : null}
    </>
  );
}

export default Login;
