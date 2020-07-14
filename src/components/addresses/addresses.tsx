import React from 'react';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import AccessComponent from '../access/acccess';

function AddressesComponent() {
  const isAuthenticated: boolean = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (isAuthenticated) {
    return <h1>ya esta logeaop</h1>;
  }

  return (<><h2>Por favor inicia sesión para recuperar los datos</h2><AccessComponent /></>);
}

export default AddressesComponent;
