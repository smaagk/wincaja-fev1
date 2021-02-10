import { Match } from '@testing-library/react'
import { ProductImages } from 'components/ui-components'
import { OptionsObject, useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { RootState } from 'store'

import noimage from '../../static/noimage.png';
import { successSnackbar } from '../../utils/snackbar.utils'; 
import { AddToCart } from './AddToCart/AddToCart'
import useStyles from './product-details.css'

interface MatchParams {
    articulo: string;
}

function ProductDetailsComponent(props: RouteComponentProps<MatchParams>) {
    const store: any = useSelector((state: RootState) => state.cart);
    const styles = useStyles();
    const [image, setImage] = useState('');
    const [dataProduct, setDataProduct] = useState({
        articulo: '',
        img: noimage,
        Nombre: 'Nombre Articulo',
        Descripcion: 'description',
        precio: [{Precio: 0}],
    });

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const [_dataProduct, setProduct] = useState({});

    const [imgSrc, setImgSrc] = useState('');
    const [qty, setQty] = useState(0);

    useEffect(() => {
        setProduct({
            articulo: `${dataProduct.articulo}`,
            img: image,
            name: dataProduct.Nombre,
            description: dataProduct.Descripcion,
            price: dataProduct.precio[0] && dataProduct.precio[0].Precio | 0,
        });

    }, [image, dataProduct]);

    useEffect(()=>{
        console.log(_dataProduct)
    },[_dataProduct])

    function handleAddProduct(qty: number) {
        console.log(qty)
        if ( store.cart.findIndex((x: { articulo: string }) => x.articulo === dataProduct.articulo) === -1) {
            dispatch({
                type: 'ADDPRODUCTQUANTITY',
                payload: { product: _dataProduct, qty : qty},
            });
        } else {
            console.log("El producto no esta en el carrito")
            dispatch({
                type: 'ADDQUANTITYNUMBER',
                payload: { product: _dataProduct, qty : qty},
            });
        }

        enqueueSnackbar('Producto añadido al carrrito', successSnackbar as OptionsObject);
    }
    
    return (
        <div className={styles.root}>
            <ProductImages articulo={props.match.params.articulo} onImage={setImage} />
            <AddToCart articulo={props.match.params.articulo} setDataProduct={setDataProduct} addProduct={handleAddProduct} />
        </div>
    )
}

export default ProductDetailsComponent
