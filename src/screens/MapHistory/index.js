import React, {useState, useEffect} from 'react';
import {Image, TouchableOpacity, Text, View, Dimensions} from 'react-native';
import {image} from '../../../assets/images';
import colors from '../../../assets/Colors';
import {axiosGetData} from '../../../Utils/ApiController';
import {Size} from '../../../assets/fonts/Fonts';
import Storage from '../../../Utils/Storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {__} from '../../../Utils/Translation/translation';
import style from './style';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapViewDirections from 'react-native-maps-directions';
// import MapView from '../../../Utils/helper/GoogleMap';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  AnimatedRegion,
  Animated,
  MarkerAnimated,
  Callout,
  CalloutSubview,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import GoogleMap from '../../../Utils/helper/GoogleMap';
const LATITUDE_DELTA = 0.04;
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
function MapHistory(props) {
  const [data, setData] = useState([]);
  const [coordinates, setCoordinates] = useState([
    {
      latitude: 26.9124,
      longitude: 75.7873,
    },
    {
      latitude: 27.7717,
      longitude: 76.4053,
    },
    {
      latitude: 27.9087,
      longitude: 77.4053,
    },
    {
      latitude: 28.7717,
      longitude: 77.4053,
    },
  ]);
  const GOOGLE_MAP_KEY = 'AIzaSyDuMZZzYTEBs7EONdnVfmZVXJluSzVbRkc';

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
    const newCoordinate = response.data.EventHistory;
    const filterData = newCoordinate.map(item => {
      return {latitude: parseFloat(item.lat), longitude: parseFloat(item.lng)};
    });
    console.log('filterData', newCoordinate);
    setData(newCoordinate);
    // const filter = response.data.EventHistory.slice(0,1);
    // setData(filter);
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
        {data.length > 0 ? (
          <View style={{flex: 1}}>
            <GoogleMap
              region={{
                latitude: parseFloat(data[0].lat),
                longitude: parseFloat(data[0].lng),
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}>
              {data?.map((coordinate, index) => {
                console.log('index.length', coordinate);
                return (
                  <>
                    <Marker
                      pinColor={coordinate.ignition == 'On' ? 'green' : 'red'}
                      tracksViewChanges={
                        data[data.length - 1] == coordinate ? true : false
                      }
                      // ref={markerRef}
                      key={index.toString()}
                      coordinate={{
                        latitude: parseFloat(coordinate.lat),
                        longitude: parseFloat(coordinate.lng),
                      }}>
                      {data[data.length - 1] == coordinate ? (
                        <Image
                          resizeMode="contain"
                          source={image.carGreenUp}
                          style={{
                            height: 50,
                            width: 50,
                          }}
                        />
                      ) : null}

                      <Callout tooltip>
                        <LinearGradient
                          colors={[
                            colors.mainThemeColor3,
                            colors.mainThemeColor4,
                          ]}
                          start={{x: 1.3, y: 0}}
                          end={{x: 0, y: 0}}
                          locations={[0, 0.9]}
                          style={style.firstbox}>
                          <View style={{paddingBottom: 5}}>
                            <Text style={style.firstboxtext1}>
                              {coordinate.timeStamp}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <AntDesign
                              style={{
                                color: '#17D180',
                                fontSize: 16,
                              }}
                              name={'caretdown'}
                            />
                            <Text
                              style={{
                                paddingHorizontal: 10,
                                color: colors.white,
                              }}>
                              Ignition: {coordinate.ignition}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              paddingTop: 5,
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
                                {Math.floor(coordinate?.speed)} {__('KM/H')}
                              </Text>
                              <Text style={style.secondboxtext11}>
                                {__('SPEED')}
                              </Text>
                            </View>
                            <View style={style.secondboxtextbox1}>
                              <Text style={{paddingVertical: 8}}>
                                <Image
                                  resizeMode="contain"
                                  source={image.distance}
                                  style={style.locimg}
                                />
                              </Text>
                              <Text style={style.secondboxtext1}>
                                {Math.floor(coordinate.odometer)} {__('KM')}
                              </Text>
                              <Text style={style.secondboxtext11}>
                                {__("TODAY'S ODO")}
                              </Text>
                            </View>
                          </View>
                        </LinearGradient>
                      </Callout>
                    </Marker>
                    {data.length >= 2 && (
                      <MapViewDirections
                        origin={{
                          latitude: parseFloat(data[0].lat),
                          longitude: parseFloat(data[0].lng),
                        }}
                        // waypoints={data.length > 2 ? data.slice(1, -1) : undefined}
                        destination={{
                          latitude: parseFloat(data[data.length - 1].lat),
                          longitude: parseFloat(data[data.length - 1].lng),
                        }}
                        apikey={GOOGLE_MAP_KEY}
                        strokeWidth={3}
                        strokeColor="hotpink"
                        optimizeWaypoints={true}
                        onStart={params => {
                          // console.log(
                          //   `Started routing between "${params.origin}" and "${params.destination}"`,
                          // );
                        }}
                        onReady={result => {
                          // console.log(`Distance: ${result.distance} km`);
                          // console.log(`Duration: ${result.duration} min.`);
                          // this.mapView.fitToCoordinates(result.coordinates, {
                          //   edgePadding: {
                          //     right: width / 20,
                          //     bottom: height / 20,
                          //     left: width / 20,
                          //     top: height / 20,
                          //   },
                          // });
                        }}
                        onError={errorMessage => {
                          // console.log('GOT AN ERROR');
                        }}
                      />
                    )}
                  </>
                );
              })}
            </GoogleMap>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
        {/* <GoogleMap
          region={{
            latitude: 30.30,
            longitude: 75.30,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          {data?.map((item, index) => {
            console.log('this is item of car', item);
            return (
              <>
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
                      width: 30,
                      height: 70,
                    }}
                  />
                  <Callout tooltip>
                    <LinearGradient
                      colors={[colors.mainThemeColor3, colors.mainThemeColor4]}
                      start={{x: 1.3, y: 0}}
                      end={{x: 0, y: 0}}
                      locations={[0, 0.9]}
                      style={style.firstbox}>
                      <View style={{paddingBottom: 5}}>
                        <Text style={style.firstboxtext1}>
                          {item.timeStamp}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <AntDesign
                          style={{
                            color: '#17D180',
                            fontSize: 16,
                          }}
                          name={'caretdown'}
                        />
                        <Text style={{paddingHorizontal: 10}}>
                          Ignition: {item.ignition}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          paddingTop: 5,
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
                            {Math.floor(item?.speed)} {__('KM/H')}
                          </Text>
                          <Text style={style.secondboxtext11}>
                            {__('SPEED')}
                          </Text>
                        </View>
                        <View style={style.secondboxtextbox1}>
                          <Text style={{paddingVertical: 8}}>
                            <Image
                              resizeMode="contain"
                              source={image.distance}
                              style={style.locimg}
                            />
                          </Text>
                          <Text style={style.secondboxtext1}>
                            {Math.floor(item.odometer)} {__('KM')}
                          </Text>
                          <Text style={style.secondboxtext11}>
                            {__("TODAY'S ODO")}
                          </Text>
                        </View>
                      </View>
                    </LinearGradient>
                  </Callout>
                </Marker>
              </>
            );
          })}
        </GoogleMap> */}
      </View>
    </>
  );
}
// export default CarMarker = React.memo(MapHistory);
export default MapHistory;
