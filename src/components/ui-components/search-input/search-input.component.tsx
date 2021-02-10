import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import fetch from 'cross-fetch';
import useDebounce from 'custom-hooks/useDebounce';
import useGetFetchData from 'custom-hooks/useGetFetchData';
import { ISearchInput } from 'interfaces/search-input.interface';
import _ from 'lodash';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';

const { REACT_APP_API_URL } = process.env;
interface Productos {
    name: string;
}

const filterOptions = createFilterOptions({
    stringify: (option: any) => option.name + option.descripcion,
});
export function SearchInputComponent(props: ISearchInput) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<Productos[]>([]);
    const loading = open && options.length === 0;

    const { searchValue } = useSelector((state: RootState) => state.search);
    const debouncedSearchTerm = useDebounce(searchValue, 1000);
    const [paramsAutocomplete, setParamsAutocompleteParams] = useState({});
    const [autoCompleteData, autoCompleteDataLoading]: any = useGetFetchData(
        `${REACT_APP_API_URL}/autocomplete`,
        paramsAutocomplete
    );
    const [dataAutcomplete, setDataAutcomplete] = useState([]);

    useEffect(() => {
        if (!autoCompleteDataLoading && REACT_APP_API_URL !== null) {
            if (autoCompleteData.success && autoCompleteData.rows.length > 0) {
                setOptions(mapAutocompleteProducts(autoCompleteData.rows));
                console.log(mapAutocompleteProducts(autoCompleteData.rows));
            }
        }
    }, [autoCompleteDataLoading]);

    useEffect(() => {
        setParamsAutocompleteParams({
            ...paramsAutocomplete,
            phrase: debouncedSearchTerm,
        });
    }, [debouncedSearchTerm]);

    useEffect(() => {
        console.log(options);
    }, [options]);

    const handleSearch = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        dispatch({
            type: 'SETSEARCH',
            payload: event.target.value,
        });
    };

    function mapAutocompleteProducts(products: any) {
        return products.map((product: any) => {
            console.log(product)
            return { articulo: product.articulo, name: product.Nombre, descripcion: product.Descripcion };
        });
    }

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }

        dispatch({
            type: 'SETSEARCH',
            payload: '',
        });
    }, [open]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            style={{ width: 300 }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => { 
                console.log(option)
                window.location.href = `tienda/producto/${option.articulo}`
                return option.name === value.name }}
            getOptionLabel={(option) => option.name}
            options={options}
            filterOptions={filterOptions}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Busqueda de productos"
                    variant="outlined"
                    onChange={handleSearch}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? (
                                    <CircularProgress
                                        color="inherit"
                                        size={20}
                                    />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}
