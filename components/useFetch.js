import React, {useEffect, useState} from 'react';
import {Node} from 'react';
import keys from '../secrets/keys.json';


const useFetch = (city) => {
  var url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    city +
    '&appid=' +
    keys.openweatherKey;

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw Error('could not fetch data for that recource');
        }
        return res.json();
      })
      .then(data => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch(error => {
        if (error.name === 'AbortError') {
        } else {
          setIsPending(false);
          setError(error.message);
        }
      });

    return () => abortCont.abort();
  }, [url]);

  return {data, isPending, error};
};

export default useFetch;
