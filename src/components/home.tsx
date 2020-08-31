import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProductCard from './ui-components/product-card/product-card';
import mockData from '../static/mock-data.json'
import useGetFetchData from '../custom-hooks/useGetFetchData';
import { arrayBufferToBase64 } from '../utils/arrrayToBuffer';

const useStyles = makeStyles(() => ({
  container: {
	display: 'flex',
	WebkitFlexWrap: 'wrap',
	flexWrap: 'wrap',
	justifyContent: 'center'
  }
}));

function Home() {
  const classes = useStyles();
  const apiUrl = 'http://localhost:5001/api';
  const [params, setParams] = useState({});
  const [productsData, productsLoading] : any= useGetFetchData(
    `${apiUrl}/articulos`,
    params
  );
  const [dataProduct,setDataProduct] = useState([])

  useEffect(() => {
    if (!productsLoading && apiUrl !== null) {
      if (productsData.success) {
        setDataProduct(mapProducts(productsData.rows))
      }
    }
  }, [productsLoading]);

  function mapProducts(products : any){
    return products.map((product: any) => {
      return {
        name : product.articulo,
        description : product.descripcion,
        img: product.img,
        price: Math.random() * 1000
      }
    })
  }

  return (
    <div className={classes.container}>
      {dataProduct.map((data :any)=>{
		  return <ProductCard key={`${data.img}${data.name}`} data={data}/>
	  })}
    </div>
  );
}

export default Home;
