/* eslint-disable react-hooks/exhaustive-deps */
import { MenuItem } from '@material-ui/core';
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
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import useCustomFetch from '../../../custom-hooks/useCustomFetch';
import useGetFetchData from '../../../custom-hooks/useGetFetchData';


const columns = [
  { id: 'id', label: 'Id de preorden' },
  { id: 'aliasDireccion', label: 'Domicilio' },
  { id: 'clienteslinea', label: 'Cliente' },
  { id: 'clienteslinea.email', label: 'Email' },
  { id: 'idMetodoPago', label: 'Metodo de pago' },
  { id: 'estatus', label: 'Estatus' },
  { id: 'createdAt', label: 'Fecha de pedido' },
  { id: 'acciones', label: 'Acciones' }

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
const { REACT_APP_API_URL, REACT_APP_API2_URL } = process.env;


export default function Preordenes() {
  let history = useHistory();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalRows, setTotalRows] = useState(0);
  const [params, setParams] = useState({});
  const [preordenes, setPreordenes] = useState([]);
  const [selected, setSelected] = useState([]);
  const [productSelected] = useState({});
  const [preordenData, preordenLoading] = useGetFetchData(
    `${REACT_APP_API2_URL}/preordenes`,
    params
  );
  // eslint-disable-next-line no-unused-vars
  const [] = useCustomFetch(
    `${REACT_APP_API_URL}/articulo_online`,
    productSelected
  );

  useEffect(() => {
    if (!preordenLoading && REACT_APP_API_URL !== null) {
      if (preordenData) {
        setPreordenes(preordenData.preOrdenesVentaEnLinea);
      }
    }
  }, [preordenLoading]);

  const setMetaPagination = (productsData) => {
    
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


  return (
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
            {preordenes.map((row) => {
              const isItemSelected = isSelected(row.articulo);

              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  aria-checked={isItemSelected}
                  selected={isItemSelected}
                >
                  {columns.map((column) => {
                    if (column.id === 'clienteslinea') {
                      const nombeCliente = `${row['clienteslinea.nombre']} ${row['clienteslinea.apellido1']} ${row['clienteslinea.apellido2']}`
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {nombeCliente}
                        </TableCell>
                      );
                    } else if (column.id === 'acciones') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <MenuItem className={classes.menu} component={Link} to={`/admin/preorden/${row.id}`}>
                            Ver preorden
                          </MenuItem>                       
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
    </Paper>
  );
}
