import { makeStyles } from "@material-ui/core/styles";

const registerStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    margin : "auto",
    height: "600px",
    width: "400px"
  },
  loginContainer: {
    height: "300px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "30px",
  },
  input : {
    margin : "10px"
  }
});

export default registerStyles;