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
    color: 'white',
  },
  chipLabel: {
    color: 'white',
  },
});

export default useStyles;
