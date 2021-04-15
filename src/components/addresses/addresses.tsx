import { makeStyles } from '@material-ui/core';
import * as _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useDeleteFetch from '../../custom-hooks/useDelete';
import useGetFetchData from '../../custom-hooks/useGetFetchData';
import { RootState } from '../../store';
import AccessComponent from '../access/acccess';
import Button from '../ui-components/button';
import AddAddressComponent from './addAddressComponent/add-address.component';
import { IAddress } from './addAddressComponent/validate-address';
import Address from './address/address';

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
        if (!deleteAddressLoading && deletedAddress === 1) {
            dispatch({ type: 'DELETEADDRESS', payload: addressToDelete.alias });
        }
    }, [deleteAddressLoading]);

    function selectAddress(key: string) {
        dispatch({
            type: 'SELECTADDRESS',
            payload: key,
        });
    }

    function handleNextStep() {
        dispatch({
            type: 'NEXT',
        });
    }

    if (isAuthenticated) {
        if (addresses !== undefined) {
            return (
                <div className={styles.container}>
                    <AddAddressComponent />
                    <br />
                    {addresses.map((address: IAddress) => {
                        return (
                            <Address
                                key={address.alias}
                                handleDelete={() =>
                                    handleDeleteAddress(address.alias)
                                }
                                address={address}
                                onClick={() => selectAddress(address.alias)}
                            />
                        );
                    })}

                    <br />
                    <Button
                        title="Continuar"
                        color="deepGreen"
                        height="40px"
                        whiteSpace="break-spaces"
                        onClick={handleNextStep}
                    ></Button>
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
