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
<<<<<<< HEAD
import AlertSetting from './src/screens/AlertSetting';
=======
>>>>>>> 40da7388c2aa052ca9fe55d789755d0a9f37c404
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
<<<<<<< HEAD
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
=======
          <Stack.Screen
>>>>>>> 40da7388c2aa052ca9fe55d789755d0a9f37c404
              name="NearbyPlaces"
              component={NearbyPlaces}
              options={{headerShown: false}}
            />
            <Stack.Screen
<<<<<<< HEAD
              name="ForgotPassword"
              component={ForgotPassword}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
=======
              name="VehicleMenu"
              component={VehicleMenu}
>>>>>>> 40da7388c2aa052ca9fe55d789755d0a9f37c404
              options={{headerShown: false}}
            />
            
            <Stack.Screen
              name="HomeStack"
              component={HomeStack}
              options={{headerShown: false}}
            />
<<<<<<< HEAD
=======
            <Stack.Screen
              name="Alerts"
              component={Alerts}
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
>>>>>>> 40da7388c2aa052ca9fe55d789755d0a9f37c404
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
};
export default App;
