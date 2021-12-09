import { makeStyles } from "@material-ui/core/styles";

export const confirmationStyles = makeStyles({
  // center container for the confirmation page
  confirmationContainer : {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "70%",
    margin: "auto",
    padding: "2rem",
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