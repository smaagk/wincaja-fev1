import List from '@material-ui/core/List'
import { createStyles,makeStyles } from '@material-ui/core/styles'
import { AccountCircle, ExitToApp,LocalMall, Store } from '@material-ui/icons'
import IconBarChart from '@material-ui/icons/BarChart'
import IconDashboard from '@material-ui/icons/Dashboard'
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'
import IconPeople from '@material-ui/icons/People'
import IconShoppingCart from '@material-ui/icons/ShoppingCart'
import { REACT_APP_API_URL } from 'constants/app.constants'
import useGetFetchData from 'custom-hooks/useGetFetchData'
import * as _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import AppMenuItem from './AppMenuItem'

let appMenuItems: any = [
    {
      name: 'Tienda',
      link: '/',
      Icon: IconDashboard,
    },
    {
      name: 'Comprar por categoria',
      Icon: Store,
      items: [],
    },
    {
      name: 'Mis Pedidos',
      link: '/tienda/pedidos',
      Icon: LocalMall,
    },
    {
      name: 'Mi Cuenta',
      link: '/tienda/cuenta',
      Icon: AccountCircle,
    },
    {
      name: 'Cerrar sesión',
      Icon: ExitToApp,
      action: 'LOGOUT',
      items: [],
    }
  ]

const AppMenu: React.FC = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const elementsIndex = appMenuItems.findIndex((element: { name: string }) => element.name === 'Comprar por categoria' )
  const [params, setParams]: any = useState(null);
  const [categoriesName, setCategoriesName] = useState([]);
  let [categories, categoriesLoading]: any = useGetFetchData(
    `${REACT_APP_API_URL}/familias`,
    params
  );

  useEffect(() => {
    if (_.isEmpty(categories)) {
        setParams(true);
    }
  }, []);

  useEffect(() => {
    if(!_.isEmpty(categories)) {
        setCategoriesName(categories.rows.map((item: { Descripcion: any }) => item.Descripcion)
        .filter((value: any, index: any, self: string | any[]) => self.indexOf(value) === index));

        dispatch({ type: 'SETCATEGORIES', payload: categories.rows });
    }
  },[categoriesLoading]);

  useEffect(() => {
    if (!_.isEmpty(categoriesName)) {
        appMenuItems[elementsIndex] = {...appMenuItems[elementsIndex], items:  categoriesName.map(val => {
            return { name : val, link: `/tienda?categoria=${String(val).toLowerCase()}`}
        })}
    }
  }, [categoriesName]);
  

  return (
    <List component="nav" className={classes.appMenu} disablePadding>
      {appMenuItems.map((item: any, index: number) => (
        <AppMenuItem {...item} key={index} />
      ))}
    </List>
  )
}

const drawerWidth = 240

const useStyles = makeStyles(theme =>
  createStyles({
    appMenu: {
      width: '100%',
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
    },
    menuItemIcon: {
      color: '#97c05c',
    },
  }),
)

export default AppMenu


