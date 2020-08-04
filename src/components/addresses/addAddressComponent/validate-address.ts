export interface IAddress {
  alias: string;
  calle: string;
  colonia: string;
  numeroExterior: string;
  numeroInterior: string;
  codigoPostal: string;
  estado: string;
  ciudad: string;
  referencias: string;
}

export interface inputValid {
  isValid: boolean;
  msg: string;
}
export interface IAddressErrors {
  alias: inputValid;
  calle: inputValid;
  colonia: inputValid;
  numeroExterior: inputValid;
  codigoPostal: inputValid;
  estado: inputValid;
}
export default function validateAddress(values: IAddress) {
  const initialErrorState = { isValid: false, msg: '' };
  let errors: IAddressErrors = {
    calle: { ...initialErrorState },
    colonia: { ...initialErrorState },
    numeroExterior: { ...initialErrorState },
    codigoPostal: { ...initialErrorState },
    estado: { ...initialErrorState },
    alias: { ...initialErrorState },
  };

  if (values.calle.trim() === '') {
    errors.calle.msg = 'La calle es requerida';
  } else {
    errors.calle.isValid = true;
  }

  if (values.colonia.trim() === '') {
    errors.colonia.msg = 'La colonia es requerida';
  } else {
    errors.colonia.isValid = true;
  }

  if (values.numeroExterior.trim() === '') {
    errors.numeroExterior.msg = 'El número es requerido';
  } else {
    errors.numeroExterior.isValid = true;
  }

  if (values.codigoPostal.trim() === '') {
    errors.codigoPostal.msg = 'El código es requerido';
  } else {
    errors.codigoPostal.isValid = true;
  }

  if (values.estado.trim() === '') {
    errors.estado.msg = 'El estado es requerido';
  } else {
    errors.estado.isValid = true;
  }

  if (values.alias.trim() === '') {
    errors.alias.msg = 'El alias de la dirección es requerido';
  } else {
    errors.alias.isValid = true;
  }

  return errors;
}
