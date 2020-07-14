import React from 'react';
import { InputAdornment } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';

type IValidationAdornment = {
  status: boolean | undefined;
};

export function ValidationAdornment(props: IValidationAdornment) {
  if (props.status === undefined) {
    return null;
  }
  
  return (
    <InputAdornment position="end">
      {props.status  ? (
        <ClearIcon style={{ color: 'red' }} />
      ) : (
        <CheckIcon style={{ color: 'green' }} />
      )}
    </InputAdornment>
  );
}

