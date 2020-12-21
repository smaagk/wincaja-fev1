import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'

import IconDashboard from '@material-ui/icons/Dashboard'
import IconShoppingCart from '@material-ui/icons/ShoppingCart'
import IconPeople from '@material-ui/icons/People'
import IconBarChart from '@material-ui/icons/BarChart'
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'

import AppMenuItem from './menu-item'
import { AccountCircle, LocalMall, Store, ExitToApp } from '@material-ui/icons'

const appMenuItems = [
  {
    name: 'Inicio',
    link: '/',
    Icon: IconDashboard,
  },
  {
    name: 'Mis Pedidos',
    link: '/pedidos',
    Icon: LocalMall,
  },
  {
    name: 'Mi Cuenta',
    link: '/customers',
    Icon: AccountCircle,
  },
  {
    name: 'Comprar por categoria',
    Icon: Store,
    items: [],
  },
  {
    name: 'Cerrar sesión',
    Icon: ExitToApp,
    action: 'LOGOUT',
    items: [],
  }
]

const AppMenu: React.FC = () => {
  const classes = useStyles()

  return (
    <List component="nav" className={classes.appMenu} disablePadding>
      {/* <AppMenuItem {...appMenuItems[0]} /> */}
      {appMenuItems.map((item, index) => (
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
