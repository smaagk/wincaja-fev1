import 'react-credit-cards/es/styles-compiled.css';
import React, { useState, useEffect } from 'react';
import cx from 'clsx';
import { Card, TextField } from '@material-ui/core';
import Button from '../ui-components/button';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import Cards from 'react-credit-cards';
import ValidationAdornment from './validation-adornment';
import { validateCVC, validateName } from './payment-validations';
import { useStyles } from './payment-styles';
import cardValidator from 'card-validator';

const cardDataInitialState = {
  cvc: {
    value: '',
    isValid: undefined,
  },
  expiry: {
    value: '',
    isValid: undefined,
  },
  focused: {
    value: undefined,
  },
  name: {
    value: '',
    isValid: undefined,
  },
  number: {
    value: '',
    isValid: undefined,
  },
};
export const PaymentCardComponent = React.memo(function PaymentCard() {
  const styles = useStyles();
  const { button: buttonStyles } = useBlogTextInfoContentStyles();
  const shadowStyles = useOverShadowStyles();
  const [cardData, setCardData] = useState(cardDataInitialState);
  const [validDate, setValidDate] = useState({ month: '', year: '' });

  function handleInputFocus(e) {
    setCardData({ ...cardData, focused: { value: e.target.name } });
  }

  function handleInput(e) {
    const field = e.target;
    setCardData({
      ...cardData,
      [e.target.name]: {
        isValid: validateData(field.name, field.value),
        value: String(e.target.value),
      },
    });
  }

  function validateData(type, value) {
    if (type === 'cvc') {
      return validateCVC(value);
    }

    if (type === 'name') {
      return validateName(value);
    }

    if(type === 'number'){
      const creditCard = cardValidator.number(value);
      return creditCard.isValid
    }
  }

  function isValidAndTouched(field) {
    return !cardData[field].isValid && cardData[field].value !== '';
  }

  function handleInputExpiry(e) {
    if (e.target.name === 'month') {
      setValidDate({ ...validDate, month: e.target.value });
    }

    if (e.target.name === 'year') {
      setValidDate({ ...validDate, year: e.target.value });
    }
  }

  useEffect(() => {
    setCardData({
      ...cardData,
      expiry: {...cardData.expiry, value: `${validDate.month}/${validDate.year}`},
    });
  }, [validDate]);

  return (
    <Card className={cx(styles.root, shadowStyles.root)}>
      <div className={styles.media}>
        <Cards
          cvc={cardData.cvc.value}
          expiry={cardData.expiry.value}
          focused={cardData.focused.value}
          name={cardData.name.value}
          locale={{ valid: 'Válida hasta' }}
          placeholders={{ name: 'Nombre del titular' }}
          number={cardData.number.value}
        />
      </div>
      <div className={styles.payment}>
        <form className={styles.formPayment} noValidate autoComplete="off">
          <TextField
            label="Nombre del titular"
            name="name"
            onChange={handleInput}
            onFocus={handleInputFocus}
            InputProps={{
              endAdornment: (
                <ValidationAdornment status={cardData.name.isValid} />
              ),
            }}
            error={isValidAndTouched('name')}
            variant="outlined"
          />
          <TextField
            label="Numero de la tarjeta"
            name="number"
            onChange={handleInput}
            onFocus={handleInputFocus}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <ValidationAdornment status={cardData.number.isValid} />
              ),
            }}
            error={isValidAndTouched('number')}
          />

          <div className={styles.formBox}>
            <TextField
              label="Mes"
              name="month"
              onFocus={handleInputFocus}
              onChange={handleInputExpiry}
              variant="outlined"
            />
            <TextField
              label="Año"
              name="year"
              onFocus={handleInputFocus}
              onChange={handleInputExpiry}
              variant="outlined"
            />
            <TextField
              onFocus={handleInputFocus}
              onChange={handleInput}
              label="CVC"
              name="cvc"
              variant="outlined"
              type="number"
              InputProps={{
                endAdornment: (
                  <ValidationAdornment status={cardData.cvc.isValid} />
                ),
              }}
              error={isValidAndTouched('cvc')}
            />
          </div>
          <Button
            className={buttonStyles}
            title="Proceder al pago"
            color="deepGreen"
          ></Button>
        </form>
      </div>
    </Card>
  );
});

export default PaymentCardComponent;
