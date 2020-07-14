/* eslint-disable react-hooks/exhaustive-deps */
import { useState, ChangeEvent, useEffect, useRef } from 'react';
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

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setDirty({ ...isDirty, [name]: true });
  };

  const handleSubmmit = (event: React.MouseEvent) => {
    event.preventDefault();

    if (!Object.values(errors).every((item: any) => item.isValid)) {
      return callback();
    }

    return false;
  };

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
  };
};

export default useForm;
