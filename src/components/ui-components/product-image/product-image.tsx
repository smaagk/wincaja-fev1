import { VITE_API_URL } from 'constants/app.constants';
import useGetFetchData from 'custom-hooks/useGetFetchData';
import React, { useEffect, useState } from 'react';

import noimage from '../../../static/noimage.png';

export function ProductImage({ idProduct }: any) {
    const [image, imageLoading]: any = useGetFetchData(
        `${VITE_API_URL}/image/${idProduct}`
    );
    const [imageData, setImageData] : any = useState();

    useEffect(() => {
        if (image.success === true) {
            setImageData(image.location);
        } else if (image.success === false){
            setImageData(noimage);
        }
    }, [image]);

    return (
        <div>
            <img
                src={imageData}
                alt="Product"
                style={{ width: '100px', height: '100px' }}
            ></img>
        </div>
    );
}
