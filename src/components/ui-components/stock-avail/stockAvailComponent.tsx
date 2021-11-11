//react functional component in typescript to tell stock quantity
import React from 'react';
import useStyles from './stock.css';

export const StockAvailability = ({ stock } : any) => {
  const styles = useStyles();
  return (
    <div>
      <h3 className={stock > 0 ? styles.stockAvailChip : styles.stockAvailChipCero}>Existencias disponibles: {stock}</h3>
    </div>
  );
};