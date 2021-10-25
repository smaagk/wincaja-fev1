import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import cx from 'clsx';
import { useSnackbar } from 'notistack';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import noimage from '../../../static/noimage.png';
import { arrayBufferToBase64 } from '../../../utils/arrrayToBuffer';
import { successSnackbar } from '../../../utils/snackbar.utils';
import { TextContentComponent } from '../../ui-components';
import Button from '../button';
import useStyles from './product-card.css';

function ProductCard(props) {
    const history = useHistory();
    const store = useSelector((state) => state.cart);
    const cardStyles = useStyles();
    const wideCardMediaStyles = useWideCardMediaStyles();
    const fadeShadowStyles = useFadedShadowStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const [dataProduct, setDataProduct] = useState({
        articulo: '',
        img: noimage,
        name: 'Nombre Articulo',
        description: 'description',
        price: 1234,
    });

    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        setDataProduct({
            articulo: `${props.data.articulo}`,
            img: props.data.img,
            name: props.data.name,
            description: props.data.description,
            price: props.data.price,
        });

        const image =
            props.data.img !== undefined
                ? props.data.img
                : noimage;
        setImgSrc(image);
    }, []);

    function handleAddProduct() {
        if (store.cart.findIndex((x) => x.articulo === dataProduct.articulo) === -1) {
            dispatch({
                type: 'ADDPRODUCT',
                payload: dataProduct,
            });
        } else {
            dispatch({
                type: 'ADDQUANTITY',
                payload: dataProduct,
            });
        }

        enqueueSnackbar('Producto añadido al carrrito', successSnackbar);
    }

    function goToProduct() {
        history.push(`/tienda/producto/${dataProduct.articulo}`)
    }

    return (
        <Card className={cx(cardStyles.root, fadeShadowStyles.root)}>
            <>
                {imgSrc ? (
                    <CardMedia
                        // component={'img'} // add this line to use <img />
                        className={cardStyles.img}
                        image={imgSrc}
                        onClick={goToProduct}
                    ></CardMedia>
                ) : (
                    <CircularProgress />
                )}
            </>
            <CardContent className={cardStyles.content}>
                <TextContentComponent
                    title={dataProduct.name}
                    description={dataProduct.description}
                />
            </CardContent>
            <Box px={3} pb={3}>
                <div className={cardStyles.chip}>
                    <Chip
                        icon={
                            <AttachMoneyIcon
                                style={{ color: 'white', marginLeft: 10 }}
                            />
                        }
                        className={cardStyles.priceChip}
                        label={`${dataProduct.price.toFixed(2)}`}
                    />
                </div>
                <Button
                    title="Añadir al carrito"
                    onClick={handleAddProduct}
                    color="deepGreen"
                ></Button>
            </Box>
        </Card>
    );
}

export default ProductCard;
