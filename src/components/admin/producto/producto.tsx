import React from 'react';
import Precios from '../precios/precios.js';

import ProductAdminCard from './product-card.jsx';

function Producto(props: any) {
    return (
        <div>
            <ProductAdminCard articulo={props.match.params.articulo} />
            <Precios articulo={props.match.params.articulo}/>
        </div>
    );
}

export default Producto;
