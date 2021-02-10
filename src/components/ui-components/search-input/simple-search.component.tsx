import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import { ISearchInput } from 'interfaces/search-input.interface'
import React, { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux';

export function SimpleSearchComponent(props: ISearchInput) {
    const dispatch = useDispatch();

    const handleSearch = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        dispatch({
            type: 'SETSIMPLESEARCH',
            payload: event.target.value,
        });
    };

    return (
        <div>
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
        </div>
    )
}

