import React from 'react';
import { Route, Link } from 'react-router-dom';
import { MenuList, MenuItem } from '@material-ui/core';

import TestComponent from '../testcomponent/testcomponent';
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
import { HeaderMockUp, NavHeaderMockUp } from '@mui-treasury/mockup/layout';

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
            width: 256,
        });
});

const Catalog = () => {
    return (
        <Root scheme={scheme}>
            {({ state: { sidebar } }) => (
                <>
                    <CssBaseline />
                    <Header>
                        <Toolbar>
                            <SidebarTrigger sidebarId="primarySidebar" />
                            WinCaja
                        </Toolbar>
                    </Header>
                    <DrawerSidebar sidebarId="primarySidebar">
                        <SidebarContent>
                            <NavHeaderMockUp
                                collapsed={sidebar.primarySidebar.collapsed}
                            />
                            <MenuList>
                                <MenuItem component={Link} to="/catalogo">
                                    Home
                                </MenuItem>
                            </MenuList>
                        </SidebarContent>
                        <CollapseBtn />
                    </DrawerSidebar>
                    <Content>
                        <Route
                            path="/catalogo"
                            component={TestComponent}
                            exact
                        />
                    </Content>
                    <InsetFooter></InsetFooter>
                </>
            )}
        </Root>
    );
};

export default Catalog;
