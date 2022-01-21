import {useEffect, useState} from 'react';
import {Node} from 'react';
import keys from '../secrets/keys.json';
import axios from 'axios';

const getWeather = async city => {
  var url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    city +
    '&appid=' +
    keys.openweatherKey;

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");

  const res = await axios
    .get(url)
    .then(() => {
      if (!res.ok) {
        setError('could not fetch data for that recource');
      } else {
        console.log(res.data)
        setData(res.data);
        setIsPending(false);
        setError(null);
      }
    })
    .catch(error => {
      setIsPending(false);
      setError(error.message);
      throw error;
    });

  return {data, isPending, error};
};

export default getWeather;
