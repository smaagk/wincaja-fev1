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
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { ProductImage } from 'components/ui-components/product-image/product-image';
import { REACT_APP_API2_URL } from 'constants/app.constants';
import useGetFetchData from 'custom-hooks/useGetFetchData';
import { articulosPedido } from 'interfaces/atriculos.interfaces';
import { openpaytransaction } from 'interfaces/openpay.interface';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Almacenes from '../../../almacen/select-almacen';
import { StockAvailability } from 'components/ui-components/stock-avail/stockAvailComponent';
import { Cliente, Direccion } from 'interfaces/clientes.interfaces';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { CustomButton } from 'components/ui-components';
import useCustomFetch from 'custom-hooks/useCustomFetch';
import Chip from '@mui/material/Chip';
import _ from 'lodash';

const ORDER_STATUS_COLORS = [
    { status: 1, statusName: 'completed', color: '#00bcd4', textColor: '#fff' }, 
    { status: 2, statusName: 'in_progress', color: '#ff9800', textColor: '#fff' },
    // cool gradient red can be used for cancelled
    { status: 3, statusName: 'cancelled', color: '#FE6B8B', textColor: '#fff' }]

const getStatusColor = (status: number) => {
    const statusColor = ORDER_STATUS_COLORS.find(s => s.status === status);

    if (statusColor) {
        return statusColor;
    }
}

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
        color: '#fff',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem',
    }
});

function translateOrderStatus(status: string) {
    switch (status) {
        case 'in_progress':
            return 'En progreso';
        case 'completed':
            return 'Completado';
        default:
            return 'Pendiente';
    }
}

type Color = "info" | "success" | "error" | "default" | "primary" | "secondary" | "warning" | undefined

function colorOrderStatus(status: number) {
    let statusColorObj : {
        label: string,
        color: Color
    } = {
        label: '...',
        color: 'default'
    }
    switch (status) {
        case 2 :
            return statusColorObj ={
                label: 'En progreso',
                color: 'info'
            }
        case 1 :
            return  statusColorObj = {
                label: 'Completado',
                color: 'success'
            }
        case 3 :
            return statusColorObj = {
                label: 'Cancelado',
                color: 'error'
            }
        default :
            return  {
                ...statusColorObj,
            }
        
    }
}

