import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles,makeStyles } from '@material-ui/core/styles';
import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react'
import { useDispatch } from 'react-redux';

import AppMenuItemComponent from './menu-item.component';

// React runtime PropTypes
export const AppMenuItemPropTypes = {
    name: PropTypes.string.isRequired,
    link: PropTypes.string,
    Icon: PropTypes.elementType,
    items: PropTypes.array,
    actions: PropTypes.string,
};

// TypeScript compile-time props type, infered from propTypes
// https://dev.to/busypeoples/notes-on-typescript-inferring-react-proptypes-1g88
type AppMenuItemPropTypes = PropTypes.InferProps<typeof AppMenuItemPropTypes>;
type AppMenuItemPropsWithoutItems = Omit<AppMenuItemPropTypes, 'items'>;

// Improve child items declaration
export type AppMenuItemProps = AppMenuItemPropsWithoutItems & {
    items?: AppMenuItemProps[];
};

const AppMenuItem: React.FC<AppMenuItemProps> = (props) => {
    const { name, Icon, items = [] } = props;
    const classes = useStyles();
    const isExpandable = items && items.length > 0;
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    function handleClick() {
        console.log(props);
        if (props.actions) {
            handleAction(props.actions);
        }
        setOpen(!open);
    }

    function handleAction(action: string) {
        dispatch({ type: action });
    }

    const MenuItemRoot = (
        <AppMenuItemComponent  className={classes.menuItem} onClick={handleClick}>
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
    );

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
            {MenuItemRoot}
            {MenuItemChildren}
        </>
    );
};

AppMenuItem.propTypes = AppMenuItemPropTypes;

const useStyles = makeStyles((theme) =>
    createStyles({
        menuItem: {},
        menuItemIcon: {
            color: '#97c05c',
        },
    })
);

export default AppMenuItem;
