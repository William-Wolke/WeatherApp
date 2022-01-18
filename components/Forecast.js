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
    return (
        <View>
            {isPending && <Text>Loading...</Text>}
            {error && <Text>{error}</Text>}
            {data && <View>
                        <View>
                            <Text style={styles.title}>{'Stockholm'}</Text>
                            <Text style={styles.temp}>{parseInt(data.main.temp)-273}&deg; C</Text>
                            <View>
                              <Image
                                style={{width: 252, height: 252}}
                                source={{uri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.svgrepo.com%2Fsvg%2F353655%2Fdiscord-icon&psig=AOvVaw1Yj6Khd5hZQHW3yogOv-ac&ust=1642585442526000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNCc5eCBu_UCFQAAAAAdAAAAABAn'}}
                              />
                            </View>
                        </View>
                        <View>
                          <Text style={styles.data}></Text>
                          <Text style={styles.data}>Känns som: {parseInt(data.main.feels_like)-273} C</Text>
                          <Text style={styles.data}>Vindhastighet: {data.wind.speed} m/s</Text>
                          <Text style={styles.data}>Luftfuktighet: {data.main.humidity}%</Text>
                        </View>
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
        float: 'right',
      },
});

export default Forecast;