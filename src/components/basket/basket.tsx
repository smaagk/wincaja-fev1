import { Box, Card } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';

import { RootState } from '../../store';
import { formatCurrency } from '../../utils/currency';
import Button from '../ui-components/button';
import Item, { ItemI } from '../ui-components/product-item/item';
import useStyles from './basket.css';

const Basket: FC = () => {
  const dispatch = useDispatch();
  const basketStyles = useStyles();
  const store: any = useSelector((state: RootState) => state.cart);
  function handleNextStep() {
    dispatch({
      type: 'NEXT',
    });
  }
  return (
    <div className={basketStyles.container}>
      <Box className={basketStyles.items}>
        <h2 className={basketStyles.title}>Carrito</h2>
        {store.cart.map((data: ItemI) => {
          return (
            <Item
              key = {data.articulo}
              articulo={data.articulo}
              name={data.name}
              price={data.price}
              quantity={data.quantity}
              img={data.img}
            />
          );
        })}
      </Box>
      <Box className={basketStyles.total} id="total">
        <span className={basketStyles.subtotal}>
          Subtotal de articulos: {formatCurrency(store.total)}
        </span>
        <br />
        <span className={basketStyles.subtotal}>
          Total: {formatCurrency(store.total)}
        </span>
        <br />
        <Button
          title="Continuar"
          color="deepGreen"
          height="40px"
          whiteSpace="break-spaces"
          onClick={handleNextStep}
        ></Button>
      </Box>
    </div>
  );
};

export default Basket;
