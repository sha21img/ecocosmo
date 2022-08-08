import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  Image,
  Dimensions,
  TouchableOpacity,
  Share,
  Linking,
} from 'react-native';
import MapView, {
  AnimatedRegion,
  Animated,
  MarkerAnimated,
  Callout,
  CalloutSubview,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import style from './style';

import {image} from '../../../assets/images';
import MapIconList from '../../../Utils/helper/MapIconList';
import Storage from '../../../Utils/Storage';
import {axiosGetData} from '../../../Utils/ApiController';
import {useNetInfo} from '@react-native-community/netinfo';
import Geolocation from 'react-native-geolocation-service';
import colors from '../../../assets/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {__} from '../../../Utils/Translation/translation';
import Icon from 'react-native-vector-icons/Ionicons';
import {color} from 'react-native-reanimated';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
function index(props) {
  const [coordinate, setCoordinate] = useState({
    latitude: 26.9110637,
    longitude: 75.7376412,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [activeImg, setActiveImg] = useState(false);

  const [details, setDetails] = useState([]);
  const getDetails = async () => {
    // setIsShow(true);
    const succcess = await Storage.getLoginDetail('login_detail');
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    let id = succcess.type;
    const response = await axiosGetData(
      `vehicles/${username}/${encodedPassWord}/${id}`,
    );
    const detail = response.data.vehicles;
    // console.log('GroupMapTracking', detail);
    setDetails(detail);
    // setIsShow(false);
  };

  const iconPress = data => {
    props.navigation.navigate(data);
  };

  console.log('...................0', props);
  const getLocations = async () => {
    Geolocation.getCurrentPosition(position => {
      console.log('positio', position);
      setCoordinate({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  };
  const netInfo = useNetInfo();
  useEffect(() => {
    // getLocation();
    if (netInfo.isConnected) {
      if (Platform.OS == 'android') {
        getLocations();
      } else {
        // checkPermissionIOS();
      }
    }
  }, [netInfo.isConnected]);
  useEffect(() => {
    getDetails();
  }, []);
  const [isData, isSetData] = useState({});

  const calling = async data => {
    console.log('hihih')
    const succcess = await Storage.getLoginDetail('login_detail');
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    const response = await axiosGetData(
      `getDriverDetails/${username}/${encodedPassWord}`,
    );
    const driverDetails = response.data.driverDetails;
    const filterData = driverDetails.filter(item => {
      return item.deviceId === data.deviceId;
    });
    console.log("filterDathihihhihiha",filterData)
    const phoneNumber = filterData[0].mobilenumber;
    Linking.openURL(`tel:${phoneNumber}`);
  };
  return (
    <View style={{flex: 1}}>
      <MapView
        // isTrafficEnabled={true}
        style={{
          flex: 1,
        }}
        // zoomEnabled={true}
        // trackViewChanges={false}
        // scrollEnabled={false}
        // pointerEvents="none"
        // minZoomLevel={15}
        initialRegion={{
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        provider={PROVIDER_GOOGLE}>
        {details.map(item => {
          return (
            <Marker
              // ref={markerRef}
              //   key={index.toString()}
              coordinate={{
                latitude: parseFloat(item.lat),
                longitude: parseFloat(item.lng),
              }}>
              <Image
                resizeMode="contain"
                source={{uri: item.equipmentIcon}}
                style={{
                  height: 25,
                  width: 70,
                }}
              />
              <Callout tooltip onPress={() =>calling(item)}>
                <LinearGradient
                  colors={[colors.mainThemeColor3, colors.mainThemeColor4]}
                  start={{x: 1.3, y: 0}}
                  end={{x: 0, y: 0}}
                  locations={[0, 0.9]}
                  style={style.firstbox}>
                  <View>
                    <Text style={style.firstboxtext1}>{item.deviceId}</Text>
                    <Text style={style.driverCarSpeed}>
                      {item.statusMessage}
                    </Text>
                    <Text style={style.firstboxtext2}>{item.address}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      //   backgroundColor:'red'
                    }}>
                    <View style={style.secondboxtextbox1}>
                      <Text style={{paddingVertical: 8}}>
                        <Image
                          resizeMode="contain"
                          source={image.speed}
                          style={style.speedimg}
                        />
                      </Text>
                      <Text style={style.secondboxtext1}>
                        {Math.floor(item.speed)} {__('KM/H')}
                      </Text>
                      <Text style={style.secondboxtext11}>{__('SPEED')}</Text>
                    </View>
                    <View style={style.secondboxtextbox1}>
                      <Text style={{paddingVertical: 8}}>
                        <Image
                          resizeMode="contain"
                          source={image.distance}
                          style={style.locimg}
                        />
                      </Text>
                      <Text style={{fontSize: 12, color: '#fff'}}>
                        {Math.floor(item.todaysODO)} {__('KM')}
                      </Text>
                      <Text style={style.secondboxtext11}>
                        {__("TODAY'S ODO")}
                      </Text>
                    </View>

                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          console.log('llllllllllllllllllllllllllllllllllllllllllllllllllllll')
                          // calling(item);
                        }}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          backgroundColor: 'red',
                          backgroundColor: '#24A520',
                          padding: 9,
                          borderRadius: 6,
                          alignItems: 'center',
                        }}>
                        <Icon name="call" color="#fff" />
                        <Text style={{color: '#fff', marginLeft: 5}}>
                          Call Driver
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </LinearGradient>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      <View style={style.top_container}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{paddingVertical: 10}}>
          <Image
            source={image.leftArrowblack}
            style={{width: 30, height: 18}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={style.dashimgbox}
          onPress={() => setActiveImg(!activeImg)}>
          <Image
            source={image.dashboardcolor}
            style={{width: 44, height: 44}}
          />
        </TouchableOpacity>
      </View>
      {activeImg && <MapIconList k={true} handlePress={iconPress} />}
    </View>
  );
}
export default index;
