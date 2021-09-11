import { Router, Stack, Scene } from "react-native-router-flux";
import React from 'react';

//Import Screens
import WeatherNewsScreen from "./screens/WeatherNewsScreen";

const App = () => (
    <Router navigationBarStyle={{ backgroundColor: '#ffcc00' }}>
        <Scene key="root">
            <Scene
                key="news"
                type="replace"
                title="GT Weather App"
                component={WeatherNewsScreen}
                initial
            />
        </Scene>
    </Router>
);

export default App;
