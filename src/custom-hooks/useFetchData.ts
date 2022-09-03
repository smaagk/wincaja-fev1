/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

function useFetchData(url: string, params?: URLSearchParams) {
  const [values, setValues] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state : RootState) => state.auth.token);
  const [refetchIndex, setRefetchIndex] = useState(0)

  const refetch = () => setRefetchIndex((prevRefetchIndex) => prevRefetchIndex + 1)

  async function customFetch(url: string, params?: URLSearchParams) {
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
      setError(e as any);
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    if (url !== null) {
      customFetch(url, params);
    }
  }, [url, params, refetchIndex]);

  return [values, loading, error, refetch];
}

export default useFetchData;