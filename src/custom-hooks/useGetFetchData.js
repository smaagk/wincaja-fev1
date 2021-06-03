/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function useGetFetchData(url, params) {
  const [values, setValues] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const token = useSelector((state) => state.auth.token);

  async function customFetch(url, params) {
    const _params = new URLSearchParams(params);
    const _url = `${url}?${_params}`;
    try {
      let response = await fetch(_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include'
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
    if (url !== null && params !== null) {
      customFetch(url, params);
    }
  }, [params]);

  return [values, loading, error];
}

export default useGetFetchData;
