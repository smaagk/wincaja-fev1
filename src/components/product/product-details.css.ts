import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display:' inline-flex',
        flexDirection: 'column'
    },
    description: {
        width: '100%',
        margin: 'auto',
        textAlign: 'left',
        padding: '1em'
    },
    container: {
        display: 'flex',
        flexDirection: 'row'
    }
});

export default useStyles;
