import React from 'react';
import ProductAdminCard from './product-card.jsx';

function Producto(props: any) {
    return (
        <div>
            <ProductAdminCard articulo={props.match.params.articulo} />
        </div>
    );
}

export default Producto;
