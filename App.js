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
import ChangePassword from './src/screens/ChangePassword';
import AboutUs from './src/screens/AboutUs';
import ContactUs from './src/screens/ContactUs';
import Renewal from './src/screens/Renewal';
import {createDrawerNavigator} from '@react-navigation/drawer';
import colors from './assets/Colors';
import {Image, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {image} from './assets/images';
import {__} from './Utils/Translation/translation';
import {Size} from './assets/fonts/Fonts';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import UrlTracking from './src/screrens/UrlTracking';
import ForgotPassword_1 from './src/screens/ForgetPassword-1';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const permanentRoutes = [
  {
    label: 'About Us',
    icon: image.AboutUsIcon,
    route: 'AboutUs',
  },
  {
    label: 'Renewal',
    icon: image.RenewalIcon,
    route: 'Renewal',
  },
  {
    label: 'Reports',
    icon: image.reportIcon,
    route: '',
  },
  {
    label: 'Contact Us',
    icon: image.callIcon,
    route: 'ContactUs',
  },
];
const Routes = [
  {
    label: 'Home',
    icon: image.HomeIcon,
    route: 'HomeStack',
  },
  {
    label: 'Group Live Tracking',
    icon: image.mapIcon,
    route: '',
  },
  {
    label: 'Alerts',
    icon: image.TopLight,
    route: 'Alerts',
  },
];

const DrawerContent = props => {
  return (
    <>
      <LinearGradient
        colors={[colors.mainThemeColor3, colors.mainThemeColor1]}
        style={{flex: 1}}>
        <View
          style={{
            flex: 2,
            borderBottomWidth: 1,
            borderBottomColor: colors.white,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={image.loginLogo} style={{height: 107, width: 107}} />
          <Text
            style={{
              fontSize: Size.compact,
              textAlign: 'center',
              width: 220,
              marginTop: 18,
              color: colors.white,
            }}>
            {__('ADAM VEHICLE AGENCY DAVID THOMAS')}
          </Text>
        </View>
        <View
          style={{
            flex: 1.5,
            borderBottomWidth: 1,
            borderBottomColor: colors.white,
            paddingVertical: 34,
            paddingHorizontal: 20,
          }}>
          {Routes.map(el => {
            return (
              <TouchableOpacity
                key={Math.random()}
                style={{
                  flexDirection: 'row',
                  paddingVertical: 5,
                  alignItems: 'center',
                }}
                onPress={() => props.navigation.navigate(el.route)}>
                <Image source={el.icon} style={{height: 40, width: 40}} />
                <Text
                  style={{
                    marginLeft: 20,
                    color: colors.white,
                    fontSize: Size.large,
                  }}>
                  {__(`${el.label}`)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{flex: 3, paddingVertical: 34, paddingHorizontal: 20}}>
          {permanentRoutes.map(el => {
            return (
              <TouchableOpacity
                key={Math.random()}
                style={{
                  flexDirection: 'row',
                  paddingVertical: 5,
                  alignItems: 'center',
                }}
                onPress={() => props.navigation.navigate(el.route)}>
                <Image source={el.icon} style={{height: 40, width: 40}} />
                <Text
                  style={{
                    marginLeft: 20,
                    color: colors.white,
                    fontSize: Size.large,
                  }}>
                  {__(`${el.label}`)}
                </Text>
              </TouchableOpacity>
            );
          })}
          <LinearGradient
            colors={[colors.subGradientcolour1, colors.subGradientcolour2]}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            locations={[0.5, 1.5]}
            style={{
              marginTop: 61,
              height: 56,
              width: '95%',
              alignSelf: 'center',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 160,
            }}>
            <Text
              style={{
                color: colors.white,
                fontSize: Size.large,
              }}>
              {__('Logout')}
            </Text>
          </LinearGradient>
        </View>
      </LinearGradient>
    </>
  );
};

const MainScreen = props => {
  return (
    <>
      <Drawer.Navigator
        initialRouteName={'HomeStack'}
        backBehavior={'history'}
        drawerContent={props => <DrawerContent {...props} />}
        defaultStatus={'closed'}
        screenOptions={{
          header: () => false,
          drawerStyle: {
            width: 400,
          },
          swipeEnabled: Platform.OS == 'android' ? false : true,
        }}>
        <Drawer.Screen name="HomeStack" component={HomeStack} />
        <Drawer.Screen name="Alerts" component={Alerts} />
        <Drawer.Screen name="AboutUs" component={AboutUs} />
        <Drawer.Screen name="Renewal" component={Renewal} />
        <Drawer.Screen name="ContactUs" component={ContactUs} />
      </Drawer.Navigator>
    </>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (!isLoading == true) {
    return <Splash />;
  } else {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="ForgotPassword-1"
              component={ForgotPassword_1}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AlertSetting"
              component={AlertSetting}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MainScreen"
              component={MainScreen}
              options={{headerShown: false}}
            />

            {/* <Stack.Screen
              name="UrlTracking"
              component={U}
              options={{headerShown: false}}
            /> */}

            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="LiveMapTracking"
              component={LiveMapTracking}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Change Password"
              component={ChangePassword}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Setting"
              component={Setting}
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
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
};
export default App;
