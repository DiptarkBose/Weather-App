import { Router, Stack, Scene } from "react-native-router-flux";
import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';


//Import Screens
import WeatherNewsScreen from "./screens/WeatherNewsScreen";
import WeatherInfoScreen from "./screens/WeatherInfoScreen";
import WeatherSubscribeScreen from './screens/WeatherSubscribeScreen';

const Drawer = createDrawerNavigator();

const App = () => (
    <NavigationContainer>
        <Drawer.Navigator initialRouteName="Weather Info">
            <Drawer.Screen name="Weather Info" component={WeatherInfoScreen} />
            <Drawer.Screen name="Weather News" component={WeatherNewsScreen} />
            <Drawer.Screen name="Subscribe" component={WeatherSubscribeScreen} />
        </Drawer.Navigator>
    </NavigationContainer>
);

export default App;

