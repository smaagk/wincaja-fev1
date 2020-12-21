/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import * as _ from 'lodash';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function useFetch(
  url: string,
  method: 'GET' | 'POST' | 'DELETE' | null,
  data: any
) {
  const [values, setValues] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);

  let headers = {
    'Content-Type': 'application/json',
    Authorization: '',
  };

  if (token !== null) {
    headers.Authorization = `Bearer ${token}`;
  }

  async function Fetch(url: string, method: string, data: any) {
    try {
      let response = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(data),
      });

      let resData = await response.json();
      console.log(resData);
      setValues(resData);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  }

  useEffect(() => {

    setLoading(true);
    if (url !== null && method !== null && !_.isEmpty(data)) {
      Fetch(url, method, data);
    }
  }, [url, method, data]);

  return [values, loading, error];
}

export default useFetch;
