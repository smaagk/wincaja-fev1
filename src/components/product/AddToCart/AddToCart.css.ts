import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        maxWidth: '540px',
        margin: 'auto',
    },
    title: {
        color: '#71bd9e',
        fontWeight: 'bold',
        fontSize: '55px',
    },
    priceBox: {
        display: 'flex',
        margin: 'auto',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: '4em',
    },
    price: {
        fontSize: '36px',
        lineHeight: '36px',
        color: '#71bd73',
        fontWeight: 'bold',
        marginTop: '15px',
        marginBottom: '15px',
    },
    counter: {
        
    }
});

export default useStyles;
