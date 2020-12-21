import React, { useState, useEffect } from 'react';
import { Card, Box, CardActionArea, CardContent } from '@material-ui/core';
import useAddressStyles from './address.styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { AddressInfo } from 'net';
import TitleComponent from '../../ui-components/title/title';
import useGetFetchData from '../../../custom-hooks/useGetFetchData';
import { IAddress } from '../addAddressComponent/validate-address';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

export interface AddressComponent {
  handleDelete?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  onClick: (event: React.MouseEvent) => void;
  address: IAddress;
}

function Address({ handleDelete, address, onClick }: AddressComponent) {
  const styles = useAddressStyles();
  const [activeAddress, setActiveAddress] = useState(false);
  const { addressKey } = useSelector((state: RootState) => state.address);

  useEffect(() => {
    if(address.alias === addressKey){
      setActiveAddress(true);
    }else{
      setActiveAddress(false);
    }
  },[addressKey]);

  return (
    <Card elevation={3} className={`${styles.container} ${activeAddress ? styles.active : ""}`} onClick={onClick}>
      <CardActionArea>
        <CardContent>
          <Box className={styles.header}>
            <h2>{address.alias}</h2>
            <DeleteIcon onClick={handleDelete} />
          </Box>
          <Box className={styles.address}>
            {Object.entries(address)
              .filter((val, index) => val[0] !== 'alias')
              .map((val, index) => {
                return (
                  <Box
                    key={`${index}${val[0]}`}
                    className={styles.addressSection}
                  >
                    <TitleComponent title={val[0]} />
                    {val[1]}
                  </Box>
                );
              })}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Address;
