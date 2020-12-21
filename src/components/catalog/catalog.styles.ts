import { makeStyles } from "@material-ui/core/styles";

export const catalogStyles = makeStyles({
  searchInput: {
    display: "flex",
    alignItems: "center",
    margin : "auto",
    background: 'blue'
  },
  topBarContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    padding: '10px'
  }
});

export default catalogStyles;