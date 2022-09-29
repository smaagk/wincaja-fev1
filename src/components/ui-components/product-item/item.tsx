/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, ButtonGroup, Card, CardMedia } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import { REACT_APP_API_URL } from 'constants/app.constants';
import useGetFetchData from 'custom-hooks/useGetFetchData';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { arrayBufferToBase64 } from 'utils/arrrayToBuffer';

import noimage from '../../../static/noimage.png';
import { formatCurrency } from '../../../utils/currency';
import useStyles from './item.css';

export type ItemI = {
    articulo?: string;
    img: any;
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
    const [imgSrc, setImgSrc] = useState('');


    const [image, imageLoading]: any = useGetFetchData(
        `${REACT_APP_API_URL}/image/${data.articulo}`
    );
    const [imageData, setImageData] : any = useState();

    useEffect(() => {
        if (image.success === true && image.location) {
            setImageData(image.location);
        } else {
            setImageData(noimage);
        }
    }, [image]);

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
    };
    const displayCounter = counter > 0;
    return (
        <>
            {imageData ? (
                <Card elevation={3} className={itemStyles.root}>
                    <Box
                        className={itemStyles.itemContainer}
                        component="div"
                        m={1}
                    >
                        <CardMedia
                            className={itemStyles.image}
                            image={imageData}
                        ></CardMedia>
                        <p
                            className={`${itemStyles.marginItem} ${itemStyles.name}`}
                        >
                            {data.name}
                        </p>
                        <Box
                            className={`${itemStyles.marginItem} ${itemStyles.price}`}
                            component="span"
                        >
                            {price}
                        </Box>
                        <ButtonGroup
                            size="small"
                            aria-label="small outlined button group"
                        >
                            {displayCounter && (
                                <Button onClick={handleDecrement}>-</Button>
                            )}
                            {displayCounter && (
                                <Button className={itemStyles.qty}>
                                    {counter}
                                </Button>
                            )}
                            <Button onClick={handleIncrement}>+</Button>
                        </ButtonGroup>
                        <DeleteIcon
                            onClick={handleDelete}
                            className={itemStyles.marginItem}
                        />
                        <Box
                            className={`${itemStyles.marginItem} ${itemStyles.price}`}
                            component="span"
                        >
                            Total: {totalProduct}
                        </Box>
                    </Box>
                </Card>
            ) : (
                <CircularProgress />
            )}
        </>
    );
};

export default Item;
