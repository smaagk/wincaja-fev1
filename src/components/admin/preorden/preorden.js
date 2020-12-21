/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useState, useEffect } from 'react';
import useGetFetchData from '../../../custom-hooks/useGetFetchData';
import useCustomFetch from '../../../custom-hooks/useCustomFetch';
import Button from '../../ui-components/button';
import { formatCurrency } from '../../../utils/currency';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { errorSnackbar, successSnackbar } from '../../../utils/snackbar.utils';




const columns = [
    { id: 'id', label: 'Id de preorden' },
    { id: 'articulo', label: 'Nombre del articulo' },
    { id: 'PrecioVenta', label: 'Precio de venta' },
    { id: 'Cantidad', label: 'Cantidad' },
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
        display: 'flex'
    },
    menu: {
        background: '#5aae5e',
        color: 'white',
        display: 'inline-block',
        "&:hover": {
            background: '#1c7f21',
            color: 'white'
        }
    }
});

const { REACT_APP_API_URL } = process.env;

export default function Preorden(props) {
    const perorderID = props.match.params.preorden
    let history = useHistory();
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [totalRows, setTotalRows] = useState(0);
    const [params, setParams] = useState({});
    const [preorden, setPreorden] = useState([]);
    const [selected, setSelected] = useState([]);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [preordenParams, setPreordenParams] = useState({});
    const [preordenData, preordenLoading] = useGetFetchData(
        `${REACT_APP_API_URL}/preorden/${perorderID}`,
        params
    );
    // eslint-disable-next-line no-unused-vars
    const [preordenUpdated, preordenUpdatedLoading] = useCustomFetch(
        `${REACT_APP_API_URL}/preordenestatus`,
        preordenParams
    );

    useEffect(() => {
        if (!preordenLoading && REACT_APP_API_URL !== null) {
            if (preordenData.success) {
                console.log(preordenData)
                setPreorden(preordenData.detalles);
            }
        }
    }, [preordenLoading]);

    useEffect(() => {
        if (!preordenUpdatedLoading && preordenUpdated) {
            if (preordenUpdated.success === true) {
                enqueueSnackbar(
                    preordenUpdated.msg,
                    successSnackbar
                );
            }
        }
    }, [preordenUpdatedLoading]);


    const confirmPreOrder = () => {
        setPreordenParams({id: perorderID, estatus: 'CONFIRMADA'});
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

    const getPreorden = (id) => {
        history.push(`/admin/preorden/${id}`);
    }

    return (
        <>
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
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
                        {preorden.map((row) => {
                            console.log(row);

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.id}
                                >
                                    {columns.map((column) => {
                                        if (column.id === 'articulo') {
                                            console.log(row.articulo.nombre)
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {row.articulo.nombre}
                                                </TableCell>
                                            );
                                        } else if (column.id === 'PrecioVenta') {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {formatCurrency(row.PrecioVenta)}
                                                </TableCell>
                                            )
                                        } else {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
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

            <br></br>
        </Paper>
         <Button
         title="Confirmar orden"
         color="deepGreen"
         onClick={confirmPreOrder}
     ></Button></>
    );
}
