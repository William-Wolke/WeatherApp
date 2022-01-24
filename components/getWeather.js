import {useEffect, useState} from 'react';
import keys from '../secrets/keys.json';
import axios from 'axios';

const getWeather = async (city) => {
  var url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    city +
    '&units=metric' +
    '&appid=' +
    keys.openweatherKey ;

      var data = '';
      var error = null;

    const res = await axios
      .get(url)
      .then((respons) => {
          data = respons.data;
          error = null;
      })
      .catch(newError => {
        error = newError.message;
        throw error;
      });

  return {data, error};
};

export default getWeather; 
