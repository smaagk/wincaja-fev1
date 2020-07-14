import React, { ChangeEvent, useState } from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

interface IPasswordInput {
  label: string;
  name: string;
  password: string;
  error: boolean | undefined
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export function PasswordInputComponent(props: IPasswordInput) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.UIEvent) => {
    event.preventDefault();
  };

  return (
    <FormControl style={{ margin: 10 }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">
        {props.label}
      </InputLabel>
      <OutlinedInput
        type={showPassword ? 'text' : 'password'}
        value={props.password}
        name={props.name}
        onChange={props.onChange}
        error={props.error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={props.name === 'password'? 90 : 160}
      />
    </FormControl>
  );
}
