import ListItem from '@material-ui/core/ListItem'
import React, { forwardRef } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, NavLinkProps } from 'react-router-dom'

export interface AppMenuItemComponentProps {
  className?: string
  link?: string | null // because the InferProps props allows alows null value
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
  onClose?: any
}

const AppMenuItemComponent: React.FC<AppMenuItemComponentProps> = props => {
  const { className, onClick, link, children } = props
  const dispatch = useDispatch();

    function handleDrawer() {
        dispatch({ type: 'DRAWER'});
    }
  // If link is not set return the orinary ListItem
  if (!link || typeof link !== 'string') {
    return (
      <ListItem
        button
        className={className}
        children={children}
        onClick={onClick}
      />
    )
  }

  // Return a LitItem with a link component
  return (
    <ListItem
      button
      className={className}
      children={children}
      onClick={handleDrawer}
      component={forwardRef((props: NavLinkProps, ref: any) => <NavLink exact {...props} innerRef={ref} />)}
      to={link}
    />
  )
}

export default AppMenuItemComponent
