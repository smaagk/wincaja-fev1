import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';

import ProductCard from './ui-components/product-card/product-card';
import useGetFetchData from '../custom-hooks/useGetFetchData';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        WebkitFlexWrap: 'wrap',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
}));

function Home() {
    const classes = useStyles();
    const apiUrl = 'http://localhost:5001/api';
    const [params, setParams] = useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [productsData, productsLoading]: any = useGetFetchData(
        `${apiUrl}/articulos`,
        params
    );
    const [dataProduct, setDataProduct] = useState([]);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
        setParams({...params, currentPage: newPage})
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        if (!productsLoading && apiUrl !== null) {
            if (productsData.success) {
                console.log(productsData);
                setDataProduct(mapProducts(productsData.rows));
            }
        }
    }, [productsLoading]);

    function mapProducts(products: any) {
        return products.map((product: any) => {
            return {
                name: product.articulo,
                description: product.descripcion,
                img: product.img,
                price: Math.random() * 1000,
            };
        });
    }

    return (
        <div className={classes.container}>
            {dataProduct.map((data: any) => {
                return (
                    <ProductCard key={`${data.img}${data.name}`} data={data} />
                );
            })}
            <br/>
            <TablePagination
                component="div"
                count={100}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default Home;
