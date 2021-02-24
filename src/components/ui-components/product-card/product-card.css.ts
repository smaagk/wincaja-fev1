import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 304,
    marginTop: 50,
    marginLeft: 25,
    marginRight: 25,
    display: 'flex',
    flexDirection: 'column'
  },
  data:{
    display: 'flex'
  },
  content: {
    padding: 24,
    flex:'auto'
  },
  chip: {
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
  },
  priceChip: {
    backgroundColor: 'rgb(113 164 189)',
    width: '50%',
    height: '40px',
    fontSize: '19px',
    color: 'white',
  },
  chipLabel: {
    color: 'white',
  },
  img: {
    height: 300,
    cursor: 'pointer'
  }
});

export default useStyles;
