import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
// import { SvgIconProps } from '@material-ui/core/SvgIcon'
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';

import AppMenuItemComponent from './AppMenuItemComponent';

// React runtime PropTypes
export const AppMenuItemPropTypes = {
    name: PropTypes.string.isRequired,
    link: PropTypes.string,
    Icon: PropTypes.elementType,
    items: PropTypes.array,
    onClose: PropTypes.func,
};

// TypeScript compile-time props type, infered from propTypes
// https://dev.to/busypeoples/notes-on-typescript-inferring-react-proptypes-1g88
type AppMenuItemPropTypes = PropTypes.InferProps<typeof AppMenuItemPropTypes>;
type AppMenuItemPropsWithoutItems = Omit<AppMenuItemPropTypes, 'items'>;

// Improve child items declaration
export type AppMenuItemProps = AppMenuItemPropsWithoutItems & {
    items?: AppMenuItemProps[];
    action?: string;
};

const AppMenuItem: React.FC<AppMenuItemProps> = (props) => {
    const dispatch = useDispatch();
    const { name, link, Icon, items = [], onClose } = props;
    const classes = useStyles();
    const isExpandable = items && items.length > 0;
    const [open, setOpen] = React.useState(false);
    const isAuthenticated: boolean = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );
    const AuthMenu = ['Mis Pedidos', 'Cerrar sesión'];

    function handleClick() {
        if (props.action && props.action === 'LOGOUT') {
            dispatch({ type: props.action });
            dispatch({ type: 'CLEANCART' })
        }

        setOpen(!open);
    }

    const MenuItemRoot =  (
            <AppMenuItemComponent
                className={classes.menuItem}
                link={link}
                onClick={handleClick}
            >
                {/* Display an icon if any */}
                {!!Icon && (
                    <ListItemIcon className={classes.menuItemIcon}>
                        <Icon />
                    </ListItemIcon>
                )}
                <ListItemText primary={name} inset={!Icon} />
                {/* Display the expand menu if the item has children */}
                {isExpandable && !open && <IconExpandMore />}
                {isExpandable && open && <IconExpandLess />}
            </AppMenuItemComponent>
        )

    const MenuItemRootGuest = !AuthMenu.includes(props.name) ? (
      <AppMenuItemComponent
          className={classes.menuItem}
          link={link}
          onClick={handleClick}
      >
          {/* Display an icon if any */}
          {!!Icon && (
              <ListItemIcon className={classes.menuItemIcon}>
                  <Icon />
              </ListItemIcon>
          )}
          <ListItemText primary={name} inset={!Icon} />
          {/* Display the expand menu if the item has children */}
          {isExpandable && !open && <IconExpandMore />}
          {isExpandable && open && <IconExpandLess />}
      </AppMenuItemComponent>
  ) : <></>;
    
    const AuthMenuRoot = isAuthenticated ? MenuItemRoot : MenuItemRootGuest;

    const MenuItemChildren = isExpandable ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
                {items.map((item, index) => (
                    <AppMenuItem {...item} key={index} />
                ))}
            </List>
        </Collapse>
    ) : null;

    return (
        <>
            {AuthMenuRoot}
            {MenuItemChildren}
        </>
    );
};

const useStyles = makeStyles((theme) =>
    createStyles({
        menuItem: {
            '&.active': {
                background: 'rgba(0, 0, 0, 0.08)',
                '& .MuiListItemIcon-root': {
                    color: '#fff',
                },
            },
        },
        menuItemIcon: {
            color: '#97c05c',
        },
    })
);

export default AppMenuItem;
