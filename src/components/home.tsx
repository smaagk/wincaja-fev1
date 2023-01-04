import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import * as _ from 'lodash';
import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

import useDebounceSearch from '../custom-hooks/useDebounce';
import useGetFetchData from '../custom-hooks/useGetFetchData';
import { CategoriesSearch } from './categories-search/CategoriesSearch';
import ProductCard from './ui-components/product-card/product-card';
import Almacenes from './almacen/select-almacen';
import { Prices } from 'interfaces/prices.interfaces';

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

const { VITE_API_URL } = import.meta.env;

function Home() {
    const classes = useStyles();
    const { simpleSearchValue } = useSelector((state: RootState) => state.search);
    const { almacen } = useSelector((state: RootState) => state.almacen);
    const debouncedSearchTerm = useDebounceSearch(simpleSearchValue, 1000);
    const [params, setParams]: any = useState({almacen: almacen });
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [productsData, productsLoading]: any = useGetFetchData(
        `${VITE_API_URL}/articulos`,
        params
    );
  
    const [paramsAutocomplete, setParamsAutocompleteParams] = useState({});

    const [dataProduct, setDataProduct] = useState([]);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
        console.log(rowsPerPage);
    };

    useEffect(() => {
        setParams({ ...params, currentPage: page, pageSize: rowsPerPage });
        console.log(params);
    } , [page, rowsPerPage]);

    useEffect(() => {
        if (!productsLoading && VITE_API_URL !== null) {
            if (productsData.success) {
                setDataProduct(mapProducts(productsData.rows));
                setCount(productsData.meta.count);
            }
        }
    }, [productsLoading, productsData]);

    useEffect(() => {
        if(debouncedSearchTerm) {
            setParams((prevParams: any) => ({ ...prevParams, phrase: debouncedSearchTerm }));
        }
    }, [debouncedSearchTerm]);

    useEffect(() => {
        if(almacen) {
            setParams((prevParams: any) => ({ ...prevParams, almacen: almacen }));
        }
    }, [almacen]);

    function mapProducts(products: any) {
        return products.map((product: any) => {
                return {
                    articulo: product.articulo,
                    name: product.nombre,
                    description: product.descripcion,
                    img: product.img?.location,
                    price: getTheFirstPrice(product.precio),
                    existencia: product['existencia.ExActual'],
                    prices: product.precio,
                };
        }).filter((product: any) => product.existencia > 0); 
    }

    function getTheFirstPrice(prices: Prices[]) {
        console.log(prices);
        if (!_.isEmpty(prices)) {
            // find the price with the lowest CantidadAutomatico
            console.log(prices);
            const price = _.minBy(prices, (price: Prices) => price.CantidadAutomatico);
            return price?.PrecioIVA;
        }

        return 0;
    }

    return (
        <div>
            <Almacenes />
            <CategoriesSearch/>
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
                        count={count}
                        page={page}
                        labelRowsPerPage="Productos por página"
                        rowsPerPage={rowsPerPage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        onPageChange={handleChangePage}
                    />
                </>
            ) : (
                <CircularProgress />
            )}
        </div>
    );
}

export default Home;
