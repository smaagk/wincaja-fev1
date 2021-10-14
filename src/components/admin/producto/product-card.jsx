import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DeleteIcon from '@material-ui/icons/Delete';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import DotIndicator from '@mui-treasury/components/indicator/dot';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { useN01TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n01';
import cx from 'clsx';
import React, { FC, useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useDeleteFetch from '../../../custom-hooks/useDelete';
import useGetFetchData from '../../../custom-hooks/useGetFetchData';
import useUploadFile from '../../../custom-hooks/useUploadFile';
import noimage from '../../../static/noimage.png';
import { arrayBufferToBase64 } from '../../../utils/arrrayToBuffer';
import Button from '../../ui-components/button';
import ImageProductDialog from '../../ui-components/image-product/image-product-dialog/image-product-dialog';
import useStyles from './prodruct-card-admin.css';

const { REACT_APP_API_URL } = process.env;

function ProductAdminCard(props) {
    const store = useSelector((state) => state.cart);
    const cardStyles = useStyles();
    const wideCardMediaStyles = useWideCardMediaStyles();
    const fadeShadowStyles = useFadedShadowStyles();
    const textCardContentStyles = useN01TextInfoContentStyles();
    const dispatch = useDispatch();
    const [productsData, productsLoading] = useGetFetchData(
        `${REACT_APP_API_URL}/articulos/${props.articulo}`
    );
    const [getProductosCallback, setGetProductosCallback] = useState(true);
    const [productsData2, productsLoading2] = useGetFetchData(
        `${REACT_APP_API_URL}/admindetallearticulo/${props.articulo}`,
        getProductosCallback
    );
    const [dataProduct, setDataProduct] = useState(null);

    const [imgSrc, setImgSrc] = useState('');
    const [indexImg, setIndexImg] = useState(0);

    const [imageToDelete, setImageToDelete] = useState(null);
    const [deletedImage, deleteImageLoading] = useDeleteFetch(
        `${REACT_APP_API_URL}/image`,
        imageToDelete
    );

    const [isOpen, setIsOpen] = useState(false);
    const [dataImage, setDataImage] = useState([]);

    const [
        image_upload,
        image_upload_loading,
        image_upload_error,
    ] = useUploadFile(
        `${REACT_APP_API_URL}/upload-image`,
        dataImage,
        productsData.articulo
    );

    useEffect(() => {
        if (productsLoading === false) {
            console.log(productsData);         
        }
    }, [productsLoading]);

    useEffect(() => {
        if (productsLoading2 === false) {
            console.log(productsData2);
            setDataProduct({
                articulo: `${productsData2.id}`,
                img: [productsData2.image],
                gallery: productsData2.gallery,
                name: productsData2.title,
                description: productsData2.descripcion,
                price: 123,
            });

            if(productsData2.gallery.length < 2) {
                setImageInCard(0);
            }

            setGetProductosCallback(false)
        }
    }, [productsLoading2]);

    useEffect(() => {
        if (productsData2.gallery?.length > 0) {
            setImageInCard(indexImg);
        }
    }, [indexImg]);

    useEffect(() => {
        if (dataProduct) {
            console.log(dataProduct)
        }
    }, [dataProduct]);

    useEffect(() => {
        if( image_upload === 'imagen creada'){
            setGetProductosCallback(true);
        }
    }, [image_upload_loading])

    useEffect(() => {
        if (deletedImage?.msg === 'borrando imagen') {
            console.log('borrando de imagenes')
            setGetProductosCallback(true);
            setImageInCard(indexImg-1);       
        }
    }, [deleteImageLoading])

    function setImageInCard(index) {
        
        if(productsData2.gallery) {
            const image =
            productsData2.image !== undefined
                ? productsData2?.gallery[index]?.url
                : noimage;
                console.log(image)
            setImgSrc(image);
        }
    }

    function handleDeleteImage() {
        console.log('voy a borrar ', indexImg)
        setImageToDelete({ key: productsData2.gallery[indexImg].key });
    }

    function handleDialogClose() {
        setIsOpen(false);
    }

    function handleDialogOpen() {
        setIsOpen(true);
    }

    function handleSave(e) {
        setDataImage(e[0]);
        setIsOpen(false);
    }

    return (
        <div>
            {dataProduct !== null ? (
                <div>
                    <Card
                        className={cx(cardStyles.root, fadeShadowStyles.root)}
                    >
                        <CardMedia classes={wideCardMediaStyles} image={imgSrc}>
                            { productsData2?.image?.length > 0 ? (<div className={cardStyles.chip}>
                                <Chip
                                    icon={
                                        <DeleteIcon
                                            style={{
                                                color: 'white',
                                                marginLeft: 10,
                                            }}
                                        />
                                    }
                                    style={{
                                        backgroundColor: '#F44336',
                                        color: 'white',
                                    }}
                                    label={`Borrar imagen`}
                                    onClick={handleDeleteImage}
                                />
                            </div>) : <></> }
                        </CardMedia>
                        {dataProduct?.gallery?.map((val,index) => (
                            <DotIndicator
                                key={index}
                                active={index === indexImg}
                                onClick={() => setIndexImg(index)}
                            />
                        ))}
                        <CardContent className={cardStyles.content}>
                            <TextInfoContent
                                classes={textCardContentStyles}
                                heading={dataProduct.name}
                                body={dataProduct.description}
                            />
                        </CardContent>
                        <Box px={3} pb={3}>
                            <Button
                                title="Añadir imagen"
                                color="deepGreen"
                                onClick={handleDialogOpen}
                            ></Button>
                        </Box>
                    </Card>
                    <ImageProductDialog
                        isOpen={isOpen}
                        handleClose={handleDialogClose}
                        handleSave={handleSave}
                    />
                </div>
            ) : (
                <div>Cargando info</div>
            )}
        </div>
    );
}

export default ProductAdminCard;
