import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    //stock info chip with green when is avail and red when not
    stockAvailChip: {
        color: theme.palette.success.main,
        fontSize: '0.8rem',
        fontWeight: 'bold',
        padding: '0.2rem 0.5rem',
        borderRadius: '0.5rem',
        margin: '0.5rem 0.5rem 0 0'
    },
    stockAvailChipCero: {
        color: theme.palette.error.main,
        fontSize: '0.8rem',
        fontWeight: 'bold',
        padding: '0.2rem 0.5rem',
        borderRadius: '0.5rem',
        margin: '0.5rem 0.5rem 0 0'
    },
}));

export default useStyles;