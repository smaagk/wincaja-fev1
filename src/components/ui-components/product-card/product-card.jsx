import React, { FC, useState, useEffect } from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Button from '../button';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN01TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n01';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import noimage from '../../../static/noimage.png';
import useStyles from './product-card.css';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { arrayBufferToBase64 } from '../../../utils/arrrayToBuffer';

function ProductCard(props) {
  const store = useSelector((state) => state.cart);
  const cardStyles = useStyles();
  const wideCardMediaStyles = useWideCardMediaStyles();
  const fadeShadowStyles = useFadedShadowStyles();
  const textCardContentStyles = useN01TextInfoContentStyles();
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
      articulo: `${props.data.name}`,
      img: props.data.img,
      name: props.data.name,
      description: props.data.description,
      price: props.data.price,
    });

    const image =
      props.data.img !== null
        ? 'data:image/png;base64,' +
          arrayBufferToBase64(props.data.img.Body.data)
        : noimage;
    setImgSrc(image);
  }, []);

  function handleAddProduct() {
    if (
      store.cart.findIndex((x) => x.articulo === dataProduct.articulo) === -1
    ) {
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
  }

  return (
    <Card className={cx(cardStyles.root, fadeShadowStyles.root)}>
      <CardMedia
        // component={'img'} // add this line to use <img />
        classes={wideCardMediaStyles}
        image={imgSrc}
      >
        <div className={cardStyles.chip}>
          <Chip
            icon={
              <AttachMoneyIcon style={{ color: 'white', marginLeft: 10 }} />
            }
            style={{ backgroundColor: '#08b108', color: 'white' }}
            label={dataProduct.price}
          />
        </div>
      </CardMedia>

      <CardContent className={cardStyles.content}>
        <TextInfoContent
          classes={textCardContentStyles}
          heading={dataProduct.name}
          body={dataProduct.description}
        />
      </CardContent>
      <Box px={3} pb={3}>
        <Button title="Añadir al carrito" onClick={handleAddProduct} color='deepGreen'></Button>
      </Box>
    </Card>
  );
}

export default ProductCard;
