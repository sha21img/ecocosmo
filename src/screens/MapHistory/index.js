import React, {useState, useEffect} from 'react';
import {Image, TouchableOpacity, Text, View, Dimensions} from 'react-native';
import {image} from '../../../assets/images';
import colors from '../../../assets/Colors';
import {axiosGetData} from '../../../Utils/ApiController';
import {Size} from '../../../assets/fonts/Fonts';
import Storage from '../../../Utils/Storage';
import {__} from '../../../Utils/Translation/translation';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView, {
  AnimatedRegion,
  Animated,
  MarkerAnimated,
  Callout,
  CalloutSubview,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
function MapHistory(props) {
  const [data, setData] = useState();
  useEffect(() => {
    getMapHistory();
  }, []);
  const getMapHistory = async () => {
    const loginDetail = await Storage.getLoginDetail('login_detail');
    let username = loginDetail.accountName;
    let password = loginDetail.password;
    let data = {
      accountid: username,
      password: password,
      imei: '351608080772390',
      date: '2022-07-01',
    };
    const response = await axiosGetData('mapHistory', data);
    setData(response.data.EventHistory);
  };
  return (
    <>
      <LinearGradient
        colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={{
          paddingHorizontal: 16,
          paddingTop: 25,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingVertical: 10,
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{paddingVertical: 10}}>
            <Image source={image.backArrow} style={{height: 12, width: 23}} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: Size.large,
              color: colors.white,
              paddingHorizontal: 15,
            }}>
            {__('Map History')}
          </Text>
        </View>
      </LinearGradient>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingHorizontal: 20,
          justifyContent: 'space-between',
          paddingVertical: 10,
          backgroundColor: 'white',
          elevation: 20,
        }}>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: '#D9D9D9',
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingVertical: 12,
            width: '47%',
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 14}}>From Date</Text>
          <MaterialIcons
            style={{
              color: '#3D3D3D',
              fontSize: 16,
            }}
            name={'keyboard-arrow-down'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderColor: '#D9D9D9',
            borderWidth: 1,
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingVertical: 12,
            width: '47%',
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 14}}>To Date</Text>
          <MaterialIcons
            style={{
              color: '#3D3D3D',
              fontSize: 16,
            }}
            name={'keyboard-arrow-down'}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <MapView
          style={{
            flex: 1,
          }}
          // zoomEnabled={true}
          trackViewChanges={false}
          // scrollEnabled={false}
          // pointerEvents="none"
          // minZoomLevel={15}
          initialRegion={{
            latitude: 26.9124,
            longitude: 75.7873,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          // provider={PROVIDER_GOOGLE}
          // followsUserLocation={true}
          // showsMyLocationButton={true}
          // showsUserLocation={true}
          // onPress={e => {
          //   setCoordinate(e.nativeEvent.coordinate);
          // }}
          // onRegionChangeComplete={region => onRegionalChange(region)}
          // onRegionChangeComplete={region => setCoordinate(region)}
          // onRegionChange={region => setCoordinate(region)}
          // onMapReady={() => setMarginBottom(0)}
        >
          {/* {data?.map((item, index) => {
            return (
              <> */}
          <Marker
            // ref={markerRef}
            key={index.toString()}
            coordinate={{
              latitude: parseFloat(item.lat),
              longitude: parseFloat(item.lng),
            }}>
            <Image
              resizeMode="contain"
              source={image.carGreenUp}
              style={{
                height: 20,
                width: 70,
              }}
            />
          </Marker>
          {/* </>
            );
          })} */}
        </MapView>
      </View>
    </>
  );
}

export default MapHistory;
