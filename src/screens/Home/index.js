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
import ModalSelector from 'react-native-modal-selector';
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

export default function Home() {
  // console.log('jijijijijijjijijiijijijiijiji');
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [dashBoardType, setDashBoardType] = useState('Dashboard1');
  const [details, setDetails] = useState([]);
  const [newFilterDetails, setNewFilterDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [isShow, setIsShow] = useState(true);
  const [search, setSearch] = useState(true);
  const [type, setType] = useState('All');
  const [driverDetails, setDriverDetails] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [countObj, setCountObj] = useState({
    Running: 0,
    Waiting: 0,
    Idle: 0,
    'In-Active': 0,
    'No GPS': 0,
  });
  useEffect(() => {
    console.log(
      '=============================================================================',
    );
    getDetails('first');
    getVehicle();
  }, []);
  // const onRefreshPage = React.useCallback((data, details, setIsShow) => {
  //   console.log('hihihds');
  //   // setIsRefreshing(true);
  //   setIsShow(true);
  //   // console.log('typeptprprp', data);
  //   if (data === 'All') {
  //     getDetails('refresh');
  //   } else {
  //     getRunningData(data, details);
  //   }

  //   setTimeout(() => setIsShow(false), 2000);
  // }, []);
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
  const getRunningData = (data, details) => {
    // console.log('data', data);
    setType(data);
    const filterDetails = details.filter(item => {
      return item.status == data;
    });
    setNewFilterDetails(filterDetails);
    setIsShow(false);
    navigation.navigate('MainHome', {
      details: filterDetails,
      driverDetails: driverDetails,
      setIsShow: setIsShow,
    });
  };
  const onRefreshPage = React.useCallback((data, details) => {
    getDetails();
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
          </View>
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
        </View>
      </LinearGradient>
      {!isShow ? (
        <ScrollView
          style={{flex: 1, 
          // backgroundColor:'#00266B',
          }}
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
              paddingHorizontal: 25,
              alignItems: 'center',
              marginVertical: 15,
            }}>
            <Image
              source={image.whatsApp}
              style={{height: 34, width: 34, marginHorizontal: 15}}
            />
            <Text numberOfLines={1} style={{width: '65%', fontSize: 14}}>
              whatsapp://send?phone=+91989676997
            </Text>
          </TouchableOpacity>
          {/* ['#00266B', '#2AB0CC'] */}
          <View
         
            style={{
              borderRadius: 12,
             
            width:'80%',
            height:100,
              padding: 3,
             alignSelf:'center',
             backgroundColor:'#2AB0CC'
            }}>
            <LinearGradient
            colors={['#2AB0CC','red']}
            start={{x:0.8,y:0.7}}
            end={{x:1,y:0.5}}
            style={{
              position:'absolute',
              bottom:0,
              right:0,
              width:'50%',
              height:50,
              borderBottomRightRadius:10
            }}
            >

            </LinearGradient>
           {/* <View
            style={{
              borderRadius: 10,
             width:'100%',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexDirection: 'row',
              alignSelf: 'center',
            
             backgroundColor:'white',
             
              padding: 15,
            }}
           >
           <Image
              source={image.whatsApp}
              style={{height: 34, width: 34, marginHorizontal: 20}}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MainHome', {
                  details: newFilterDetails,
                  driverDetails: driverDetails,
                });
              }}
              style={{
                width: '50%',
             
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                
                }}>
                All
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                
                }}>
                ({details?.length})
              </Text>
              <Text style={{textAlign: 'center', fontSize: 18}}>Available</Text>
            </TouchableOpacity>
           </View> */}
          </View>

          <View
            style={{
              paddingVertical: 15,
              justifyContent: 'center',
              flexWrap: 'wrap',
              paddingBottom: 100,
              flexDirection: 'row',
            }}>
            {['Running', 'Idle', 'Waiting', 'In-Active', 'No GPS'].map(item => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setIsShow(true), getRunningData(item, details);
                  }}
                  style={{
                    borderWidth: 2,
                    borderColor: '#1B6CE5',
                    padding: 15,
                    margin: 10,
                    borderRadius: 10,
                    minWidth: 120,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 20,
                      fontWeight: 'bold',
                      //   color: 'white',
                    }}>
                    {item}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 20,
                      fontWeight: 'bold',
                      //   color: 'white',
                    }}>
                    {/* 6 */}({countObj[item]})
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 18,
                      paddingVertical: 5,
                    }}>
                    Available
                  </Text>
                  <Image
                    source={image.whatsApp}
                    style={{
                      height: 34,
                      width: 34,
                      marginTop: 10,
                      alignSelf: 'center',
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
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
      )}
    </>
  );
}
