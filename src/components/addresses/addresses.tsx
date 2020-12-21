import React, { useEffect, useState } from 'react';
import { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import AccessComponent from '../access/acccess';
import Address from './address/address';
import AddAddressComponent from './addAddressComponent/add-address.component';
import { makeStyles } from '@material-ui/core';
import useGetFetchData from '../../custom-hooks/useGetFetchData';
import { IAddress } from './addAddressComponent/validate-address';
import useDeleteFetch from '../../custom-hooks/useDelete';
import * as _ from 'lodash';

const AddressStyles = makeStyles({
  container: {
    maxWidth: 520,
    margin: 'auto',
  },
});
const { REACT_APP_API_URL } = process.env;

function AddressesComponent() {
  const styles = AddressStyles();
  const dispatch = useDispatch();
  const isAuthenticated: boolean = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const addresses: [] = useSelector(
    (state: RootState) => state.address.addresses
  );
  const [paramsAddress, setParamsAddress]: any = useState(null);
  let [_addresses, addressesLoading]: any = useGetFetchData(
    `${REACT_APP_API_URL}/direcciones`,
    paramsAddress
  );
  const [addressToDelete, setAddressToDelete] = useState({ alias: '' });
  const [deletedAddress, deleteAddressLoading]: any = useDeleteFetch(
    `${REACT_APP_API_URL}/direcciones`,
    addressToDelete
  );

  useEffect(() => {
    if (_.isEmpty(addresses)) {
      setParamsAddress(true);
    }

    console.log(addresses)
  }, []);

  useEffect(() => {
    if (!addressesLoading && _addresses.success) {
      dispatch({ type: 'SETADDRESSES', payload: _addresses.addresses });
    }
  }, [addressesLoading]);

  function handleDeleteAddress(alias: string) {
    setAddressToDelete({ alias: alias });
  }

  useEffect(() => {
    console.log(deleteAddressLoading)
    if (!deleteAddressLoading && deletedAddress === 1) {
      console.log("borrando")
      dispatch({ type: 'DELETEADDRESS', payload: addressToDelete.alias });
    }
  }, [deleteAddressLoading]);

  function selectAddress(key: string) {
    dispatch({
      type: 'SELECTADDRESS',
      payload: key,
    });
  }

  if (isAuthenticated) {
    if (addresses !== undefined) {
      return (
        <div className={styles.container}>
          <AddAddressComponent />
          {addresses.map((address: IAddress) => {
            return (
              <Address
                key={address.alias}
                handleDelete={() => handleDeleteAddress(address.alias)}
                address={address}
                onClick={() => selectAddress(address.alias)}
              />
            );
          })}
        </div>
      );
    } else {
      return <p>Loading</p>;
    }
  }

  return (
    <>
      <h2>Por favor inicia sesión para recuperar los datos</h2>
      <AccessComponent />
    </>
  );
}

export default AddressesComponent;
