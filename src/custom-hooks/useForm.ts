/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useRef,useState } from 'react';
import { callbackify } from 'util';

const useForm = (
  initialValues: any,
  validateSchema: Function,
  callback: Function
) => {
  const firstRender = useRef(true);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [isDirty, setDirty] = useState(initialValues);
  const [isSubmmiting, setSubmmiting] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> 
  ) => {
    const { name, value } = event.target;
    setSubmmiting(false);
    setValues({ ...values, [name]: value });
    setDirty({ ...isDirty, [name]: true });
  };

  const handleSubmmit = (event: React.MouseEvent) => {
    event.preventDefault();
    setSubmmiting(true);
    setErrors(validateSchema(values));
    let allDirty = {};
    const dirt = new Promise<void>((resolve, reject) => {
      Object.keys(isDirty).forEach((name, index) => {
        allDirty = { ...allDirty, [name]: true };
        if (index === Object.entries(isDirty).length - 1) resolve();
      });
    });

    dirt.then(() => {
      setDirty(allDirty)
    });
  };

  const resetForm = ()=>{
    setValues(initialValues);
    setDirty(initialValues)
  }

  useEffect(() => {
    if (
      Object.values(errors).every((item: any) => item.isValid) &&
      isSubmmiting === true
    ) {
      return callback(); 
    }

    setSubmmiting(false);
  }, [errors]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setErrors(validateSchema(values));
  }, [values]);

  return {
    values,
    errors,
    isDirty,
    handleChange,
    handleSubmmit,
    resetForm
  };
};

export default useForm;
