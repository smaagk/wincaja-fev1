import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(({ breakpoints, spacing }) => ({
    root: {
      margin: 'auto',
      borderRadius: spacing(2), // 16px
      transition: '0.3s',
      boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
      position: 'relative',
      maxWidth: 600,
      marginLeft: 'auto',
      overflow: 'initial',
      background: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: spacing(2),
      [breakpoints.up('md')]: {
        flexDirection: 'row',
        padding: 60,
      },
    },
    media: {
      width: '88%',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: spacing(2),
      position: 'relative',
      [breakpoints.up('md')]: {
        width: '100%',
        marginLeft: spacing(-3),
        marginTop: 0,
        transform: 'translate(-40%,0%)',
      },
      '&:after': {
        content: '" "',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: spacing(2), // 16
        opacity: 0.5,
      },
    },
    content: {
      padding: 24,
    },
    cta: {
      marginTop: 24,
      textTransform: 'initial',
    },
    payment: {
      display: 'flex',
      width: '50%',
      position: 'relative',
      [breakpoints.up('md')] : {
        position : 'absolute',
        left: '40%',
      }
    },
    formPayment: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      '& .MuiFormControl-root': {
        marginTop: 15,
        marginLeft: 10,
      },
      '& .MuiButtonBase-root': {
        marginTop: 15,
      },
    },
    formBox: {
      display: 'flex',
    },
  }));