/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import * as _ from 'lodash';

function useUploadFile(url, data, articulo) {
  const [values, setValues] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  async function customFetch(url, data, articulo) {
    const formData = new FormData();
    formData.append('articulo', articulo);
    formData.append('file', data);
    

    try {
      let response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      console.log(formData)
      let resData = await response.json();
      setValues(resData);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    if (url !== null && !_.isEmpty(data)) {
      customFetch(url, data, articulo);
    }
  }, [url, data]);

  return [values, loading, error];
}

export default useUploadFile;
