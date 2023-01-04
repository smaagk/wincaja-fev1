import 'react-credit-cards/es/styles-compiled.css';

import { CircularProgress } from '@material-ui/core';
import { Card, TextField } from '@material-ui/core';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import cx from 'clsx';
import useCustomFetch from 'custom-hooks/useCustomFetch';
import useFetch from 'custom-hooks/useFetch';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import Cards from 'react-credit-cards';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { creditCardConstants } from '../../constants/app.constants';
import useFetchOpenPay from '../../custom-hooks/useFetchOpenPay';
import { errorSnackbar, successSnackbar } from '../../utils/snackbar.utils';
import Button from '../ui-components/button';
import PaymentOption from '../ui-components/payment-options/payment-options';
import { useStyles } from './payment-styles';
import { validateData } from './payment-validations';
import ValidationAdornment from './validation-adornment';

const cardDataInitialState = {
    cvc: {
        value: '',
        isValid: undefined,
    },
    expiry: {
        value: '',
        isMonthValid: undefined,
        isYearValid: undefined,
    },
    focused: {
        value: undefined,
    },
    name: {
        value: '',
        isValid: undefined,
    },
    number: {
        value: '',
        isValid: undefined,
    },
};
const {
    VITE_API_URL,
    VITE_API2_URL,
    VITE_MERCHANT_ID,
    VITE_APIOPENPAY,
    VITE_PKOPENPAY
} = import.meta.env;

