import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import ProductCard from './ui-components/product-card/product-card';
import useGetFetchData from '../custom-hooks/useGetFetchData';
import useDebounce from '../custom-hooks/useDebounce';

import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        WebkitFlexWrap: 'wrap',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '90%',
        margin: 'auto'
    },
}));

const { REACT_APP_API_URL } = process.env;

function Home() {
    const classes = useStyles();
    const { searchValue } = useSelector((state: RootState) => state.search);
    const debouncedSearchTerm = useDebounce(searchValue, 1000);
    const [params, setParams] = useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [productsData, productsLoading]: any = useGetFetchData(
        `${REACT_APP_API_URL}/articulos`,
        params
    );
    const [dataProduct, setDataProduct] = useState([]);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
        setParams({ ...params, currentPage: newPage });
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        if (!productsLoading && REACT_APP_API_URL !== null) {
            if (productsData.success) {
                console.log(productsData);
                setDataProduct(mapProducts(productsData.rows));
            }
        }
    }, [productsLoading]);

    useEffect(() => {
        setParams({ ...params, phrase: debouncedSearchTerm });
    }, [debouncedSearchTerm]);

    function mapProducts(products: any) {
        return products.map((product: any) => {
            return {
                articulo: product.articulo,
                name: product.nombre,
                description: product.descripcion,
                img: product.img,
                price: Math.random() * 1000,
            };
        });
    }

    return (
        <div>
            {dataProduct.length > 0 ? (
                <>
                    <div className={classes.container}>
                        {dataProduct.map((data: any) => {
                            return (
                                <ProductCard
                                    key={`${data.img}${data.name}`}
                                    data={data}
                                />
                            );
                        })}
                    </div>
                    <br />
                    <TablePagination
                        component="div"
                        count={100}
                        page={page}
                        onChangePage={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </>
            ) : (
                <CircularProgress />
            )}
        </div>
    );
}

export default Home;
