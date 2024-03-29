/* eslint-disable react-hooks/exhaustive-deps */
import { MenuItem } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { Link,Route } from 'react-router-dom';

import useCustomFetch from '../../../custom-hooks/useCustomFetch';
import useDebounce from '../../../custom-hooks/useDebounce';
import useGetFetchData from '../../../custom-hooks/useGetFetchData';
import { SimpleSearchComponent } from '../../ui-components';
import ImageProductComponent from '../../ui-components/image-product/image-product';

const columns = [
    { id: 'articulo', label: 'Articulo', minWidth: 170 },
    { id: 'nombre', label: 'Nombre', minWidth: 100 },
    { id: 'imagen', label: 'Imagen', minWidth: 50 },
];

const useStyles = makeStyles({
    root: {
        width: '90%',
        margin: 'auto',
    },
    container: {
        maxHeight: 700,
    },
    imgContainer: {
        display: 'flex',
    },
});
const { REACT_APP_API_URL } = process.env;

export default function Productos() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [totalRows, setTotalRows] = useState(0);
    const [params, setParams] = useState({});
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState([]);
    const [productSelected, setProductSelected] = useState({});
    const [productsData, productsLoading] = useGetFetchData(
        `${REACT_APP_API_URL}/adminarticulos`,
        params
    );
    // eslint-disable-next-line no-unused-vars
    const [productUpdated, productUpdatedLoading] = useCustomFetch(
        `${REACT_APP_API_URL}/articulo_online`,
        productSelected
    );

     const { simpleSearchValue } = useSelector((state) => state.search);
     const debouncedSearchTerm = useDebounce(simpleSearchValue, 1000);

    useEffect(() => {
        setParams({ ...params, phrase: debouncedSearchTerm, almacen: 0 });
    }, [debouncedSearchTerm]);

    useEffect(() => {
        if (!productsLoading && REACT_APP_API_URL !== null) {
            if (productsData.success) {
                setMetaPagination(productsData);
            }
        }
    }, [productsLoading]);

    const setMetaPagination = (productsData) => {
        setProducts(productsData.rows);
        setTotalRows(productsData.meta.count);
        setRowsPerPage(productsData.meta.pageSize);
        setPage(productsData.meta.currentPage - 1);
        setOnlineEnabled(productsData.rows);
    };

    const setOnlineEnabled = (products) => {
        const productsOnline = products
            .filter((product) => product.ventalinea)
            .map((product) => product.articulo);
        setSelected(productsOnline);
    };

    const handleChangePage = (event, newPage) => {
        setParams({ currentPage: newPage + 1, pageSize: rowsPerPage });
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setParams({ currentPage: 1, pageSize: event.target.value });
        setPage(0);
    };

    const isSelected = (articulo) => selected.indexOf(articulo) !== -1;

    const handleProductSelect = (event, articulo) => {
        const selectedIndex = selected.indexOf(articulo);
        let newSelected = [];
        setProductSelected({ articulo });
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, articulo);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    return (
        <div>
          <br/>
            <SimpleSearchComponent />
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ minWidth: 170 }}>
                                    Venta en linea
                                </TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((row) => {
                                const isItemSelected = isSelected(row.articulo);

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.articulo}
                                        aria-checked={isItemSelected}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                                onClick={(event) =>
                                                    handleProductSelect(
                                                        event,
                                                        row.articulo
                                                    )
                                                }
                                            />
                                        </TableCell>
                                        {columns.map((column) => {
                                            if (column.id === 'imagen') {
                                                return (
                                                    <TableCell
                                                        className={
                                                            classes.imgContainer
                                                        }
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        <ImageProductComponent
                                                            articulo={
                                                                row.articulo
                                                            }
                                                            imgUrl={row.img}
                                                        />
                                                        <MenuItem
                                                            component={Link}
                                                            to={`/admin/producto/${row.articulo}`}
                                                        >
                                                            Imagenes
                                                        </MenuItem>
                                                    </TableCell>
                                                );
                                            } else {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        {column.format &&
                                                        typeof value ===
                                                            'number'
                                                            ? column.format(
                                                                  value
                                                              )
                                                            : value}
                                                    </TableCell>
                                                );
                                            }
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[20, 40, 100]}
                    component="div"
                    count={totalRows}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
