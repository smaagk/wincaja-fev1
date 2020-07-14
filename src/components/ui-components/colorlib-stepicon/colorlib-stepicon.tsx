import React from 'react'
import clsx from 'clsx';
import { StepIconProps } from "@material-ui/core";
import { useColorlibStepIconStyles } from "../../buy-process/buy-process.styles";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import PaymentIcon from '@material-ui/icons/Payment';
export function ColorlibStepIcon(props: StepIconProps) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;
  
    const icons: { [index: string]: React.ReactElement } = {
      1: <ShoppingCartIcon />,
      2: <ContactMailIcon />,
      3: <PaymentIcon />,
    };
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }