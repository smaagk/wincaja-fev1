import React from 'react';
import { useCallback,useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './typeahead.css';

const { VITE_API_URL } = import.meta.env;

export default function TypeaHead() {
    const [isLoading, setLoading] = useState(false);
    const [options, setOptions] = useState(['']);
    const [productsInfo, setProductsInfo] = useState([]);
    const  searchStyles  = useStyles();
    const dispatch =  useDispatch();
    let history = useHistory();

    const handleInputSearch = (query) => {
        dispatch({
            type: 'SETSIMPLESEARCH',
            payload: query,
        });
    };

    const handleChangeSearch = (query) => {
        const getUrl = history.location.pathname;

        console.log('query', getUrl);

        if (getUrl !== '/admin/precios' && query && query[0].articulo) {
            history.push(`/tienda/producto/${query[0].articulo}`,{forceRefresh:true});
        }

       if ( getUrl === '/admin/precios' && query && query[0]?.articulo) {

            dispatch({
                type: 'SETSEARCH',
                payload: query[0].articulo
            });
        }
    }

    const handleSearch =  useCallback((query) => {
        setLoading(true);
        fetch(`${VITE_API_URL}/autocomplete?phrase=${query}`)
            .then((resp) => resp.json())
            .then((json) => {
                setOptions(json.rows);
                setLoading(false);
            });
    },[]);

    return (
        <div className={searchStyles.searchContainer}>
            <AsyncTypeahead
                id="busquedadeproductos"
                placeholder="Búsqueda de productos"
                isLoading={isLoading}
                labelKey={(option) => `${option.Nombre}`}
                onSearch={(query) => handleSearch(query)}
                options={options}
                searchText='Buscando productos'
                onInputChange={ handleInputSearch }
                onChange={ handleChangeSearch }
                useCache={true}
            />
        </div>
    );
}
