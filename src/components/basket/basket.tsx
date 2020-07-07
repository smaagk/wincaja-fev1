import React, { FC, useEffect, useState } from 'react';
import { Box, Card } from '@material-ui/core';
import useStyles from './basket.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Item, { ItemI } from '../ui-components/product-item/item';
import { formatCurrency } from '../../utils/currency';
import Button from '../ui-components/button'
const Basket: FC = () => {
  const basketStyles = useStyles();
  const store: any = useSelector((state: RootState) => state.cart);
  const [subtotal, setSubTotal] = useState(0);

  return (
    <div className={basketStyles.container}>
      <Box className={basketStyles.items}>
        <h2 className={basketStyles.title}>Carrito</h2>
        {store.cart.map((data: ItemI) => {
          return (
            <Item
              articulo={data.articulo}
              name={data.name}
              price={data.price}
              quantity={data.quantity}
              img={data.img}
            />
          );
        })}
      </Box>
      <Card elevation={3} className={basketStyles.total} id="total">
        <span className={basketStyles.subtotal}>
          Subtotal de articulos: {formatCurrency(store.total)}
        </span>
        <br/>
        <span className={basketStyles.subtotal}>
          Total: {formatCurrency(store.total)}
        </span>
        <br/>
        <Button
            title="Continuar con la compra"
            color="deepGreen"
            height="60px"
            whiteSpace='break-spaces'
          ></Button>
      </Card>
    </div>
  );
};

export default Basket;