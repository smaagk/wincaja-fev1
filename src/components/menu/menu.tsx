import List from '@material-ui/core/List'
import { createStyles,makeStyles } from '@material-ui/core/styles'
import { AccountCircle, ExitToApp,LocalMall, Store } from '@material-ui/icons'
import IconDashboard from '@material-ui/icons/Dashboard'
import React from 'react'

import AppMenuItem from './menu-item'

const appMenuItems = [
  {
    name: 'Tienda',
    link: '/',
    Icon: IconDashboard,
  },
  {
    name: 'Comprar por categoria',
    Icon: Store,
    items: [{
      name: 'Level 2',
    }],
 },
  // {
  //   name: 'Mis Pedidos',
  //   link: '/pedidos',
  //   Icon: LocalMall,
  // },
  {
    name: 'Mi Cuenta',
    link: '/customers',
    Icon: AccountCircle,
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
