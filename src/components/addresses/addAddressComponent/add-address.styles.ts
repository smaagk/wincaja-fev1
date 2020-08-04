import { withStyles, makeStyles, Theme } from '@material-ui/core';

export const AccordionStyles = {
  root: {
    border: '10px solid rgba(0, 0, 0, .125)',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
};

export const AccordionSummaryStyles = {
  root: {
    backgroundColor: '#3569bb',
    color: 'white',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
    fontFamily: "'Lato', sans-serif",
  },
  expanded: {},
};

export const AddAddressStyles = makeStyles((theme) => ({
  addAddressForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    '& .MuiFormControl-root': {
      marginTop: 15,
      marginLeft: 10,
    },
    '& .MuiButtonBase-root': {
      marginTop: 15,
    },
  },
  formBox: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
