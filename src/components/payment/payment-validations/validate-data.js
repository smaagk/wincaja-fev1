import { validateCVC, validateName, validateMonth, validateYear } from '.'
import cardValidator from 'card-validator';


export function validateData(type, value) {
    if (type === 'cvc') {
        return validateCVC(value);
    }

    if (type === 'name') {
        return validateName(value);
    }

    if (type === 'number') {
        const creditCard = cardValidator.number(value);
        return creditCard.isValid;
    }

    if (type === 'month') {
        return validateMonth(value);
    }

    if (type === 'year') {
        return validateYear(value);
    }
}