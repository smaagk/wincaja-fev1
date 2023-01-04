import { makeStyles } from '@material-ui/core';
import { VITE_API2_URL } from 'constants/app.constants';
import useGetFetchData from 'custom-hooks/useGetFetchData';
import React, { useEffect, useState } from 'react'

import OrderTable from '../admin/pedidos/table-orders/table-order';

const useOrderStyles = makeStyles({
    root: {
      width: '90%',
      margin: 'auto'
    },
  });

function Pedidos() {
    const orderStyles = useOrderStyles();
    const [pedidosData, pedidosDataDataLoading]: any = useGetFetchData(
        `${VITE_API2_URL}/preordenes`
    );

    const [orders, setOrders] = useState([]);
    useEffect(()=>  {
        if(pedidosDataDataLoading !== true &&  pedidosData.hasOwnProperty('preOrdenesVentaEnLinea')){
            setOrders(pedidosData.preOrdenesVentaEnLinea)
            console.log(pedidosData.preOrdenesVentaEnLinea);
        }
    },[pedidosData,pedidosDataDataLoading])

    return (
        <div className={orderStyles.root}>
           <OrderTable pedidos={orders} />
        </div>
    )
}

export default Pedidos
