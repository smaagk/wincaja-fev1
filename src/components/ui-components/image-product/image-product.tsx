import React, { FC, useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AddPhotoAlternateTwoToneIcon from '@material-ui/icons/Image';
import ImageProductDialog from './image-product-dialog/image-product-dialog';
import useUploadFile from '../../../custom-hooks/useUploadFile';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  })
);
const { REACT_APP_API_URL } = process.env;


type ImageType = {
  imgUrl?: any;
  articulo: string;
};

const ImageProductComponent: FC<ImageType> = ({
  imgUrl,
  articulo,
}: ImageType) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [dataImage, setDataImage] = useState([]);
  const [imgSrc, setImgSrc] = useState('');
  const [
    image_upload,
    image_upload_loading,
    image_upload_error,
  ] = useUploadFile(`${REACT_APP_API_URL}/upload-image`, dataImage, articulo);

  useEffect(() => {
    console.log(articulo);
    if (imgUrl !== null) {
      const image = arrayBufferToBase64(imgUrl.Body.data);
      setImgSrc('data:image/png;base64,' + image);
    }
  }, []);

  function arrayBufferToBase64(buffer: Iterable<number>) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  function handleDialogClose() {
    setIsOpen(false);
  }

  function handleDialogOpen() {
    setIsOpen(true);
  }

  function handleSave(e: any) {
    setDataImage(e[0]);
  }

  return (
    <div className={classes.root}>
      {imgUrl !== undefined ? (
        <Avatar alt={articulo} src={imgSrc} onClick={handleDialogOpen} />
      ) : (
        <Avatar onClick={handleDialogOpen}>
          <AddPhotoAlternateTwoToneIcon />
        </Avatar>
      )}
      <ImageProductDialog
        isOpen={isOpen}
        handleClose={handleDialogClose}
        handleSave={handleSave}
      />
    </div>
  );
};

export default ImageProductComponent;
