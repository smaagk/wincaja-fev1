import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ColorlibConnector, useStyles } from './buy-process.styles';
import { ColorlibStepIcon } from '../ui-components/colorlib-stepicon/colorlib-stepicon';
import Basket from '../basket/basket';
import PaymentComponent from '../payment/payment.component';
import AddressesComponent from '../addresses/addresses'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

function getSteps() {
  return ['Revisa tu carrito', 'Dirección de envio', 'Pago'];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <Basket />;
    case 1:
      return <AddressesComponent/>;
    case 2:
      return <PaymentComponent />;
    default:
      return 'Unknown step';
  }
}

export default function CustomizedSteppers() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const activeStep: { step: number } = useSelector(
    (state: RootState) => state.step
  );
  const steps = getSteps();

  const handleStep = (step: number) => () => {
    dispatch({
      type: 'STEP',
      payload: step,
    });
  };
  
  return (
    <div className={classes.root}>
      <Stepper
        className={classes.stepper}
        alternativeLabel
        nonLinear
        activeStep={activeStep.step}
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              style={{ cursor: 'pointer' }}
              onClick={handleStep(index)}
              StepIconComponent={ColorlibStepIcon}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep.step === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
          </div>
        ) : (
          <div>
            <Typography component={'span'} className={classes.instructions}>
              {getStepContent(activeStep.step)}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
