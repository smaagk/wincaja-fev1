import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProductCard from './ui-components/product-card/product-card';
import mockData from '../static/mock-data.json'
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
  return (
    <div className={classes.container}>
      {mockData.map((data)=>{
		  return <ProductCard key={`${data.img}${data.name}`} data={data}/>
	  })}
    </div>
  );
}

export default Home;
