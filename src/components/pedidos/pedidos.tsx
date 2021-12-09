import { makeStyles } from '@material-ui/core';
import { REACT_APP_API_URL } from 'constants/app.constants';
import useGetFetchData from 'custom-hooks/useGetFetchData';
import React, { useEffect, useState } from 'react'

import OrderTable from './table-orders/table-order';

const useOrderStyles = makeStyles({
    root: {
      width: '60%',
      margin: 'auto'
    },
  });

function Pedidos() {
    const orderStyles = useOrderStyles();
    const [pedidosData, pedidosDataDataLoading]: any = useGetFetchData(
        `${REACT_APP_API_URL}/peordenescliente`
    );

    const [orders, setOrders] = useState([]);
    useEffect(()=>  {
        if(pedidosDataDataLoading !== true &&  pedidosData.hasOwnProperty('pedidos')){
            setOrders(pedidosData.pedidos)
            console.log(pedidosData.pedidos);
        }
    },[pedidosData,pedidosDataDataLoading])

    return (
        <div className={orderStyles.root}>
           <OrderTable pedidos={orders} />
        </div>
    )
}

export default Pedidos
