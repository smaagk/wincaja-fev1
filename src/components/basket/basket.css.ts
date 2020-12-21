import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  items: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 900,
  },
  title: {
    textAlign: 'start',
  },
  container: {
    width: '70%',
    margin: 'auto',
    display: 'flex',
    justifyContent : 'space-evenly',
    flexDirection: 'column-reverse',
    [breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  total: {
    padding: 15,
    [breakpoints.up('md')]: {
      marginTop: 65,
      marginLeft: 20,
      maxHeight:250
    },
  },
  subtotal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1aad3b',
    fontWeight: 600,
    fontSize: 25,
    
  },
}));

export default useStyles;
