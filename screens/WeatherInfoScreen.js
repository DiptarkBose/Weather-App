import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { VStack, Box, Divider, NativeBaseProvider, Link, Text, ScrollView, HStack } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import * as Location from 'expo-location'

export default WeatherNewsScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [city, setCity] = useState(null);
  const [info, setInfo] = useState(null);
  const [forecast, setForecast] = useState(null);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const appId = "OPEN_WEATHER_APP_KEY";

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let city = await Location.reverseGeocodeAsync(location.coords)
      setLocation(location);
      setCity(city[0].city);
    })();
  }, []);

  const getWeatherInfo = async () => {
    try {
      const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=' + appId + '&units=metric');
      const json = await response.json();
      setInfo(json)
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const getWeatherForecast = async () => {
      try {
          const response = await fetch('https://api.openweathermap.org/data/2.5/forecast/daily?q=Atlanta&cnt=8&appid=' + appId + '&units=metric')
          const json = await response.json()
          setForecast(json)
      } catch (e) {
          console.error(e)
      } finally {
      }
  }

  const getForecastViewRow = () => {
      if (forecast) {
          return forecast.list.slice(1).map(item => {
              let date = new Date(item.dt * 1000);
              let weatherIconUrl = "http://openweathermap.org/img/wn/" + item['weather'][0]['icon'] + "@2x.png"
              return (
                <View key={item.sunrise} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignSelf: 'center' }}>
                        <Text style={{ alignSelf: 'center' }}>{date.toLocaleDateString()}</Text>
                    </View>
                    <View style={{ flex: 1, alignSelf: 'center' }}>
                        <Image source={{uri: weatherIconUrl}} style={styles.tinyLogo} alt="Image Base" />
                    </View>
                    <View style={{ flex: 2, alignSelf: 'center' }}>
                        <Text style={{ alignSelf: 'center' }}>{item.weather[0].description}</Text>
                    </View>
                </View>
              )
          }
          )
      } else {
          return null
      }
  }

  let weatherIconUrl = '';
  if (info) {
      weatherIconUrl = "http://openweathermap.org/img/wn/" + info['weather'][0]['icon'] + "@2x.png"
      console.log(weatherIconUrl)
  }

  let text = 'Waiting..';
  if (location) {
    text = JSON.stringify(location);
  }

  useEffect(() => {getWeatherInfo();}, []);
  useEffect(() => {getWeatherForecast();}, []);

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1, padding: 24}} alignItems="center">
        <Text fontSize="3xl" style={{ alignSelf: "center" }}>{city}</Text>
        {isLoading ? <ActivityIndicator/> : (
          <ScrollView>
              <VStack space={4} alignItems="center">
                  <HStack space={2} alignItems="center">
                    { weatherIconUrl != '' ? (<Image source={{uri: weatherIconUrl}} style={styles.tinyLogo} alt="Image Base" />) : null}
                    <Text>{info.weather[0].description}</Text>
                  </HStack>
                  <Text>Min Temp: {info.main.temp_min} °C | Max Temp: {info.main.temp_max} °C</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                    <View>
                        <Text style={{width: 180, textAlign: 'center', fontSize: 18, fontWeight: '700'}}>Next 7 Days Forecast</Text>
                    </View>
                    <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                  </View>
                  <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignSelf: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontWeight: '700' }}>Date</Text>
                    </View>
                    <View style={{ flex: 3, alignSelf: 'stretch' }}>
                        <Text style={{ alignSelf: 'center', fontWeight: '700' }}>Description</Text>
                    </View>
                </View>
                  {getForecastViewRow()}
              </VStack>
          </ScrollView>
        )}
      </View>
    </NativeBaseProvider>
  );
};


const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 50,
      height: 50,
      alignSelf: 'center'
    },
    logo: {
      width: 66,
      height: 58,
    },
  });