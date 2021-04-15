import React from 'react';
import { useCallback,useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './typeahead.css';

const { REACT_APP_API_URL } = process.env;

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
        if (query && query[0].articulo) {
            history.push(`/tienda/producto/${query[0].articulo}`,{forceRefresh:true});
        }
    }

    function sortAlph( a, b ) {

        if ( a.last_nom < b.last_nom ){
          return -1;
        }

        if ( a.last_nom > b.last_nom ){
          return 1;
        }

        return 0;
    }

    const handleSearch =  useCallback((query) => {
        setLoading(true);
        fetch(`${REACT_APP_API_URL}/autocomplete?phrase=${query}`)
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
