import { makeStyles } from "@material-ui/core/styles";

export const confirmationStyles = makeStyles({
  confirmationContainer : {
    margin: 'auto',
    width: '40%',
    marginTop: '180px'
  },
  cardConfirmation: {
      display: 'flex',
      height: '400px'
  },
  imageConfirmation: {
    padding: '3em'
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

export default confirmationStyles;