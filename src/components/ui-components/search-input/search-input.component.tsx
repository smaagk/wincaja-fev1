import React, { ChangeEvent, useState, useEffect } from 'react';
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
} from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { ISearchInput } from 'interfaces/search-input.interface';
import { useDispatch } from 'react-redux';

export function SearchInputComponent(props: ISearchInput) {
    const dispatch = useDispatch();
    const [showSearchInput, setShowSearchInput] = useState(false);
    let match = useRouteMatch({ path: '/tienda', strict: false });

    const handleSearch = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        dispatch({
            type: 'SETSEARCH',
            payload: event.target.value,
        });
    };

    useEffect(() => {
        console.log(match)
    }, [])

    return (
        <div>
            {match !== null && match.isExact ? (
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                        Búsqueda
                    </InputLabel>
                    <OutlinedInput
                        type="text"
                        value={props.search}
                        name={props.name}
                        onChange={handleSearch}
                        error={props.error}
                        endAdornment={
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
            ) : (
                <></>
            )}
        </div>
    );
}
