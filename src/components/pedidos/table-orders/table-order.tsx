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
import { REACT_APP_API_URL } from 'constants/app.constants';
import useGetFetchData from 'custom-hooks/useGetFetchData';
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
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const [openPayData, openPayDataLoading]: any = useGetFetchData(
        `${REACT_APP_API_URL}/transactiondetails/${row.idOpenPayTransaction}`
    );
    const [openPayInfo, setOpenPayInfo] = useState({});

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.idOrder}
                </TableCell>
                <TableCell align="right">{row.orderDate}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                <ul>
                                    <li>Id OpenPay:  {openPayData.id} </li>
                                    <li>Tarjeta: {openPayData && openPayData.card && openPayData.card.card_number}</li>
                                    <li>Total de la compra: {openPayData.amount} MXN</li>
                                    <li>Fecha del cargo: {openPayData.operation_date}</li>
                                </ul>
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Producto</TableCell>
                                        <TableCell>Imagen</TableCell>
                                        <TableCell align="right">Cantidad</TableCell>
                                        <TableCell align="right">Precio Total ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.products.map((productsRow: any) => (
                                        <TableRow key={productsRow.id}>
                                            <TableCell component="th" scope="row">
                                                {productsRow.name}
                                            </TableCell>
                                            <TableCell><ProductImage idProduct={productsRow.id} /></TableCell>
                                            <TableCell align="right">{productsRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {productsRow.total}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
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
                        {orders.map((row: any) => (
                            <Row key={row.idOrder} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        ) : <></>
}
