// React componet 
import { Button, Input, Select, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import TypeaHead from 'components/typeahead/typeahead';
import { VITE_API2_URL } from 'constants/app.constants';
import useGetFetchData from 'custom-hooks/useGetFetchData';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import useStyles from './precios-styles';

interface Precios {
    Articulo: string;
    PrecioIVA: number;
    Precio: number;
    IepsTasaVenta: number;
    IVATasaVenta: number;
    NoPrecio: number;
}
function PreciosComponent({ articulo }: any) {
    const preciosStyles = useStyles();
    const [product, setProduct] = useState('');
    const { searchValue } = useSelector((state: RootState) => state.search);
    const [params, setParams]: any = useState({ articulo: '' });
    const [productoPrecios, productoPreciosLoading] = useGetFetchData(
        `${VITE_API2_URL}/prices`,
        params
    );

    useEffect(() => {
        setParams({ ...params, articulo });
    }, [articulo]);

    useEffect(() => {
        console.log(productoPrecios);

    }, [productoPrecios]);


    return (
        <div>
            <h1>Precios</h1>
            <section>
                <h2>{searchValue}</h2>

                { /** MUI table */}
                {productoPreciosLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <TableContainer className={preciosStyles.tablePrices} component={Paper}>
                            <Table>
                                <TableHead >
                                    <TableRow>
                                        <TableCell>No Precio</TableCell>
                                        <TableCell align="right">Precio</TableCell>
                                        <TableCell align="right">Precio IVA</TableCell>
                                        <TableCell align="right">Cantidad Necesaria</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { /**   
                                 * Check if the data is an array and if it has data
                                 */}
                                    {Array.isArray(productoPrecios) && productoPrecios.length > 0 ? (
                                        productoPrecios.map((row: Precios) => (
                                            <TableRow key={row.Articulo}>
                                                <TableCell component="th" scope="row">
                                                    {row.NoPrecio}
                                                </TableCell>
                                                <TableCell align="right">{row.Precio}</TableCell>
                                                <TableCell align="right">{row.PrecioIVA}</TableCell>
                                                <TableCell align="right">
                                                    <TextField
                                                        id="standard-number"
                                                        label="Number"
                                                        type="number"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        variant="standard"
                                                        defaultValue={0}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5}>No hay datos</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br/>
                        <Button variant="contained" color="primary">
                            Guardar
                        </Button>
                        <br/>
                    </>
                )}
            </section>
        </div>
    );
}

export default PreciosComponent;