import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {image} from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import Dashboard1 from './Dashboard1';
import Dashboard2 from './Dashboard2';
import {__} from '../../../Utils/Translation/translation';
import colors from '../../../assets/Colors';
import {axiosGetData} from '../../../Utils/ApiController';
import Storage from '../../../Utils/Storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import {useNetInfo} from '@react-native-community/netinfo';
import ModalSelector from 'react-native-modal-selector';

const PrimaryDashboard = props => {
  const {
    primaryFilterDetails,
    primaryDriverDetails,
    countObj,
    onRefreshPage,
    isShow,
    setIsShow,
  } = props;
  const [details, setDetails] = useState([]);
  const [newFilterDetails, setNewFilterDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  //   const [isShow, setIsShow] = useState(true);
  const [type, setType] = useState('All');
  const [dashBoardType, setDashBoardType] = useState('Dashboard 1');

  const [driverDetails, setDriverDetails] = useState([]);
  const navigation = useNavigation();
  //   const [countObj, setCountObj] = useState({
  //     Running: 0,
  //     Waiting: 0,
  //     Idle: 0,
  //     'In-Active': 0,
  //     'No GPS': 0,
  //   });
  const netInfo = useNetInfo();
  const [locationPermission, setLocationPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [alertMsg, setAlertMsg] = useState('');
  const CarType = [
    {type: 'Running', image: image.runningCar},
    {type: 'Idle', image: image.idelCar},
    {type: 'Waiting', image: image.WaitingCar},
    {type: 'In-Active', image: image.InactiveCar},
    {type: 'No GPS', image: image.noGpsCar},
  ];
  useEffect(() => {
    setNewFilterDetails(primaryFilterDetails);
    setDriverDetails(primaryDriverDetails);
  }, []);
  const getRunningData = (data, details) => {
    // console.log('data', data);
    setType(data);
    const filterDetails = details.filter(item => {
      return item.status == data;
    });
    setNewFilterDetails(filterDetails);
    navigation.navigate('MainHome', {
      details: filterDetails,
      driverDetails: driverDetails,
    });
  };
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#00266B'}}
      refreshControl={
        <RefreshControl
          enabled={true}
          refreshing={isShow}
          onRefresh={() => onRefreshPage(type, details, setIsShow)}
        />
      }>
      <TouchableOpacity
        onPress={() => Linking.openURL('whatsapp://send?phone=+91989676997')}
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 15,
        }}>
        <Image
          source={image.whatsApp}
          style={{height: 34, width: 34, marginHorizontal: 15}}
        />
        <Text
          numberOfLines={1}
          style={{width: '65%', fontSize: 14, color: 'white'}}>
          whatsapp://send?phone=+91989676997
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('MainHome', {
            details: primaryFilterDetails,
            driverDetails: driverDetails,
          });
        }}
        style={{
          borderRadius: 12,
          width: '80%',
          height: 100,
          padding: 3,
          alignSelf: 'center',
          backgroundColor: '#0F7DF1',
        }}>
        <LinearGradient
          colors={['#00266B', '#0F7DF1']}
          start={{x: 1.5, y: -0.5}}
          end={{x: 0.7, y: 1.5}}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '80%',
            height: '50%',
            borderBottomRightRadius: 12,
          }}></LinearGradient>
        <View
          style={{
            borderRadius: 10,
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            alignSelf: 'center',
            backgroundColor: '#00266B',
            height: '100%',
          }}>
          <Image
            resizeMode="contain"
            source={image.allCar}
            style={{
              height: 40,
              width: 80,
              marginHorizontal: 30,
            }}
          />
          <View
            style={{
              width: '50%',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
              }}>
              All
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: 'white',
                fontWeight: 'bold',
              }}>
              ({primaryFilterDetails?.length})
            </Text>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 18}}>
              Available
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Image source={image.mainBack} style={{width: '100%'}} />
      <View
        style={{
          justifyContent: 'center',
          flexWrap: 'wrap',
          paddingTop: 10,
          flexDirection: 'row',
        }}>
        {CarType.map(item => {
          return (
            <TouchableOpacity
              onPress={() => {
                getRunningData(item.type, primaryFilterDetails);
              }}
              activeOpacity={0.7}
              style={{
                margin: 5,
                borderRadius: 10,
                padding: 3,
                backgroundColor: '#0F7DF1',
              }}>
              <LinearGradient
                colors={['#00266B', '#0F7DF1']}
                start={{x: 1.5, y: -0.5}}
                end={{x: 0.7, y: 1.5}}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '80%',
                  height: '50%',
                  borderBottomRightRadius: 12,
                }}></LinearGradient>
              <View
                style={{
                  borderColor: '#1B6CE5',
                  paddingVertical: 10,
                  borderRadius: 10,
                  minWidth: 120,
                  backgroundColor: '#00266B',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  {item.type}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  ({countObj[item.type]})
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    paddingVertical: 5,
                    color: 'white',
                  }}>
                  Available
                </Text>
                <Image
                  resizeMode="contain"
                  source={item.image}
                  style={{
                    height: 28,
                    width: 50,
                    marginVertical: 10,
                    alignSelf: 'center',
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <Image
        source={image.mainBack}
        style={{width: '100%', marginBottom: 120}}
      />
    </ScrollView>
  );
};
export default PrimaryDashboard;
