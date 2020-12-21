import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 304,
    marginTop: 50,
    marginBottom: 50,
    margin: 'auto'
  },
  data:{
    display: 'flex'
  },
  content: {
    padding: 24,
    flex:'auto',
    margin: 'auto'
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
