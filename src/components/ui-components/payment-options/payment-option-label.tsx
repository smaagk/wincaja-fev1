import React from 'react';
import { Card, CardActionArea, makeStyles, Paper } from '@material-ui/core';
import { Icon, InlineIcon } from '@iconify/react';
import creditCard from '@iconify-icons/emojione/credit-card';
import moneyWithWings from '@iconify-icons/emojione/money-with-wings';
import roundPayment from '@iconify-icons/ic/round-payment';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((props) => ({
    root: {
        maxWidth: 500,
        width: 500,
        marginLeft: 10,
        cursor: 'pointer',
    },
    container: {
        display: 'flex',
        padding: '10px',
        cursor: 'pointer',
    },
    active: {
        border: '3px solid #6ac31a'
    }
}));

type PaymentOptions = {
    type: 'Efectivo' | 'Linea' | 'Terminal';
    title: string;
    active: boolean;
    onClick: React.MouseEventHandler<HTMLElement>;
};
// npm install --save-dev @iconify/react @iconify-icons/emojione

const iconTypes = {
    Linea: roundPayment,
    Efectivo: moneyWithWings,
    Terminal: creditCard,
};

function PaymentOptionLabel(props: PaymentOptions) {
    const classes = useStyles();

    return (
        <Card onClick={props.onClick} className={`${classes.root} ${props.active ? classes.active : ""}`} elevation={3}>
            <CardActionArea className={classes.container}>
                <Icon icon={iconTypes[props.type]} width="80" height="80" />
                <FormLabel style={{ cursor: 'pointer' }}>
                    {props.title}
                </FormLabel>
            </CardActionArea>
        </Card>
    );
}

export default PaymentOptionLabel;
