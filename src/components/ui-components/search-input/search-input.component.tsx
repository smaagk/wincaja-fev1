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
import { useHistory } from 'react-router-dom';
import { RootState } from 'store';

const { VITE_API_URL } = import.meta.env;
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
    const history = useHistory();
    const loading = open && options.length === 0;

    const { searchValue } = useSelector((state: RootState) => state.search);
    const debouncedSearchTerm = useDebounce(searchValue, 3000);
    const [paramsAutocomplete, setParamsAutocompleteParams] = useState({});
    const [autoCompleteData, autoCompleteDataLoading]: any = useGetFetchData(
        `${VITE_API_URL}/autocomplete`,
        paramsAutocomplete
    );
    const [dataAutcomplete, setDataAutcomplete] = useState([]);

    useEffect(() => {
        if (!autoCompleteDataLoading && VITE_API_URL !== null) {
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

    const handleGoToProduct = (option: any) => {
        if (option !== null) {
            history.push(`/tienda/producto/${option.articulo}`,{forceRefresh:true});
        }
    }

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
            onChange={(event: any, value: any) => handleGoToProduct(value)} 
            getOptionSelected={(option, value) => { 
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
                    onKeyDown={(e: any) => {
                        if (e.key === "Enter") {
                            dispatch({
                                type: 'SETSEARCH',
                                payload: e.target.value,
                            });
                         }
                    }}
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
