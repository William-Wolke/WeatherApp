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
  ActivityIndicator,
  Image,
} from 'react-native/Libraries/NewAppScreen';
import useFetch from './useFetch';

const Forecast = () => {

    const {data, isPending, error} = useFetch('stockholm');
    /*var url = ";*/
    return (
        <View>
            {isPending && <Text>Loading...</Text>}
            {error && <Text>{error}</Text>}
            {data && <View>
                        <View>
                            <Text style={styles.title}>{'Stockholm'}</Text>
                            <Text style={styles.temp}>{parseInt(data.main.temp)-273}&deg; C</Text>
                            
                            {/*<Image 
                              source={{uri:"http://openweathermap.org/img/wn/" + data.weather.icon + "@2x.png"}}
                              style={styles.icon}
                            />*/}
                        </View>
                        
                        <Text style={styles.data}>{data.weather[0].main}</Text>
                        <Text style={styles.data}>Känns som: {parseInt(data.main.feels_like)-273} C</Text>
                        <Text style={styles.data}>Vindhastighet: {data.wind.speed} m/s</Text>
                        <Text style={styles.data}>Luftfuktighet: {data.main.humidity}%</Text>
                    </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        margin: '2%',
        fontSize: 24,
        marginBottom: '10%',
        marginTop: '10%',
      },
      temp: {
      margin: '2%',
      fontSize: 64,
      marginBottom: '40%',
    },
      data: {
          margin: '2%',
        textAlign: 'center',
      },
      icon: {
        width: '50%',
        height: 'auto',
        float: 'right',
      },
});

export default Forecast;