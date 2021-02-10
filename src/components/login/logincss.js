import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    margin : "auto",
    height: "600px",
    maxWidth: "400px"
  },
  loginContainer: {
    height: "300px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "30px",
  },
  inputLogin : {
    margin : "20px"
  }
});

export default useStyles;