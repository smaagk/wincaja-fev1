import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Card, CardMedia, CircularProgress } from '@material-ui/core';
import { REACT_APP_API_URL } from 'constants/app.constants';
import useGetFetchData from 'custom-hooks/useGetFetchData';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { arrayBufferToBase64 } from 'utils/arrrayToBuffer';

import useStyles from './product-images.css';

interface IProductImage {
    articulo: string;
    onImage: Function;
}

interface S3Image {
    key: string;
    data: {
        AcceptRanges: string;
        LastModified: Date;
        ContentLength: number;
        ETag: string;
        ContentType: string;
        Metadata: {
            fieldname: string;
        };
        Body: {
            type: string;
            data: number[];
        };
    };
}

export function ProductImages(props: IProductImage) {
    const productImageStyles = useStyles();
    const [imageData, setImageData] = useState([]);
    const [productImagesData, productImagesDataLoading]: any = useGetFetchData(
        `${REACT_APP_API_URL}/images/${props.articulo}`
    );
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        if (productImagesDataLoading === false  && productImagesData.length > 0) {
            setImageData(
                productImagesData.map((img: S3Image) => {
                    return `data:image/png;base64,${arrayBufferToBase64(
                        img.data.Body.data
                    )}`;
                })
            );
        }
    }, [productImagesDataLoading]);

    useEffect(() => {
        if(imageData.length > 0){
            props.onImage(productImagesData[0].data);
        }
    }, [imageData]);

    return (
        <>
            {imageData.length > 0 ? (
                <div className={productImageStyles.root}>
                    <div>
                        <Slider {...settings}>
                            {imageData.map((img, index) => {
                                return (
                                    <Card key={index} elevation={3} >
                                        <CardMedia
                                            className={productImageStyles.media}
                                            image={img}
                                            title="Contemplative Reptile"
                                        />
                                    </Card>
                                );
                            })}
                        </Slider>
                    </div>
                </div>
            ) : (
                <CircularProgress/>
            )}
        </>
    );
}
