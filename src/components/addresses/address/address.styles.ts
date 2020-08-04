import { makeStyles } from '@material-ui/core/styles';

const useAddressStyles = makeStyles({
    container : {
        maxWidth : 520,
        margin: 'auto',
        display : 'flex',
        flexDirection : 'column',
        marginBottom:20,
    },
    header : {
       display : 'flex',
       alignItems: 'center',
       justifyContent: ' space-between',
       fontFamily: "'Lato', sans-serif"

    },
    address : {
        display : 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        textAlign: 'start',
        fontSize: '1.6em',
        lineHeight: 1.4,
        fontFamily: "'Lato', sans-serif"
    },
    addressSection :{
        minWidth: 200
    }
});

export default useAddressStyles;