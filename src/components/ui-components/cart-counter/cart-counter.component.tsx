import Badge from '@material-ui/core/Badge';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import {
    createStyles,
    makeStyles,
    Theme,
    withStyles,
} from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from 'store';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: 'fixed',
            bottom: theme.spacing(6),
            right: theme.spacing(4),
        },
    })
);

const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
        badge: {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    })
)(Badge);

export default function CartBarComponent() {
    const { qtyTotal } = useSelector((state: RootState) => state.cart);
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const fab = {
        color: 'secondary' as 'secondary',
        className: classes.fab,
        icon: (
            <StyledBadge badgeContent={qtyTotal} color="secondary">
                <ShoppingCartIcon />
            </StyledBadge>
        ),
        label: 'Add',
    };

    function handleGoToCart(){
      history.push('/tienda/carrito');
      dispatch({
        type: 'RESETSTEP',
      });

    }

    return (
        <Fab
            aria-label={fab.label}
            className={fab.className}
            color={fab.color}
            onClick={handleGoToCart}
        >
          {fab.icon}
        </Fab>
    );
}
