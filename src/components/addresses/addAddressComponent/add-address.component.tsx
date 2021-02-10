import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useRef,useState } from 'react';
import { useDispatch } from 'react-redux';

import useFetch from '../../../custom-hooks/useFetch';
import useForm from '../../../custom-hooks/useForm';
import { setStatusAlert,StatusAlert } from '../../../utils/snackbar.utils';
import CustomSnackBar from '../../ui-components/custom-snackbar';
import {
  AccordionStyles,
  AccordionSummaryStyles,
  AddAddressStyles,
} from './add-address.styles';
import validateSchema, { IAddress } from './validate-address';

const Accordion = withStyles(AccordionStyles)(MuiAccordion);
const AccordionSummary = withStyles(AccordionSummaryStyles)(
  MuiAccordionSummary
);
const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);
const { REACT_APP_API_URL } = process.env;

export default function CustomizedAccordions() {
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  const [expanded, setExpanded] = useState<string | false>('newAddress');

  const handlePanelChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };

  const addressStyles = AddAddressStyles();

  const {
    values,
    errors,
    isDirty,
    handleChange,
    handleSubmmit,
    resetForm,
  }: {
    values: IAddress;
    errors: any | undefined;
    isDirty: any;
    handleChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleSubmmit: (event: React.MouseEvent) => void;
    resetForm: Function;
  } = useForm(
    {
      alias: '',
      calle: '',
      colonia: '',
      numeroExterior: '',
      numeroInterior: '',
      codigoPostal: '',
      estado: '',
      ciudad: '',
      referencias: '',
    },
    validateSchema,
    submmitAddress
  );
  const [addresses, setAdresses] = useState({});
  const [method, setMethod]: any = useState(null);
  const [
    addressCreated,
    addressCreatedLoading,
    addressCreatedError,
  ]: any = useFetch(`${REACT_APP_API_URL}/direcciones`, 'POST', addresses);

  const [snackStatus, setSnackStatus]: [
    StatusAlert | null,
    Function
  ] = useState(null);
  function removeSnack(){
    setTimeout(()=>{
      setSnackStatus(null)
    },5000)
  }
  useEffect(() => {
    if (!addressCreatedLoading && addressCreated) {
      if (addressCreated.success) {
        dispatch({ type: 'ADDADDRESS', payload: addressCreated.newAddress[0]});
        setSnackStatus(
          setStatusAlert('Dirección añadida con exito', 'success')
        );
      } else {
        setSnackStatus(setStatusAlert(addressCreatedError.error, 'error'));
      }
      removeSnack();
      setAdresses([]);
      resetForm();
    }
  }, [addressCreatedLoading]);

  function submmitAddress() {
    
    setAdresses([{ ...values }]);
  }

  function isValidAndTouched(field: string) {
    if (errors[field].isValid !== true && isDirty[field]) {
      return true;
    } else {
      return undefined;
    }
  }

  return (
    <div>
      <Accordion onChange={handlePanelChange('newAddress')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Añadir un nueva dirección</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form
            className={addressStyles.addAddressForm}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Alias de la dirección"
              name="alias"
              variant="filled"
              value={values.alias}
              onChange={handleChange}
              error={isValidAndTouched('alias')}
              helperText={errors.alias.msg}
            />
            <TextField
              label="Calle"
              name="calle"
              variant="filled"
              value={values.calle}
              onChange={handleChange}
              error={isValidAndTouched('calle')}
              helperText={errors.calle.msg}
            />
            <TextField
              label="Colonia"
              name="colonia"
              value={values.colonia}
              variant="filled"
              onChange={handleChange}
              error={isValidAndTouched('colonia')}
              helperText={errors.colonia.msg}
            />

            <div className={addressStyles.formBox}>
              <TextField
                label="Numero exterior"
                name="numeroExterior"
                variant="filled"
                value={values.numeroExterior}
                onChange={handleChange}
                error={isValidAndTouched('numeroExterior')}
                helperText={errors.numeroExterior.msg}
              />
              <TextField
                label="Numero interior"
                name="numeroInterior"
                variant="filled"
                value={values.numeroInterior}
                onChange={handleChange}
              />
              <TextField
                label="Codigo Postal"
                name="codigoPostal"
                variant="filled"
                value={values.codigoPostal}
                onChange={handleChange}
                error={isValidAndTouched('codigoPostal')}
                helperText={errors.codigoPostal.msg}
              />
            </div>
            <div className={addressStyles.formBox}>
              <TextField
                label="Estado"
                name="estado"
                variant="filled"
                value={values.estado}
                onChange={handleChange}
                error={isValidAndTouched('estado')}
                helperText={errors.estado.msg}
              />
              <TextField
                label="Ciudad"
                name="ciudad"
                value={values.ciudad}
                variant="filled"
                onChange={handleChange}
              />
            </div>
            <TextField
              label="Referencia"
              name="referrencia"
              variant="filled"
              value={values.referencias}
              onChange={handleChange}
            />
            <Button onClick={handleSubmmit}>Añadir dirección</Button>
            {snackStatus ? (
              <CustomSnackBar
                key={new Date().getMilliseconds()}
                status={snackStatus}
              />
            ) : null}
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
