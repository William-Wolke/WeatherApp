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
  Button,
  Image,
  Dimensions,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import getWeather from './getWeather';
import blatantStealing from './blatantStealing.json';
import useUnixTime from './useUnixTime';

const Forecast = () => {
  const dimensions = Dimensions.get('window');

  const [data, setData] = useState('');
  const [error, setError] = useState(null);
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [location, setLocation] = useState('Stockholm');
  const [locationInput, setLocationInput] = useState('');

  const handleInputChange = () => {
    Keyboard.dismiss;
    setLocation(locationInput);
  };

  useEffect(() => {
    getWeather(location)
      .then(res => {
        setData(res.data);
        /*const tempRise = useUnixTime(data.sys.sunrise);
      const tempSet = useUnixTime(data.sys.sunset);
      setSunrise(tempRise);
      setSunset(tempSet);*/
      })
      .catch();
  }, [location]);

  return (
    <React.Fragment>
      <Text>
        {!data && <Text>Loading...</Text>}
        {error && <Text>{error.message}</Text>}
      </Text>
      <Text>
        {data && (
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{location}</Text>
                <Text style={styles.temp}>
                  {Math.floor(data.main.temp)}&deg; C
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
                Känns som: {Math.floor(data.main.feels_like)}&deg; C
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
              {/* <View>
              <Text>Soluppgång</Text>
              <Text>{sunrise}</Text>
            </View>
            <View>
              <Text>Solnedgång</Text>
              <Text>{sunset}</Text>
            </View> */}
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
            <View style={styles.InputContainer}>
              <TextInput
                style={styles.input}
                value={locationInput}
                onChangeText={text => setLocationInput(text)}>
              </TextInput>
              <TouchableOpacity
              
                onPress={handleInputChange}>
                <View style={styles.addWrapper}>
                  <Text>Set</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Text>
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
  InputContainer: {
    alignItems: 'center',
  },
  input: {
    width: '80%',
    paddingVertical: '5%',
    paddingHorizontal: '5%',
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginBottom: '8%',
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
});

export default Forecast;
