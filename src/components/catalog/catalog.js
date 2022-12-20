import { Drawer, MenuItem, MenuList } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Layout, {
    getCollapseBtn,
    getContent,
    getDrawerSidebar,
    getHeader,
    getInsetFooter,
    getSidebarContent,
    getSidebarTrigger,
    Root,
} from '@mui-treasury/layout';
import AccessComponent from 'components/access/acccess';
import Home from 'components/home';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import AccountComponent from '../account/AccountComponent';
import AppMenu from '../app-menu/AppMenu';
import Almacenes from '../almacen/select-almacen';
import BuyProcessComponent from '../buy-process/buy-process';
import ConfirmationOrder from '../confirmation/ConfirmationOrder'
import Pedidos from '../pedidos/pedidos'
import ProductDetailsComponent from '../product/product-details'
import TypeaHead from '../typeahead/typeahead';
import CartBarComponent from '../ui-components/cart-counter/cart-counter.component';
import { SearchInputComponent } from '../ui-components/search-input/search-input.component';
import { catalogStyles } from './catalog.styles';
import CartDetails from 'components/basket/CartDetails';
import Cart from 'components/basket/cart';

const Header = getHeader(styled);
const DrawerSidebar = getDrawerSidebar(styled);
const SidebarTrigger = getSidebarTrigger(styled);
const SidebarContent = getSidebarContent(styled);
const CollapseBtn = getCollapseBtn(styled);
const Content = getContent(styled);
const InsetFooter = getInsetFooter(styled);

const scheme = Layout();

scheme.configureHeader((builder) => {
    builder
        .create('appHeader')
        .registerConfig('xs', {
            position: 'sticky',
            initialHeight: 56,
        })
        .registerConfig('md', {
            position: 'relative', // won't stick to top when scroll down
            initialHeight: 64,
        });
});

scheme.configureEdgeSidebar((builder) => {
    builder
        .create('primarySidebar', { anchor: 'left' })
        .registerTemporaryConfig('xs', {
            width: 'auto', // 'auto' is only valid for temporary variant
        });
});

scheme.configureInsetSidebar((builder) => {
    builder
        .create('secondarySidebar', { anchor: 'right' })
        .registerFixedConfig('md', {
            width: 300,
        });
});

const Catalog = () => {
    const classes = catalogStyles();
    const dispatch = useDispatch();
    const isDrawerOpen = useSelector((state) => state.drawer.isOpen);

    function handleDrawer() {
        dispatch({ type: 'DRAWER' });
    }

    return (
        <Root scheme={scheme}>
            {({ state: { sidebar }, setOpen }) => {
                sidebar.primarySidebar.open = isDrawerOpen;
                return (
                    <>
                        <CssBaseline />
                        <Header>
                            <Toolbar>
                                <SidebarTrigger sidebarId="primarySidebar" onClick={handleDrawer} />
                                WinCaja
                                <div className={classes.topBarContainer}>
                                    <TypeaHead />
                                </div>
                            </Toolbar>
                        </Header>
                        {/* <Drawer anchor='left' open={isDrawerOpen} onClose={handleDrawer}>
                            <AppMenu />
                        </Drawer> */}
                        <DrawerSidebar onClose={handleDrawer} sidebarId="primarySidebar">
                            <SidebarContent>
                                <AppMenu />
                            </SidebarContent>
                            <CollapseBtn />
                        </DrawerSidebar>
                        <Content>
                            <Switch>
                                <Route path="/" component={Home} exact />
                                <Route path="/tienda" component={Home} exact />
                                <Route path="/tienda/categoria/:categoria" component={Home} exact />
                                <Route path="/tienda/producto/:articulo" render={({ match }) => <ProductDetailsComponent key={match.params.articulo || 'empty'} info={match} />} exact />
                                <Route path="/tienda/carrito" component={BuyProcessComponent} exact />
                                <Route path='/tienda/confirmacion' component={ConfirmationOrder} exact />
                                <Route path='/tienda/success' component={ConfirmationOrder}  />
                                <Route path='/tienda/login' component={AccessComponent} exact />
                                <Route path='/tienda/cuenta' component={AccountComponent} exact />
                                <Route path='/tienda/pedidos' component={Pedidos} exact />
                                <Route path='/tienda/cart' component={Cart} exact />

                            </Switch>
                        </Content>
                        <InsetFooter></InsetFooter>
                        <CartBarComponent />

                    </>
                )
            }}
        </Root>
    );
};

export default Catalog;
