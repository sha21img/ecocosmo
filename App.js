import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/Login';
import Splash from './src/screens/Splash';
import HomeStack from './src/screens/HomeStack';
import ForgotPassword from './src/screens/ForgotPassword';
import NearbyPlaces from './src/screens/NearbyPlaces';
import VehicleMenu from './src/screens/VehicleMenu';
import Alerts from './src/screens/Alerts';
import AlertSetting from './src/screens/AlertSetting';
import LiveMapTracking from './src/screens/LiveMapTracking';
import Setting from './src/screens/Setting';
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const Stack = createStackNavigator();
  if (!isLoading == true) {
    return <Splash />;
  } else {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator>
          <Stack.Screen
              name="LiveMapTracking"
              component={LiveMapTracking}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="HomeStack"
              component={HomeStack}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Setting"
              component={Setting}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AlertSetting"
              component={AlertSetting}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Alerts"
              component={Alerts}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="VehicleMenu"
              component={VehicleMenu}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="NearbyPlaces"
              component={NearbyPlaces}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
};
export default App;
