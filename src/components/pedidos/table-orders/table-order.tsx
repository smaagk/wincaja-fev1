import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { ProductImage } from 'components/ui-components/product-image/product-image';
import { REACT_APP_API_URL, REACT_APP_API2_URL } from 'constants/app.constants';
import useGetFetchData from 'custom-hooks/useGetFetchData';
import { articulosPedido } from 'interfaces/atriculos.interfaces';
import { openpaytransaction } from 'interfaces/openpay.interface';
import React, { useState } from 'react';
import { useEffect } from 'react';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        }
    },
});

function createData(
    idOrder: string,
    orderDate: number,
) {
    return {
        idOrder,
        orderDate,
        products: [
            { date: '2020-01-05', id: '11091700', name: 'ejemplo', amount: 3, total: 456 },
            { date: '2020-01-02', id: 'Anonymous', name: 'ejemplo1', amount: 1, total: 123 },
        ],
    };
}

function Row(props: { row: any }) {
    const { row } = props;
    console.log(row);
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const [openPayData, openPayDataLoading]: any = useGetFetchData(
        `${REACT_APP_API_URL}/transactiondetails/${row.idOpenPayTransaction}`
    );

    const [products, productsDataLoading]: any = useGetFetchData(
        `${REACT_APP_API2_URL}/ordenes/${row.id}`
    );
    const [openPayInfo, setOpenPayInfo]: [openpaytransaction, any] = useState({} as openpaytransaction);
    const [productsInfo, setProductsInfo]: [articulosPedido[], any] = useState([] as articulosPedido[]);

    useEffect(() => {
        if (openPayData) {
            setOpenPayInfo(openPayData);
            console.log(openPayData);
        }
    }, [openPayData])

    useEffect(() => {
        if (productsDataLoading !== true && products.hasOwnProperty('articulosCompraLinea')) {
            setProductsInfo(products.articulosCompraLinea);
        }
    }, [productsDataLoading, products])

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="right">{row.createdAt}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <React.Fragment>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div">
                                    <ul>
                                        <li>Id OpenPay: {row.idOpenPayTransaction}</li>
                                        <li>Tarjeta: {openPayInfo?.card?.card_number}</li>
                                        <li>Total de la compra: {openPayInfo?.amount}</li>
                                        <li>Fecha del cargo: {openPayInfo?.creation_date}</li>
                                    </ul>
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Producto</TableCell>
                                            <TableCell>Imagen</TableCell>
                                            <TableCell align="right">Cantidad</TableCell>
                                            <TableCell align="right">Precio ($)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {productsInfo.length > 0 ? productsInfo.map((productsRow: articulosPedido) => (
                                            <TableRow key={productsRow.id}>
                                                <TableCell component="th" scope="row">
                                                    {productsRow.nombre}
                                                </TableCell>
                                                <TableCell><ProductImage idProduct={productsRow.id} /></TableCell>
                                                <TableCell align="right">{productsRow.Cantidad}</TableCell>
                                                <TableCell align="right">
                                                    {productsRow.PrecioVenta}
                                                </TableCell>
                                            </TableRow>
                                        )) : <TableRow> <TableCell>No hay productos</TableCell> </TableRow> }
                                    </TableBody>
                                </Table>
                            </Box>
                        </React.Fragment>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const rows = [
    createData('Frozen yoghurt', 159),
    createData('Ice cream sandwich', 237)
];

export default function OrderTable(pedidos: any) {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setOrders(pedidos.pedidos);
        console.log(pedidos)
    }, [pedidos])

    useEffect(() => {
        console.log(orders)
    }, [orders]);

    return orders !== undefined || null ?
        (
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Folio Pedido</TableCell>
                            <TableCell align="right">Fecha</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.length > 0 ? orders.map((row: any) => (
                            <Row key={row.id} row={row} />
                        )) : <></>}
                    </TableBody>
                </Table>
            </TableContainer>
        ) : <></>
}
