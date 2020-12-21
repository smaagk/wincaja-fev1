import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from '@material-ui/core/styles';
import StepConnector from '@material-ui/core/StepConnector';

export const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(57, 91, 211) 0%, rgb(50, 121, 162) 50%, rgb(35, 155, 213) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(57, 91, 211) 0%, rgb(50, 121, 162) 50%, rgb(35, 155, 213) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

export const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(57, 91, 211) 0%, rgb(50, 121, 162) 50%, rgb(35, 155, 213) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }, 
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(57, 91, 211) 0%, rgb(50, 121, 162) 50%, rgb(35, 155, 213) 100%)',
  },
});

export const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepper: {
    background: '#fafafa'
  }
}),
);
