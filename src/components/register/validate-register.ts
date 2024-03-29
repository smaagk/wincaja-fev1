export interface IRegister {
  passwordConfirmation: string;
  password: string;
  email: string;
  nombre: string
  apellidop: string,
  telefono: string
}

export interface inputValid {
  isValid: boolean;
  msg: string;
}
export interface IRegisterErrors {
  email: inputValid;
  password: inputValid
  passwordConfirmation: inputValid;
  nombre: inputValid;
  apellidop: inputValid,
  telefono: inputValid
}
export default function validateRegister(values: IRegister) {
  const initialErrorState = { isValid: false, msg: '' }
  let errors: IRegisterErrors = {
    email: {...initialErrorState},
    password:  {...initialErrorState},
    passwordConfirmation :  {...initialErrorState},
    nombre: {...initialErrorState},
    apellidop: {...initialErrorState},
    telefono: {...initialErrorState}
  };
  if (values.email === '') {
    errors.email.msg = 'El correo electronico es requerido';
  } else if (!/\S+@\S+\.\S+/.test(values.email) && values.email !== '') {
    errors.email.msg = 'El correo electónico tiene un formato incorrecto';
  } else {
    errors.email.isValid = true;
  }

  if (values.password === '') {
    errors.password.msg = 'La contraseña es requerida'
  }else{
      errors.password.isValid = true
  }

  if(values.passwordConfirmation !== values.password && values.passwordConfirmation !== ''){
      errors.passwordConfirmation.msg = 'Las contraseñas no coinciden'
  }else{
      errors.passwordConfirmation.isValid = true
  }

  if (values.nombre === '') {
    errors.nombre.msg = 'El nombre es requerido'
  }else{
      errors.nombre.isValid = true
  }

  if (values.apellidop === '') {
    errors.apellidop.msg = 'El apellido es requerido'
  }else{
      errors.apellidop.isValid = true
  }

  if (values.telefono === '') {
    errors.telefono.msg = 'El telefono es requerido'
  }else if(!/^[0-9]{10}$/.test(values.telefono) && values.telefono !== ''){
    errors.telefono.msg = 'El telefono tiene un formato incorrecto'
  }else{
      errors.telefono.isValid = true
  }

  return errors;
}
