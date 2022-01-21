import React, {useState, useEffect, Fragment} from 'react';
import {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
  ActivityIndicator,
} from 'react-native/Libraries/NewAppScreen';
import getWeather from './getWeather';
import blatantStealing from './blatantStealing.json';
import useUnixTime from './useUnixTime';

const Forecast = () => {
  const [data, setData] = useState('');
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(false);
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');

  useEffect(() => {
    const { data: newData, isPending, error: newError } = getWeather('stockholm')
      .then(() => {
        setData(newData);
        setPending(isPending);
        setError(newError);
        setSunrise(useUnixTime(data.sys.sunrise));
        setSunset(useUnixTime(data.sys.sunset));
      })
      .catch(error => {
        setError(error);
        throw error;
      });
  }, []);

  return (
    <React.Fragment>
      {pending && <Text>Loading...</Text>}
      {error && <Text>{error.message}</Text>}
      <Text>{data && (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{'Stockholm'}</Text>
              <Text style={styles.temp}>
                {parseInt(data.main.temp) - 273}&deg; C
              </Text>
            </View>

            <View style={styles.iconContainer}>
              {blatantStealing.map((item, index) => {
                if (item.name === data.weather[0].icon) {
                  return (
                    <Image
                      style={styles.icon}
                      source={{uri: item.link}}
                      key={index}
                    />
                  );
                }
              })}
            </View>
          </View>

          <View>
            <Text style={styles.data}></Text>
            <Text style={styles.data}>
              Känns som: {parseInt(data.main.feels_like) - 273} C
            </Text>
            <Text style={styles.data}>
              Vindhastighet: {data.wind.speed} m/s
            </Text>
            <Text style={styles.data}>
              Luftfuktighet: {data.main.humidity}%
            </Text>
          </View>

          <View style={styles.line}></View>
          <View>
            <View>
              <Text>Soluppgång</Text>
              <Text>{sunrise}</Text>
            </View>
            <View>
              <Text>Solnedgång</Text>
              <Text>{sunset}</Text>
            </View>
          </View>
          <View>
            <View>
              <Image />
              <Text></Text>
              <Text></Text>
            </View>
            <View>
              <Image />
              <Text></Text>
              <Text></Text>
            </View>
            <View>
              <Image />
              <Text></Text>
              <Text></Text>
            </View>
          </View>
        </View>
      )}</Text>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'white',
    marginTop: '15%',
    backgroundColor: '#74acdb',
    height: '100%',
    width: '100%',
  },
  header: {
    marginTop: '5%',
    display: 'flex',
    flexDirection: 'row',
  },
  titleContainer: {
    margin: '5%',
  },
  title: {
    margin: '2%',
    fontSize: 24,
    marginBottom: '10%',
    marginTop: '10%',
    color: '#FFF',
  },
  iconContainer: {
    marginLeft: '14%',
    marginTop: '9%',
  },
  temp: {
    margin: '2%',
    fontSize: 64,
    marginBottom: '40%',
    color: '#FFF',
  },
  data: {
    margin: '2%',
    textAlign: 'center',
    color: '#FFF',
  },
  icon: {
    width: 128,
    height: 128,
  },
  line: {
    width: '80%',
    marginRight: '10%',
    marginLeft: '10%',
    marginTop: '5%',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
  },
});

export default Forecast;
