import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import GroupMapTracking from './src/screens/GroupMapTracking';
import Login from './src/screens/Login';
import Splash from './src/screens/Splash';
import SplashNew from './src/screens/SplashNew';
import HomeStack from './src/screens/HomeStack';
import ForgotPassword from './src/screens/ForgotPassword';
import NearbyPlaces from './src/screens/NearbyPlaces';
import VehicleMenu from './src/screens/VehicleMenu';
import Alerts from './src/screens/Alerts';
import MapHistory from './src/screens/MapHistory';
import DriverBehaviour from './src/screens/DriverBehaviour';
import GraphicalReports from './src/screens/GraphicalReports';
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
import UrlTracking from './src/screens/UrlTracking';
import ForgotPassword_1 from './src/screens/ForgetPassword-1';
import CustomerProfile from './src/screens/CustomerProfile';
import Nearby from './src/screens/Nearby';
import Storage from './Utils/Storage';
import {LogBox} from 'react-native';
import {axiosGetData} from './Utils/ApiController';
import Reports from './src/screens/Reports';
import {baseUrl} from './Utils/ApiController';
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
    icon: image.mapIcon,
    route: 'Reports',
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
    route: 'GroupMapTracking',
  },
  {
    label: 'Alerts',
    icon: image.TopLight,
    route: 'Alerts',
  },
];

const DrawerContent = props => {
  const [name, setName] = useState('');
  const {setToken} = React.useContext(AuthContext);
  useEffect(() => {
    getName();
  });
  const getName = async () => {
    const loginDetail = await Storage.getLoginDetail('login_detail');
    let username = loginDetail.accountName;
    let password = loginDetail.password;
    const response = await axiosGetData(
      `getAccountDetails/${username}/${password}`,
    );
    if (response.data.apiResult == 'success') {
      setName(response.data.getAccountDetails);
    }
  };
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
          <Image
            source={{uri: `${baseUrl}/download/appOwnerLogo`}}
            style={{width: '100%', height: 80, resizeMode: 'contain'}}
          />
          <Text
            style={{
              fontSize: Size.compact,
              textAlign: 'center',
              marginTop: 18,
              color: colors.white,
            }}>
            {name.accountName}
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
          <TouchableOpacity
            onPress={async () => {
              await Storage.clearToken();
              setToken(null);
            }}>
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
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
  );
};

const MainScreen = props => {
  useEffect(() => {
    props.setSplashFalse;
  }, [props]);
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
        <Drawer.Screen name="Reports" component={Reports} />
        <Drawer.Screen name="DriverBehaviour" component={DriverBehaviour} />
        <Drawer.Screen name="GroupMapTracking" component={GroupMapTracking} />
      </Drawer.Navigator>
    </>
  );
};
export const AuthContext = React.createContext();
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthToken] = useState(null);
  const initialState = {
    authToken: null,
    splash: false,
  };
  const reducer = (prevState, action) => {
    switch (action.type) {
      case 'SET_TOKEN':
        return {
          ...prevState,
          authToken: action.data,
        };
      case 'SET_SPLASH':
        return {
          ...prevState,
          splash: action.data,
        };
      default:
        return {
          ...prevState,
        };
    }
  };
  const authContext = React.useMemo(
    () => ({
      setToken: async data => {
        dispatch({type: 'SET_TOKEN', data: data});
      },

      setSplash: async data => {
        dispatch({type: 'SET_SPLASH', data: data});
      },
    }),

    [],
  );
  const setSplashFalse = () => dispatch({type: 'SET_SPLASH', data: false});
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const initializeApp = async () => {
    let userProfile = await Storage.getLogin('login');
    if (userProfile) {
      dispatch({type: 'SET_TOKEN', data: userProfile});
      // dispatch({type: 'SET_SPLASH', data: true});
    }
    setIsLoading(!isLoading);
  };
  const changeLang = async () => {
    const code = await Storage.getLanguage('language');
    if (code == 'Hindi') {
      // setDefaultLocale("eng");
      setLocale('hi', 'rtl');
    } else if (code == 'English') {
      setLocale('en', 'rtl');
      // setDefaultLocale("hi");
    } else if (code == 'Marathi') {
      setLocale('mth', 'rtl');
    } else if (code == 'Gujarati') {
      setLocale('gti', 'rtl');
    }
  };
  useEffect(() => {
    LogBox.ignoreAllLogs();
    changeLang();

    initializeApp();
  }, []);

  if (isLoading == true) {
    return <Splash />;
  } else {
    return (
      <>
        <NavigationContainer>
          <AuthContext.Provider value={authContext}>
            <Stack.Navigator>
              {state.authToken == 'success' ? (
                <>
                  {state.splash ? (
                    <Stack.Screen
                      name="SplashNew"
                      component={SplashNew}
                      options={{headerShown: false}}
                    />
                  ) : (
                    <Stack.Screen
                      name="MainScreen"
                      component={props => (
                        <MainScreen
                          {...props}
                          setSplashFalse={setSplashFalse}
                        />
                      )}
                      options={{headerShown: false}}
                    />
                  )}

                  <Stack.Screen
                    name="CustomerProfile"
                    component={CustomerProfile}
                    options={{headerShown: false}}
                  />

                  <Stack.Screen
                    name="AlertSetting"
                    component={AlertSetting}
                    options={{headerShown: false}}
                  />

                  <Stack.Screen
                    name="UrlTracking"
                    component={UrlTracking}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="Reports"
                    component={Reports}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="GraphicalReports"
                    component={GraphicalReports}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="DriverBehaviour"
                    component={DriverBehaviour}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="LiveMapTracking"
                    component={LiveMapTracking}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="GroupMapTracking"
                    component={GroupMapTracking}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="Setting"
                    component={Setting}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="MapHistory"
                    component={MapHistory}
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
                    name="ChangePassword"
                    component={ChangePassword}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="Nearby"
                    component={Nearby}
                    options={{headerShown: false}}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="ForgotPassword-1"
                    component={ForgotPassword_1}
                    options={{headerShown: false}}
                  />
                </>
              )}
            </Stack.Navigator>
          </AuthContext.Provider>
        </NavigationContainer>
      </>
    );
  }
};
export default App;
