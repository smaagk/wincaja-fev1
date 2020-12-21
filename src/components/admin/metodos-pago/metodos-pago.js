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
import Checkbox from '@material-ui/core/Checkbox';
import { useState, useEffect } from 'react';
import useGetFetchData from '../../../custom-hooks/useGetFetchData';
import useCustomFetch from '../../../custom-hooks/useCustomFetch';
import ImageProductComponent from '../../ui-components/image-product/image-product';
import { MenuItem } from '@material-ui/core';
import { Route, Link } from 'react-router-dom';

const columns = [
  { id: 'descripcion', label: 'Metodo de pago'}
];

const useStyles = makeStyles({
  root: {
    width: '50%',
    margin: 'auto',
  },
  container: {
    maxHeight: 700,
  },
  imgContainer: {
    display: 'flex'
  }
});

const { REACT_APP_API_URL } = process.env;

export default function MetodosDePago() {
  const classes = useStyles();
  const [params, setParams] = useState({});
  const [metodosDePago, setMetodosDePago] = useState([]);
  const [selected, setSelected] = useState([]);
  const [metodoSelected, setMetodosSelected] = useState({});
  const [metodosPago, metodosLoading] = useGetFetchData(
    `${REACT_APP_API_URL}/metodospago`,
    params
  );

  const [metodoUpdated,metodoUpdatedLoading] = useCustomFetch(
    `${REACT_APP_API_URL}/metodospago`,
    metodoSelected
  );

  useEffect(() => {
    if (!metodosLoading && REACT_APP_API_URL !== null) {
      setMetodosDePago(metodosPago);
      setMethodEnabled(metodosPago);
    }
  }, [metodosLoading]);

  useEffect(() => {
    console.log(metodoSelected)
  },[metodoSelected])


  const setMethodEnabled = (metodos) => {
    const metodosDePago = metodos
      .filter((metodo) => metodo.habilitado)
      .map((metodo) => metodo.id);
    setSelected(metodosDePago);
  };


  const isSelected = (metodo) => selected.indexOf(metodo) !== -1;

  const handleMethodSelect = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    setMetodosSelected({ id });
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 170 }}>Habilitado</TableCell>
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
          {metodosDePago.map((row) => {
              const isItemSelected = isSelected(row.id);

              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  aria-checked={isItemSelected}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      onClick={(event) =>
                        handleMethodSelect(event, row.id)
                      }
                    />
                  </TableCell>
                  {columns.map((column) => {
                    console.log(metodosDePago)
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                           {value}
                        </TableCell>
                      );  
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
