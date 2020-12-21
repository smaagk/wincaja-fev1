import React from 'react';
import Badge from '@material-ui/core/Badge';
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }),
)(Badge);

export default function CartBarComponent() {
  const { qtyTotal }  = useSelector((state: RootState) => state.cart);

  return (
    <IconButton style={{marginLeft: '10px'}} aria-label="cart">
      <StyledBadge badgeContent={qtyTotal} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}