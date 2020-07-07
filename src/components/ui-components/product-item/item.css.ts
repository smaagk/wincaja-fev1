import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root:{
    marginBottom:20
  },
  image: {
    width: 75,
    height: 75,
    marginRight:'auto',
    ['@media (max-width:1000px)'] : { // eslint-disable-line no-useless-computed-key
      display : 'none'
    }
   
  },
  itemContainer:{
      display: 'flex',
      alignItems: 'center',
      justifyContent:'space-between',
      padding:15,
      flexWrap:'wrap-reverse'
  },
  marginItem:{
    marginRight: 15,
    marginLeft: 5
  },
  qty: {
      pointerEvents:'none'
  },
  price: {
    color: '#1aad3b',
    fontWeight: 600
  },
  name: { // eslint-disable-line no-useless-computed-key
    maxWidth: 170,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});

export default useStyles;
