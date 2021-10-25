import React from 'react';
import { Route, Link } from 'react-router-dom';
import { MenuList, MenuItem } from '@material-ui/core';

import Home from '../home';
import Productos from './productos/productos';
import Producto from './producto/producto';
import MetodosDePago from './metodos-pago/metodos-pago';
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
import {
  HeaderMockUp,
  NavHeaderMockUp,
  FooterMockUp,
} from '@mui-treasury/mockup/layout';
import Preordenes from './preordenes/preordenes';
import Preorden from './preorden/preorden';

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

const HomeAdmin = () => {
  return (
    <Root scheme={scheme}>
      {({ state: { sidebar } }) => (
        <>
          <CssBaseline />
          <Header>
            <Toolbar>
              <SidebarTrigger sidebarId="primarySidebar" />
              
            </Toolbar>
          </Header>
          <DrawerSidebar sidebarId="primarySidebar">
            <SidebarContent>
              <NavHeaderMockUp collapsed={sidebar.primarySidebar.collapsed} />
              <MenuList>
                <MenuItem component={Link} to="/admin/productos">
                  Productos
                </MenuItem>
                <MenuItem component={Link} to="/admin/metodos">
                  Metodos de pago
                </MenuItem>
                <MenuItem component={Link} to="/admin/preordenes">
                  Preordenes
                </MenuItem>
              </MenuList>
            </SidebarContent>
            <CollapseBtn />
          </DrawerSidebar>
          <Content>
            <Route path="/admin/productos" component={Productos} />
            <Route path="/admin/producto/:articulo" component={Producto} />
            <Route path="/admin/metodos" component={MetodosDePago} />
            <Route path="/admin/preordenes" component={Preordenes} />
            <Route path="/admin/preorden/:preorden" component={Preorden} />
          </Content>
        </>
      )}
    </Root>
  );
};

export default HomeAdmin;

// import React from 'react';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import { MenuList, MenuItem, Toolbar } from '@material-ui/core';
// import { BrowserRouter, Route, NavLink, Link } from 'react-router-dom';
// import Productos from './productos/productos';
// import Home from '../home';
// import {
//   Root,
//   getHeader,
//   getDrawerSidebar,
//   getSidebarTrigger,
//   getSidebarContent,
//   getCollapseBtn,
//   getContent,
//   getFooter,
//   getInsetContainer,
//   getInsetSidebar,
// } from '@mui-treasury/layout';
// import {
//   HeaderMockUp,
//   NavHeaderMockUp,
//   NavContentMockUp,
//   ContentMockUp,
//   FooterMockUp,
// } from '@mui-treasury/mockup/layout';

// function HomeAdmin() {
//   return (
//     <Root config={defaultLayoutPreset}>
//       {({ headerStyles, sidebarStyles, collapsed }) => (
//         <>
//           <CssBaseline />
//           <Header>
//             <Toolbar>
//               <SidebarTrigger className={headerStyles.leftTrigger}>
//                 <SidebarTriggerIcon />
//               </SidebarTrigger>
//               <HeaderMockUp />
//             </Toolbar>
//           </Header>
//           <Sidebar>
//             <div className={sidebarStyles.container}>
//               <MenuList>
//                 <MenuItem component={Link} to="/admin/home">
//                   Home
//                 </MenuItem>
//                 <MenuItem component={Link} to="/admin/productos">
//                   Productos
//                 </MenuItem>
//               </MenuList>
//             </div>
//             <CollapseBtn className={sidebarStyles.collapseBtn}>
//               <CollapseIcon />
//             </CollapseBtn>
//           </Sidebar>
//           <Content>
//             <Route path="/admin/home" component={Home} exact />
//             <Route path="/admin/productos" component={Productos} />
//           </Content>
//           <Footer>
//             <FooterMockUp />
//           </Footer>
//         </>
//       )}
//     </Root>
//   );
// }

// export default HomeAdmin;
