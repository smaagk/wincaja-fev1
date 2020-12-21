import React, { FC, useState, useEffect } from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '../../ui-components/button';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN01TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n01';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import noimage from '../../../static/noimage.png';
import useStyles from './prodruct-card-admin.css';
import { useDispatch, useSelector } from 'react-redux';
import useGetFetchData from '../../../custom-hooks/useGetFetchData';
import useDeleteFetch from '../../../custom-hooks/useDelete';
import useUploadFile from '../../../custom-hooks/useUploadFile';
import DotIndicator from '@mui-treasury/components/indicator/dot';
import { arrayBufferToBase64 } from '../../../utils/arrrayToBuffer';
import ImageProductDialog from '../../ui-components/image-product/image-product-dialog/image-product-dialog';

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
            console.log(productsData)
            setDataProduct({
                articulo: `${productsData.articulo}`,
                img: productsData.img,
                name: productsData.nombbre,
                description: productsData.descripcion,
                price: 123,
            });

            setImageInCard(0);
        }
    }, [productsLoading]);

    useEffect(() => {
        if (productsData.img !== undefined) {
            setImageInCard(indexImg);
        }
    }, [indexImg]);

    function setImageInCard(index) {
        const image =
            productsData.img[index] !== undefined
                ? 'data:image/png;base64,' +
                  arrayBufferToBase64(productsData.img[index].data.Body.data)
                : noimage;

        setImgSrc(image);
    }

    function handleDeleteImage() {
        setImageToDelete({ key: productsData.img[indexImg].key });
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
                            <div className={cardStyles.chip}>
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
                            </div>
                        </CardMedia>
                        {dataProduct.img.map((val,index) => (
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
