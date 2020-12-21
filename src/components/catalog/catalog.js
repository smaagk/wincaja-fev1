import React from 'react';
import { Route, Link } from 'react-router-dom';
import { MenuList, MenuItem } from '@material-ui/core';

import { catalogStyles } from './catalog.styles';
import styled from 'styled-components';
import Layout, {
    Root,
    getHeader,
    getDrawerSidebar,
    getSidebarTrigger,
    getSidebarContent,
    getCollapseBtn,
    getContent,
    getInsetFooter,
} from '@mui-treasury/layout';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppMenu from '../menu/menu';
import Home from 'components/home';
import { SearchInputComponent } from '../ui-components/search-input/search-input.component';
import CartBarComponent from '../ui-components/cart-counter/cart-counter.component';
import BuyProcessComponent from '../buy-process/buy-process';

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
    return (
        <Root scheme={scheme}>
            {({ state: { sidebar } }) => (
                <>
                    <CssBaseline />
                    <Header>
                        <Toolbar>
                            <SidebarTrigger sidebarId="primarySidebar" />
                            WinCaja
                            <div className={classes.topBarContainer}>
                                <SearchInputComponent />
                                <MenuItem component={Link} to="/tienda/carrito">
                                    <CartBarComponent />
                                </MenuItem>
                            </div>
                        </Toolbar>
                    </Header>
                    <DrawerSidebar sidebarId="primarySidebar">
                        <SidebarContent>
                            <AppMenu />
                        </SidebarContent>
                        <CollapseBtn />
                    </DrawerSidebar>
                    <Content>
                        <Route path="/" component={Home} exact />
                        <Route path="/tienda" component={Home} exact />
                        <Route path="/tienda/carrito" component={BuyProcessComponent} exact/>
                    </Content>
                    <InsetFooter></InsetFooter>
                </>
            )}
        </Root>
    );
};

export default Catalog;
