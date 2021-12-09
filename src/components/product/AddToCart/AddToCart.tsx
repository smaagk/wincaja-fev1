import { Button, ButtonGroup, CircularProgress } from '@material-ui/core';
import { count, info } from 'console';
import { REACT_APP_API_URL } from 'constants/app.constants';
import useGetFetchData from 'custom-hooks/useGetFetchData';
import * as _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { capitalizeFirstLetter } from 'utils/capitalizeLetter';

import CustomButton from '../../ui-components/button';
import useStyles from './AddToCart.css';

export interface InfoCart {
    articulo: string;
    setDataProduct: Function;
    addProduct: Function;
}

export function AddToCart(props: InfoCart) {
    console.log(props)
    const styles = useStyles();
    const [counter, setCounter] = useState(1);
    const [disableCounter, setDisableCounter] = useState(false);

    const [infoData, setInfoData]: any = useState({});
    const [productInfoData, productInfoDataLoading]: any = useGetFetchData(
        `${REACT_APP_API_URL}/articulocliente/${props.articulo}`
    );

    useEffect(() => {
        if (productInfoDataLoading === false) {
            setInfoData(productInfoData);
            props.setDataProduct(productInfoData);
        }
    }, [productInfoDataLoading]);

    useEffect(() => {
        if (counter <= 1) {
            setDisableCounter(true);
        }else{
            setDisableCounter(false)
        }
    }, [counter])

    const handleIncrement = () => {
        setCounter(counter + 1);
    };

    const handleDecrement = () => {
        setCounter(counter - 1);
    };

    const toFixPrice = (price: number) => {
        if(price) return price.toFixed(2);

        return 0
    }

    return (
        <div>
            {!_.isEmpty(infoData) ? (
                <>
                    <div className={styles.root}>
                        <h1 className={styles.title}>
                            {capitalizeFirstLetter(infoData.Nombre)}
                        </h1>
                        <div className={styles.priceBox}>
                            <span className={styles.price}>
                                {`$ ${ toFixPrice(_.get(infoData.precio[0], 'PrecioIVA'))}`}
                            </span>
                            <span>* Precio exclusivo de tienda en línea.</span>
                            <span>* Producto sujeto a disponibilidad.</span>
                        </div>
                        <div>
                            <ButtonGroup
                                size="small"
                                aria-label="small outlined button group"
                            >
                                <Button
                                    disabled={disableCounter}
                                    onClick={handleDecrement}
                                >
                                    -
                                </Button>
                                <Button>{counter}</Button>
                                <Button onClick={handleIncrement}>+</Button>
                            </ButtonGroup>
                        </div>
                        <CustomButton
                            title="Añadir al carrito"
                            onClick={() => { props.addProduct(counter)}}
                            color="deepGreen"
                        ></CustomButton>
                    </div>
                </>
            ) : (
                <CircularProgress />
            )}
        </div>
    );
}
