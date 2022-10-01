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
import PrimaryDashboard from './PrimaryDashboard';
import SecondaryDashboard from './SecondaryDashboard';
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

import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  requestMultiple,
} from 'react-native-permissions';
import Entypo from 'react-native-vector-icons/Entypo';

export default function Home({props}) {
  const [details, setDetails] = useState([]);
  const [newFilterDetails, setNewFilterDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [isShow, setIsShow] = useState(true);
  const [type, setType] = useState('All');
  const [dashBoardType, setDashBoardType] = useState('Dashboard 1');
  const [searchFilterDetails, setSearchFilterDetails] = useState([]);

  const [driverDetails, setDriverDetails] = useState([]);
  const navigation = useNavigation();
  const [countObj, setCountObj] = useState({
    Running: 0,
    Waiting: 0,
    Idle: 0,
    'In-Active': 0,
    'No GPS': 0,
  });
  const netInfo = useNetInfo();
  const [secondaryDetails, setSecondaryDetails] = useState([]);
  const [locationPermission, setLocationPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [alertMsg, setAlertMsg] = useState('');
  const [search, setSearch] = useState(true);

  const CarType = [
    {type: 'Running', image: image.runningCar},
    {type: 'Idle', image: image.idelCar},
    {type: 'Waiting', image: image.WaitingCar},
    {type: 'In-Active', image: image.InactiveCar},
    {type: 'No GPS', image: image.noGpsCar},
  ];
  useEffect(() => {
    setDashBoardType('Dashboard 1');
    console.log(
      '=============================================================================',
    );
    getDetails('first');
    getVehicle();
  }, [props]);
  useEffect(() => {
    if (netInfo.isConnected) {
      if (Platform.OS == 'android') {
        checkPermissionAndroid();
      } else {
        // checkPermissionIOS();
      }
    }
  }, [netInfo.isConnected]);
  const showPermissionError = (alertMsg = 'Please Enable Location Service') => {
    setLocationPermission(true);
    setAlertMsg(alertMsg);
    setIsLoading(false);
  };
  const checkPermissionAndroid = () => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            showPermissionError();
            break;
          case RESULTS.BLOCKED:
            showPermissionError();
            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
              .then(result => {
                if (result == RESULTS.GRANTED || result == RESULTS.LIMITED) {
                  setIsLoading(false);
                  setLocationPermission(false);
                } else {
                  showPermissionError();
                }
              })
              .catch(err => {
                showPermissionError(
                  'Something Went Wrong While Checking Permission',
                );
              });
            break;
          case RESULTS.LIMITED:
            setIsLoading(false);
            setLocationPermission(false);
            break;
          case RESULTS.GRANTED:
            setIsLoading(false);
            setLocationPermission(false);
            break;
        }
      })
      .catch(error => {
        showPermissionError('Something Went Wrong While Checking Permission');
      });
  };
  let index = 0;

  const data = [
    {key: index++, label: 'Dashboard 1'},
    {key: index++, label: 'Dashboard 2'},
  ];
  const changeDasboardType = dashBoardType => {
    return __(dashBoardType);
  };
  const searchFunction = text => {
    console.log(
      'poiuytrdfghjkoiuytdcvbkoiuytfbnkloiuyfvbkisearchFunctionsearchFunctionsearchFunction',
      text,
    );
    // let filteredData = filterDetails.filter(item => {
    //   return item.deviceId.includes(text);
    // });
    // setFilteredDetails(filteredData);
    // console.log('this is searched text', filteredData);
    // console.log('text', text);
    if (text !== null && text !== undefined && text !== '') {
      var newArr = [];
      newArr = filteredDetails.filter(item => {
        return item.deviceId.toLowerCase().includes(text.toLowerCase());
      });
      console.log('filteredDetails', newArr.length);
      newArr !== null && newArr !== undefined && newArr.length > 0
        ? setSecondaryDetails(newArr)
        : setSecondaryDetails([]);
    } else {
      setSecondaryDetails(filteredDetails);
    }
  };
  const getDetails = async () => {
    setCountObj({
      Running: 0,
      Waiting: 0,
      Idle: 0,
      'In-Active': 0,
      'No GPS': 0,
    });
    setIsShow(true);
    const succcess = await Storage.getLoginDetail('login_detail');
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    let id = succcess.type;

    const response = await axiosGetData(
      `vehicles/${username}/${encodedPassWord}/${id}`,
    );
    const detail = response.data.vehicles;
    await Storage.setVehicleDetail(detail);
    setDetails(detail);
    setFilteredDetails(detail);
    setNewFilterDetails(detail);
    setSecondaryDetails(detail);
    setSearchFilterDetails(detail);
    // if (data === 'first') {
    detail?.forEach(element => {
      // setCountObj({[element.status]:element.status+1})
      setCountObj(prev => {
        return {...prev, [element.status]: prev[element.status] + 1};
      });
    });
    // }

    setIsShow(false);
  };
  const getVehicle = async () => {
    const succcess = await Storage.getLoginDetail('login_detail');
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    const response = await axiosGetData(
      `getDriverDetails/${username}/${encodedPassWord}`,
    );
    const driverDetails = response.data.driverDetails;
    setDriverDetails(driverDetails);
  };

  const onRefreshPage = React.useCallback((data, details) => {
    getDetails();
    setIsShow(!isShow);
  });

  return (
    <>
      <LinearGradient
        colors={['#395DBF', '#16BCD4']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}>
        <View style={styles.headerContainer}>
          <View style={styles.headerDashboard}>
            <TouchableOpacity
              style={{paddingVertical: 10}}
              onPress={() => navigation.openDrawer()}>
              <Image source={image.drawer} style={{height: 20, width: 23}} />
            </TouchableOpacity>
            <View style={{marginLeft: 15}}>
              <ModalSelector
                initValue="Select tickets"
                accessible={true}
                data={data}
                scrollViewAccessibilityLabel={'Scrollable options'}
                style={{flexDirection: 'row'}}
                onChange={option => {
                  setDashBoardType(option.label);
                }}>
                <TouchableOpacity style={styles.dashboardContainer}>
                  <TextInput
                    style={styles.dashboardText}
                    editable={false}
                    value={changeDasboardType(dashBoardType)}
                  />
                  <Image
                    source={image.arrowDown}
                    style={styles.dashboardArrow}
                  />
                </TouchableOpacity>
              </ModalSelector>
            </View>
          </View>
          {dashBoardType == 'Dashboard 1' ? (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:+91989676997`);
              }}
              style={{
                flexDirection: 'row',
                backgroundColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 7,
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}>
              <AntDesign
                style={{
                  color: 'orange',
                  fontSize: 20,
                  paddingRight: 5,
                }}
                name={'customerservice'}
              />
              <Text style={{color: 'white'}}>+91989676997</Text>
            </TouchableOpacity>
          ) : (
            <>
              <View style={styles.alertContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Notifications')}>
                  <Image
                    source={image.Notification1}
                    style={{height: 30, width: 30, resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
                {search ? (
                  <TouchableOpacity onPress={() => setSearch(false)}>
                    <Image source={image.search} style={styles.searchIcon} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setSearch(true);
                      setNewFilterDetails(filteredDetails);
                      setSecondaryDetails(filteredDetails);
                    }}>
                    <Entypo
                      style={{
                        color: colors.white,
                        fontSize: 24,
                        marginLeft: 10,
                        paddingVertical: 5,
                      }}
                      name={'cross'}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}
        </View>
        {!search ? (
          <View
            style={{
              width: '100%',
              marginBottom: 20,
              marginTop: 10,
              borderRadius: 7,
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Select vehicle number"
              style={{
                backgroundColor: colors.white,
                borderRadius: 7,
                width: '90%',
                paddingHorizontal: 10,
              }}
              onChangeText={searchFunction}
            />
          </View>
        ) : null}
      </LinearGradient>
      {!isShow ? (
        dashBoardType == 'Dashboard 1' ? (
          <PrimaryDashboard
            primaryFilterDetails={newFilterDetails}
            primaryDriverDetails={driverDetails}
            countObj={countObj}
            onRefreshPage={onRefreshPage}
            isShow={isShow}
            setIsShow={setIsShow}
          />
        ) : (
          <SecondaryDashboard
            secondaryFilterDetails={secondaryDetails}
            secondaryDriverDetails={driverDetails}
            countObj={countObj}
            filteredDetails={filteredDetails}
            onRefreshPage={onRefreshPage}
            isShow={isShow}
            setIsShow={setIsShow}
          />
        )
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator />
        </View>
      )}
      {/* {!isShow ? (
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
            onPress={() =>
              Linking.openURL('whatsapp://send?phone=+91989676997')
            }
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
                details: newFilterDetails,
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
                  ({details?.length})
                </Text>
                <Text
                  style={{textAlign: 'center', color: 'white', fontSize: 18}}>
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
                    setIsShow(true), getRunningData(item.type, details);
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
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator />
        </View>
      )} */}
    </>
  );
}
