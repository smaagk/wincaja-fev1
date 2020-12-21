/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import * as _ from 'lodash';

function useFetchOpenPay(
  url: string,
  data: any
) {
  const [values, setValues] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let headers = {
    'Content-Type': 'application/json',
    Authorization: 'Basic cGtfMTgwMjE2ZmEyNTY5NGI3NjhjMmM0YzNlNGZkNjM4NjM6',
  };

  async function Fetch(url: string, data: any) {
    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });

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
    if (url !== null  && !_.isEmpty(data)) {
      Fetch(url, data);
    }
  }, [url, data]);

  return [values, loading, error];
}

export default useFetchOpenPay;