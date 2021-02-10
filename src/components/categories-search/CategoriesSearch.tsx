import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { RootState } from 'store';
import { capitalizeFirstLetter } from 'utils/capitalizeLetter';

import useStyles from './CategoriesSearch.css';

export function CategoriesSearch() {
    const categoriesStyles = useStyles();
    const dispatch = useDispatch();
    let location = useLocation();
    const [categorieName, setCategorieName] = useState('');
    const [subCategories, setSubCategories] = useState([]);

    const { categories } = useSelector((state: RootState) => state.categories);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        let categorie = String(urlParams.get('categoria'));

        if(categorie !== 'null') {
            setCategorieName(capitalizeFirstLetter(categorie));
        }

    }, [location]);

    useEffect(() => {
        dispatch({ type: 'SETSIMPLESEARCH', payload: categorieName });
        setSubCategories(
            categories.filter(
                (cat: any) => cat.Descripcion === categorieName.toUpperCase()
            )
        );
    }, [categorieName]);

    function handleClick(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        subcategorie: string
    ) {
        event.preventDefault();
        dispatch({ type: 'SETSIMPLESEARCH', payload: subcategorie });
    }

    return (
        <div className={categoriesStyles.root}>
            <h2>{categorieName}</h2>
            <br />
            <Breadcrumbs maxItems={10} aria-label="breadcrumb">
                {subCategories.map((sub: any) => {
                    console.log(sub);
                    return (
                        <Link
                            key={sub['subfamilias.Subfamilia']}
                            color="inherit"
                            href="#"
                            onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
                                handleClick(e, sub['subfamilias.Subfamilia'])
                            }
                        >
                            {sub['subfamilias.Descripcion']}
                        </Link>
                    );
                })}
            </Breadcrumbs>
        </div>
    );
}
