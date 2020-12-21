import React from 'react';
import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';

export interface INestedMenu {
    open: boolean;
    nested: string;
    title: string;
}
function NestedMenu(props: INestedMenu) {
    return (
        <Collapse in={props.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem button className={props.nested}>
                    <ListItemText primary={props.title} />
                </ListItem>
            </List>
        </Collapse>
    );
}

export default NestedMenu;