export const PaymentCardComponent = React.memo(function PaymentCard() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { metodoPago } = useSelector((state) => state.payment);
    const address = useSelector((state) => state.address);
    const almacen = useSelector((state) => state.almacen);
    const { cart } = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);
    const styles = useStyles();
    const { button: buttonStyles } = useBlogTextInfoContentStyles();
    const shadowStyles = useOverShadowStyles();
    const [cardData, setCardData] = useState(cardDataInitialState);
    const [cardDataValid, setCardDataValid] = useState(false);
    const [validDate, setValidDate] = useState({ month: '', year: '' });
    const [apiOpenPayURL, setApiOpenPayURL] = useState(null);
    const apiOpenPay = `${VITE_APIOPENPAY}${VITE_MERCHANT_ID}/tokens`;
    const [cardDataToken, setCardDataToken] = useState(null);
    const [tokenResponse, tokenLoading, tokenError] = useFetchOpenPay(
        apiOpenPayURL,
        cardDataToken
    );

    const [shoppingCartInfo, setShoppingCartInfo] = useState(null);
    const [payment, paymentLoading, paymentError] = useCustomFetch(
        `${VITE_API2_URL}/payment-line`,
        shoppingCartInfo
    );
    const [startPayment, setStartPayment] = useState(false);
    const [paymentLoadingProgress, setPaymentLoadingProgress] = useState(false);
    const [preorden, setPreorden] = useState({});
    const [
        preordenCreated,
        preordenCreatedLoading,
        preordenCreatedError,
    ] = useFetch(`${VITE_API_URL}/preorden`, 'POST', preorden);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    function handleInputFocus(e) {
        setCardData({ ...cardData, focused: { value: e.target.name } });
    }

    function handleInput(e) {
        const field = e.target;
        setCardData({
            ...cardData,
            [e.target.name]: {
                isValid: validateData(field.name, field.value),
                value: String(e.target.value),
            },
        });
    }

    function isValidAndTouched(field) {
        return !cardData[field].isValid && cardData[field].value !== '';
    }

    function handleInputExpiry(e) {
        const field = e.target;
        if (e.target.name === 'month') {
            setValidDate({ ...validDate, month: e.target.value });
            setCardData({
                ...cardData,
                expiry: {
                    ...cardData.expiry,
                    isMonthValid: validateData(field.name, field.value),
                },
            });
        }

        if (e.target.name === 'year') {
            setValidDate({ ...validDate, year: e.target.value });

            setCardData({
                ...cardData,
                expiry: {
                    ...cardData.expiry,
                    isYearValid: validateData(field.name, field.value),
                },
            });
        }
    }

    function checkValidDataCard(cardData) {
        if (
            cardData.cvc.isValid &&
            cardData.name.isValid &&
            cardData.number.isValid &&
            cardData.expiry.isMonthValid &&
            cardData.expiry.isYearValid
        ) {
            setCardDataValid(true);
            return true;
        }
        return false;
    }
    const [deviceDataId, setDeviceDataId] = useState(null);

    //Se inicializa las credenciales de open pay al iniciar el componente
    useEffect(() => {
        window.OpenPay.setId(VITE_MERCHANT_ID);
        window.OpenPay.setApiKey('pk_9ba749f326ef4154a0dacb06dae26370');
        window.OpenPay.setSandboxMode(true);
        setDeviceDataId(window.OpenPay.deviceData.setup('paymentForm'));
    }, []);

    useEffect(() => {
        dispatch({ type: 'SETDEVICE', payload: deviceDataId });
    }, [deviceDataId, dispatch]);

    useEffect(() => {
        if (!tokenLoading) {
            dispatch({ type: 'SETSOURCEID', payload: tokenResponse });
        }
    }, [tokenLoading, tokenResponse, dispatch]);

    useEffect(() => {
        setCardData({
            ...cardData,
            expiry: {
                ...cardData.expiry,
                value: `${validDate.month}/${validDate.year}`,
            },
        });
    }, [validDate]);

    useEffect(() => {
        if (cardDataValid) {
            setCardDataToken({
                card_number: cardData.number.value,
                holder_name: cardData.name.value,
                expiration_month: validDate.month,
                expiration_year: validDate.year,
                cvv2: cardData.cvc.value,
            });
            setApiOpenPayURL(apiOpenPay);
        }
    }, [cardDataValid]);

    useEffect(() => {
        if (tokenResponse !== null && startPayment) {
            const products = cart.map((val) => {
                return { id: val.articulo, quantity: val.quantity };
            });

            setShoppingCartInfo({
                chargeInfo: {
                    source_id: tokenResponse.id,
                    device_session_id: deviceDataId,
                },
                AliasDireccion: address.addressKey,
                customerId: auth.user.clientesLinea.OpenpayClientId,
                products,
            });

            setStartPayment(false);
            setApiOpenPayURL(null);
        }
    }, [tokenLoading, startPayment]);

    useEffect(() => {
        if (!preordenCreatedLoading && preordenCreated) {
            console.log(preordenCreated); 
            if (preordenCreated.success === true) {
                enqueueSnackbar(
                    'Pedido finalizado, por favor revisa en tu correo la confirmación del pedido',
                    successSnackbar
                );

                history.push('/tienda/confirmacion');
                dispatch({ type: 'CLEANCART' });   //Se limpia el carrito
            }
        }
    }, [preordenCreatedLoading]);

    useEffect(() => {
        if (paymentLoading !== false && payment && payment.success) {
            history.push('/tienda/confirmacion');
            dispatch({ type: 'CLEANCART' })
        }
    }, [paymentLoading, payment]);

    function makeOrder() {
        if (checkValidDataCard(cardData)) {
            setStartPayment(true);
            setPaymentLoadingProgress(true);
        } else {
            enqueueSnackbar(creditCardConstants.INCOMPLETEDATA, errorSnackbar);
        }
    }

    function makePreOrder() {
        if (metodoPago === '' || metodoPago === undefined) {
            enqueueSnackbar(
                creditCardConstants.METODOPAGONOELECCIONADO,
                errorSnackbar
            );
        } else if (
            !almacen
        ) {
            enqueueSnackbar(creditCardConstants.NOALMACEN, errorSnackbar);
        } else {
            const articulos = cart.map((val) => {
                return { articulo: val.articulo, quantity: val.quantity };
            });
            const preorder = {
                almacen,
                metodoPago,
                articulos,
                AliasDireccion: address.addressKey
            };

            setPreorden(preorder);
        }
    }

    return (
        <div>
            {paymentLoadingProgress ? (
                <CircularProgress />
            ) : (
                <>
                    <PaymentOption />
                    {metodoPago === 'Linea' ? (
                        <Card className={cx(styles.root, shadowStyles.root)}>
                            <div className={styles.media}>
                                <Cards
                                    cvc={cardData.cvc.value}
                                    expiry={cardData.expiry.value}
                                    focused={cardData.focused.value}
                                    name={cardData.name.value}
                                    locale={{ valid: 'Válida hasta' }}
                                    placeholders={{
                                        name: 'Nombre del titular',
                                    }}
                                    number={cardData.number.value}
                                />
                            </div>
                            <div className={styles.payment}>
                                <form
                                    id="paymentForm"
                                    className={styles.formPayment}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        label="Nombre del titular"
                                        name="name"
                                        onChange={handleInput}
                                        onFocus={handleInputFocus}
                                        InputProps={{
                                            endAdornment: (
                                                <ValidationAdornment
                                                    status={
                                                        cardData.name.isValid
                                                    }
                                                />
                                            ),
                                        }}
                                        error={isValidAndTouched('name')}
                                        variant="outlined"
                                    />
                                    <TextField
                                        label="Numero de la tarjeta"
                                        name="number"
                                        onChange={handleInput}
                                        onFocus={handleInputFocus}
                                        variant="outlined"
                                        autoComplete="cc-number"
                                        InputProps={{
                                            endAdornment: (
                                                <ValidationAdornment
                                                    status={
                                                        cardData.number.isValid
                                                    }
                                                />
                                            ),
                                        }}
                                        error={isValidAndTouched('number')}
                                    />

                                    <div className={styles.formBox}>
                                        <TextField
                                            label="Mes"
                                            name="month"
                                            onFocus={handleInputFocus}
                                            onChange={handleInputExpiry}
                                            InputProps={{
                                                endAdornment: (
                                                    <ValidationAdornment
                                                        status={
                                                            cardData.expiry
                                                                .isMonthValid
                                                        }
                                                    />
                                                ),
                                            }}
                                            variant="outlined"
                                        />
                                        <TextField
                                            label="Año"
                                            name="year"
                                            onFocus={handleInputFocus}
                                            onChange={handleInputExpiry}
                                            InputProps={{
                                                endAdornment: (
                                                    <ValidationAdornment
                                                        status={
                                                            cardData.expiry
                                                                .isYearValid
                                                        }
                                                    />
                                                ),
                                            }}
                                            variant="outlined"
                                        />
                                        <TextField
                                            onFocus={handleInputFocus}
                                            onChange={handleInput}
                                            label="CVC"
                                            name="cvc"
                                            variant="outlined"
                                            type="number"
                                            InputProps={{
                                                endAdornment: (
                                                    <ValidationAdornment
                                                        status={
                                                            cardData.cvc.isValid
                                                        }
                                                    />
                                                ),
                                            }}
                                            error={isValidAndTouched('cvc')}
                                        />
                                    </div>
                                    <Button
                                        className={buttonStyles}
                                        title="Proceder al pago"
                                        color="deepGreen"
                                        onClick={makeOrder}
                                    ></Button>
                                </form>
                            </div>
                        </Card>
                    ) : (
                        <Button
                            className={buttonStyles}
                            title="Finalizar pedido"
                            color="deepGreen"
                            onClick={makePreOrder}
                        ></Button>
                    )}
                </>
            )}
        </div>
    );
});

export default PaymentCardComponent;
