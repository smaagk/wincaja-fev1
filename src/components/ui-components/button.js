import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";


const buttonColors = {
  deepGreen : 'linear-gradient(45deg, #71bd9e 30%, #71bd9e 90%)',
  deepOrange : 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  deepRed : 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
}
const useStyles = makeStyles({
  root: props => ({
    background: buttonColors[props.color],
    border: 0,
    borderRadius: 3,
    color: "white",
    height: props.height ? props.height : 40,
    padding: "0 30px",
    margin: props.margin ? props.margin : "20px",
    whiteSpace: props.whiteSpace ? props.whiteSpace : 'nowrap'
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
export const CustomButton = MyButton;
export default MyButton;
