//react functional component in typescript to tell stock quantity
import { REACT_APP_API2_URL } from 'constants/app.constants';
import useGetFetchData from 'custom-hooks/useGetFetchData';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import useStyles from './stock.css';

export const StockAvailability = ({ idProduct } : any) => {
  const styles = useStyles();
  const _almacen: string = useSelector(
      (state: RootState) => state.almacen.almacen
  );
  const [params, setParams] = useState({
    articulo: idProduct,
    almacen: _almacen,
  });

  const [stock, stockDataLoading]: any = useGetFetchData(`${REACT_APP_API2_URL}/existencias/`, params);
  const [stockAvailability, setStockAvailability] = useState(0);

  useEffect(() => {
    setParams((prevParams) => ({ ...prevParams, almacen: _almacen }));
  }, [_almacen]);

  useEffect(() => {
    if (stockDataLoading !== true && stock.hasOwnProperty('total')) {
      setStockAvailability(Math.floor(stock.total));
    }
  }, [stock, stockDataLoading]);

  return (
    <div>
      <h3 className={stockAvailability > 0 ? styles.stockAvailChip : styles.stockAvailChipCero}>{stockAvailability}</h3>
    </div>
  );
};