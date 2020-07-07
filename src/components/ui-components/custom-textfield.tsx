import React, { FC } from 'react';
import { TextField } from '@material-ui/core';

interface MyEventTarget extends EventTarget {
  value: string;
}

interface MyFormEvent<T> extends React.FormEvent<T> {
  target: MyEventTarget;
}

interface TextFieldProps extends React.HTMLProps<any> {
  label: string;
  name: string;
  handleInputFocus: React.EventHandler<MyFormEvent<any>>;
  handleInputExpiry: React.EventHandler<MyFormEvent<any>>;
  variant: 'standard' | 'filled' | 'outlined';
}

const CustomTextField: FC<TextFieldProps> = (props) => {
  return (
    <TextField
      label={props.label}
      name={props.name}
      onFocus={props.handleInputFocus}
      onChange={props.handleInputExpiry}
      variant={props.variant}
    />
  );
};

export default CustomTextField;
