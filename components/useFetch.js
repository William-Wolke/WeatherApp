import React from 'react';
import {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';

const useFetch = (city) => {

    axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + city +'&appid=1ad054194d54fb7b0bfb21fb6af41878')

    return {};
}