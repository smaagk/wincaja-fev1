import { Divider, IconButton, makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PaymentOptionLabel from './payment-option-label';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
    root: {
        display: 'flex',
        marginBottom: 30,
        margin: 'auto',
        maxWidth: 700,
        flexDirection: 'column',
        alignItems: 'center',
        [breakpoints.up('md')]: {
            flexDirection: 'row',
        },
    },
    container: {
        display: 'flex',
        padding: '10px',
    },
}));

function PaymentOptions() {
    const allTypes: { [key: string]: boolean } = {
        Terminal: false,
        Efectivo: false,
        Linea: false,
    };

    const [options, setOptions]: any = React.useState(allTypes);
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleChange = (metodo: string) => {
        const filteredObject = Object.keys(options)
            .filter((val) => {
                return val !== metodo;
            })
            .reduce((val, x) => {
                val = { ...val, [x]: false };
                return val;
            }, {});

        setOptions({ ...filteredObject, [metodo]: !options[metodo] });
    };

    useEffect(() => {
        let method = [];

        for (let key in options) {
            if (options[key] === true) method.push(key);
        }

        dispatch({
            type: 'SETMETHOD',
            payload: method[0],
        });
    }, [options]);

    return (
        <div>
            <h2>Selecciona tu método de pago</h2>
            <div className={classes.root}>
                <PaymentOptionLabel
                    title="Pago con tarjeta, al recibir el producto"
                    type="Terminal"
                    onClick={() => handleChange('Terminal')}
                    active={options['Terminal']}
                />
                <PaymentOptionLabel
                    title="Pago con efectivo, al recibir el producto"
                    type="Efectivo"
                    onClick={() => handleChange('Efectivo')}
                    active={options['Efectivo']}
                />
                <PaymentOptionLabel
                    title="Pago en linea"
                    type="Linea"
                    onClick={() => handleChange('Linea')}
                    active={options['Linea']}
                />
            </div>
            <Divider flexItem />
        </div>
    );
}

export default PaymentOptions;
