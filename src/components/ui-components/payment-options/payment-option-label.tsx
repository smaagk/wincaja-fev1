import { Icon, InlineIcon } from '@iconify/react';
import creditCard from '@iconify-icons/emojione/credit-card';
import moneyWithWings from '@iconify-icons/emojione/money-with-wings';
import roundPayment from '@iconify-icons/ic/round-payment';
import { Card, CardActionArea, makeStyles, Paper } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import React from 'react';

const useStyles = makeStyles((props) => ({
    root: {
        maxWidth: 500,
        width: '100%',
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

export type PaymentOptionsTypes = {
    type: 'Efectivo' | 'Linea' | 'Terminal' | 'Preorden';
    title: string;
    active: boolean;
    onClick: React.MouseEventHandler<HTMLElement>;
};
// npm install --save-dev @iconify/react @iconify-icons/emojione

const iconTypes = {
    Linea: roundPayment,
    Efectivo: moneyWithWings,
    Terminal: creditCard,
    Preorden: creditCard
};

function PaymentOptionLabel(props: PaymentOptionsTypes) {
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
