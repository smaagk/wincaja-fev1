import React, { useState, FC, useEffect } from 'react';
import {
  Box,
  ButtonGroup,
  Button,
  Card,
  CardMedia,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './item.css';
import { formatCurrency } from '../../../utils/currency';
import { useDispatch } from 'react-redux';

export type ItemI = {
  articulo?: string;
  img?: string;
  price: number;
  description?: string;
  quantity: number;
  name: string;
};

const Item: FC<ItemI> = (data: ItemI) => {
  const dispatch = useDispatch();
  const itemStyles = useStyles();
  const [price, setPrice] = useState(formatCurrency(data.price));
  const [counter, setCounter] = useState(data.quantity);
  const [totalProduct, setTotalProduct] = useState('');

  useEffect(() => {
    setTotalProduct(formatCurrency(counter * data.price));
  }, [counter]);

  const handleIncrement = () => {
    setCounter(counter + 1);
    dispatch({
      type: 'ADDQUANTITY',
      payload: data,
    });
  };

  const handleDecrement = () => {
    setCounter(counter - 1);
    dispatch({
      type: 'SUBQUANTITY',
      payload: data,
    });
  };

  const handleDelete = () => {
    dispatch({
      type: 'DELETEPRODUCT',
      payload: data,
    });
  }
  const displayCounter = counter > 0;
  return (
    <Card elevation={3} className={itemStyles.root}>
      <Box className={itemStyles.itemContainer} component="div" m={1}>
        <CardMedia className={itemStyles.image} image={data.img}></CardMedia>
        <p className={`${itemStyles.marginItem} ${itemStyles.name}`}>{data.name}</p>
        <Box
          className={`${itemStyles.marginItem} ${itemStyles.price}`}
          component="span">
          {price}
        </Box>
        <ButtonGroup size="small" aria-label="small outlined button group">
          <Button onClick={handleIncrement}>+</Button>
          {displayCounter && (
            <Button className={itemStyles.qty}>{counter}</Button>
          )}
          {displayCounter && <Button onClick={handleDecrement}>-</Button>}
        </ButtonGroup>
        <DeleteIcon onClick={handleDelete} className={itemStyles.marginItem} />
        <Box
          className={`${itemStyles.marginItem} ${itemStyles.price}`}
          component="span">
          Total: {totalProduct}
        </Box>
      </Box>
    </Card>
  );
};

export default Item;