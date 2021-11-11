import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FunctionComponent, useEffect, useState } from 'react';
import useGetFetchData from 'custom-hooks/useGetFetchData';
import { REACT_APP_API2_URL } from 'constants/app.constants';
import Button from '../ui-components/button';

import * as _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';

interface AlamcenProps {
    Almacen: number,
    Descripcion: string
}

const Almacen: FunctionComponent = () => {
    const [almacen, setAlmacen] = React.useState('');
    const dispatch = useDispatch();

    const _almacen: string = useSelector(
        (state: RootState) => state.almacen.almacen
    );

    const handleChange = (event: SelectChangeEvent) => {
        const almacen = event.target.value;
        setAlmacen(almacen);
        dispatch({type: 'SELECTALMACEN', payload: almacen})
    };
    function handleNextStep() {
        dispatch({
          type: 'NEXT',
        });
      }

    const [almacenes, setAlamacenes] = useState([]);
    const [paramsAlmacen, setParamsAlmacen]: any = useState(null);
    let [_almacenes, almacenLoading]: any = useGetFetchData(
        `${REACT_APP_API2_URL}/almacenes`
    );

    useEffect(() => {
        setParamsAlmacen(true);
        setAlmacen(_almacen);
    }, []);

    useEffect(() => {
        if (almacenLoading === false) {
            setAlamacenes(_almacenes);
        }
    }, [almacenLoading])

    return (<div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Almacen</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={almacen}
                label="Almacen"
                onChange={handleChange}
            >
                {almacenes.map((almacen: AlamcenProps) => {
                    console.log(almacen)
                    return (<MenuItem key={almacen.Almacen} value={almacen.Almacen}>{almacen.Descripcion}</MenuItem>)
                })}
            </Select>
        </FormControl>
    </div>);
}

export default Almacen;