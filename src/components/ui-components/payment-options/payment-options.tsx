import { Divider, makeStyles } from '@material-ui/core';
import { REACT_APP_API_URL } from 'constants/app.constants';
import useFetchData from 'custom-hooks/useFetchData';
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
        justifyContent: 'space-around',
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

interface PaymentOptionsProps {
    id: number,
    descripcion: "Efectivo" | "Linea" | "Terminal" | "Preorden",
    habilitado: boolean
}

function PaymentOptions() {
    const allTypes: { [key: string]: boolean } = {
        Terminal: false,
        Efectivo: false,
        Linea: false,
    };

    const [options, setOptions]: any = React.useState(allTypes);
    const classes = useStyles();
    const dispatch = useDispatch();

    const [paymentOptions, paymentOptionsLoading]: any = useFetchData(
        `${REACT_APP_API_URL}/metodospago`
    );

    useEffect(() => {
        console.log(paymentOptions)
    }, [paymentOptions])

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
            <h2>Selecciona tu método de pago hehehhe</h2>
            <div className={classes.root}>
                {paymentOptions && paymentOptions.map((payment: PaymentOptionsProps) => {
                    return payment.habilitado ? (
                        <PaymentOptionLabel
                            title={payment.descripcion}
                            type={payment.descripcion}
                            onClick={() => handleChange(payment.descripcion)}
                            active={options[payment.descripcion]}
                        />) : <></>
                })}
                {/* <PaymentOptionLabel
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
                /> */}
            </div>
            <Divider flexItem />
        </div>
    );
}

export default PaymentOptions;