function Row(props: { row: any }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const _almacen: string = useSelector((state: RootState) => state.almacen.almacen);
    const isAdmin = useSelector((state: RootState) => state.auth.user?.role) === 'Admin';
    console.log('isAdmin', isAdmin);
    const [openPayData, ]: any = useGetFetchData(`${REACT_APP_API2_URL}/transaction-detail/${row.idMetodoPago}`);
    const [products, productsDataLoading]: any = useGetFetchData(`${REACT_APP_API2_URL}/preordenes/${row.id}`);
    const [cliente, clienteDataLoading]: any = useGetFetchData(`${REACT_APP_API2_URL}/clientebyopenpayid/${row.cliente}`);
    const [direccion, direccionDataLoading]: any = useGetFetchData(`${REACT_APP_API2_URL}/direccion/${row.aliasDireccion}/${row.cliente}`);

    const [preordenParams, setPreordenParams] = useState({});
    const [preordenUpdated, preordenUpdatedLoading] = useCustomFetch(
        `${REACT_APP_API2_URL}/approve-payment`,
        preordenParams
    );

    const [preordenCashParams, setPreordenCashParams] = useState({});
    const [preordenCashUpdated, preordenCashUpdatedLoading] = useCustomFetch(
        `${REACT_APP_API2_URL}/approve-payment-cash`,
        preordenCashParams
    );

    const [cancelParams, setCancelParams] = useState({});
    const [preordenCancelled, preordenCancelledLoading] = useCustomFetch(
        `${REACT_APP_API2_URL}/cancel-payment`,
        cancelParams
    );


    const [openPayInfo, setOpenPayInfo]: [openpaytransaction, any] = useState({} as openpaytransaction);
    const [productsInfo, setProductsInfo]: [articulosPedido[], any] = useState([] as articulosPedido[]);
    const [clientInfo, setClientInfo]: [Cliente, Function] = useState({} as any);
    const [direccionInfo, setDireccionInfo]: [Direccion, Function] = useState({} as any);

    useEffect(() => {
        if (openPayData) {
            setOpenPayInfo(openPayData);
        }
    }, [openPayData])

    useEffect(() => {
        if (productsDataLoading !== true && products.hasOwnProperty('articulosPreOrdenLinea')) {
            setProductsInfo(products.articulosPreOrdenLinea);
        }
    }, [productsDataLoading, products])

    useEffect(() => {
        if (clienteDataLoading !== true && cliente.hasOwnProperty('cliente')) {
            setClientInfo(cliente.cliente);
        }
    }, [clienteDataLoading, cliente])

    useEffect(() => {
        if (direccionDataLoading !== true) {
            setDireccionInfo(direccion);
        }
    }, [direccionDataLoading, direccion])
    
    useEffect(() => {
        if (preordenUpdatedLoading !== true ) {
            setPreordenParams({});
            setOpen(false);
        }
    }, [preordenUpdatedLoading])

    useEffect(() => {
        if (preordenCancelledLoading !== true ) {
            setPreordenParams({});
            setOpen(false);
        }
    }, [preordenCancelledLoading])

    useEffect(() => {
        if (preordenCashUpdatedLoading !== true ) {
            setPreordenCashParams({});
            setOpen(false);
        }
    } , [preordenCashUpdatedLoading])

    const handleApprovePayment = () => {

        if (openPayInfo.http_code === 404) {
            setPreordenCashParams({
                transactionId: row.idMetodoPago,
                almacen: _almacen,
                customerId: null
            });
        } else {
            setPreordenParams({
                customerId: openPayInfo?.customer_id,
                transactionId: openPayInfo.id,
                almacen: _almacen
            });
        }
    }

    const handleCancelPayment = () => {
        setCancelParams({
            idPreOrdenVentaEnLinea: row.id,
        });
    }

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
                <TableCell align="right" component="th">
                    <Chip label={colorOrderStatus(row?.estatus).label} color={colorOrderStatus(row?.estatus).color} variant="outlined" />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ 
                    paddingBottom: 0, 
                    paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <>
                                <>
                                    <h6>Datos de pago</h6>
                                    <Table size="small" aria-label="pagos">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Id OpenPay</TableCell>
                                                <TableCell>Id Cliente OpenPay</TableCell>
                                                <TableCell>Total de la compra</TableCell>
                                                <TableCell>Estado</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>{row.idMetodoPago}</TableCell>
                                                <TableCell>{openPayInfo?.customer_id}</TableCell>
                                                <TableCell>{openPayInfo.amount}</TableCell>
                                                <TableCell>{translateOrderStatus(openPayInfo?.status)}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                    <br />
                                    <h6>Datos de envío</h6>
                                    <Table size="small" aria-label="envío">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Nombre</TableCell>
                                                <TableCell>Apellido</TableCell>
                                                <TableCell>RFC</TableCell>
                                                <TableCell>Teléfono</TableCell>
                                                <TableCell>Calle</TableCell>
                                                <TableCell>Número ext</TableCell>
                                                <TableCell>Número int</TableCell>
                                                <TableCell>Ciudad</TableCell>
                                                <TableCell>Estado</TableCell>
                                                <TableCell>Código Postal</TableCell>
                                                <TableCell>Referencias</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>{clientInfo.Nombre}</TableCell>
                                                <TableCell>{clientInfo.Apellido1} {clientInfo.Apellido2}</TableCell>
                                                <TableCell>{clientInfo.RFC}</TableCell>
                                                <TableCell>{clientInfo.Telefono}</TableCell>
                                                <TableCell>{direccionInfo.Calle}</TableCell>
                                                <TableCell>{direccionInfo.NumeroExterior}</TableCell>
                                                <TableCell>{direccionInfo.numeroInterior}</TableCell>
                                                <TableCell>{direccionInfo.Ciudad}</TableCell>
                                                <TableCell>{direccionInfo.Estado}</TableCell>
                                                <TableCell>{direccionInfo.CodigoPostal}</TableCell>
                                                <TableCell>{direccionInfo.Referencias}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>

                                    <br />
                                    { isAdmin ? (<><span> Selecciona el almacen para visualizar las cantidades disponibles</span><Almacenes /></>): (<></>) }
                              
                                </>
                            </>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Producto</TableCell>
                                        <TableCell>Imagen</TableCell>
                                        <TableCell align="right">Cantidad</TableCell>
                                        <TableCell>Existencias en almacén</TableCell>
                                        <TableCell align="right">Precio de Venta ($)</TableCell>
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
                                            <TableCell align="right"><StockAvailability idProduct={productsRow.id}/></TableCell>
                                            <TableCell align="right">
                                                $ {productsRow.PrecioVenta}
                                            </TableCell>
                                        </TableRow>
                                    )) : <TableRow> <TableCell>No hay productos</TableCell> </TableRow> }
                                </TableBody>
                            </Table>

                            <br />
                            {row?.estatus === 2 && isAdmin ? (
                            <div className={classes.buttons}>
                                <CustomButton
                                    title="Confirmar pedido"
                                    onClick={handleApprovePayment}
                                    color="deepGreen"
                                ></CustomButton>
                                <CustomButton
                                    title="Cancelar pedido"
                                    color="deepRed"
                                    onClick={handleCancelPayment}
                                ></CustomButton>
                            </div> ) : <></>}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

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
