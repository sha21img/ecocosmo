import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Home';
import Home2 from '../Home2';
import Notifications from '../Notifications';
import CustomerProfile from '../CustomerProfile';
import Setting from '../Setting';
import Tabs from './Tabs';
import colors from '../../../assets/Colors';

function HomeStack() {
  const Tab = createBottomTabNavigator();
  const [isSelected, setIsSelected] = useState('Home');
  const CustomTabBar = ({state, navigation}) => {
    const {routes} = state;
    const handlePress = (activeTab, index) => {
      setIsSelected(activeTab);
      if (state.index !== index) {
        navigation.navigate(activeTab);
      }
    };
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 30,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: colors.white,
            width: '90%',
            borderRadius: 100,
            paddingHorizontal: 20,
            paddingVertical: 6,
            elevation: 2,
          }}>
          {routes.map((route, index) => (
            <Tabs
              tab={route}
              icon={route.params.icon}
              key={route.key}
              index={index}
              isSelected={isSelected}
              onPress={handlePress}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#438EFA',
      }}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} initialParams={{icon: 'home'}} />
      <Tab.Screen
        name="Home2"
        component={Home2}
        initialParams={{icon: 'home'}}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        initialParams={{icon: 'notification'}}
      />
      <Tab.Screen
        name="CustomerProfile"
        component={CustomerProfile}
        initialParams={{icon: 'customerprofile'}}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        initialParams={{icon: 'setting'}}
      />
    </Tab.Navigator>
  );
}

export default HomeStack;
