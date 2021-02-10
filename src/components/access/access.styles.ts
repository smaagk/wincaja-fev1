import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    margin : "auto",
    maxWidth: "400px"
  },
  loginContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "start",
    flexDirection: "column",
    padding: "30px",
  },
  inputLogin : {
    margin : "20px"
  }
});

export default useStyles;