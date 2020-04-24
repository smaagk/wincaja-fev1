import { useState, useEffect } from "react";

function useCustomFetch(url, method, data) {
  const [values, setValues] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  async function customFetch(url, method, data) {
    try {
      let response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
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
    
    if (url !== null) {
      customFetch(url, method, data);
    }
  }, [url]);

  return [values, loading, error];
}

export default useCustomFetch;
