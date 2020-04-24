import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: props => ({
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: props.height ? props.height : 40,
    padding: "0 30px",
    margin: "20px"
  })
});

function MyButton(props) {
  const classes = useStyles(props);
  return (
    <div>
      <Button className={classes.root} onClick={props.onClick}>{props.title}</Button>
    </div>
  );
}

export default MyButton;
