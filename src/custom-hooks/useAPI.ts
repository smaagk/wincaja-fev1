import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface Options {
  method: string;
  body?: any;
  headers?: { [key: string]: string };
}

function useAPI(
  url: string,
  method: string,
  data: any
): { responseData: any; error: any; isLoading: boolean } {
  // Get the bearer token from the Redux store
  const bearerToken = useSelector((state: any) => state.auth.token);

  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    setIsLoading(true);
    try {
      // Set the options object
      const options: Options = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearerToken}`,
        }
      };
      // Set the body of the request if the method is POST
      if (method === 'POST') {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(url, options);
      const json = await response.json();
      setResponseData(json);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }


  useEffect(() => {
    // Check if the url, method, data, and bearerToken are not null
    if (url && method && data && bearerToken) {
      fetchData();
    }
  }, [url, method, data, bearerToken]);

  return { responseData, error, isLoading };
}

export default useAPI;