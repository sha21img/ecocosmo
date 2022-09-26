import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {image} from '../../../assets/images';
import colors from '../../../assets/Colors';
import {axiosGetData} from '../../../Utils/ApiController';
import {Size} from '../../../assets/fonts/Fonts';
import Storage from '../../../Utils/Storage';
import {__} from '../../../Utils/Translation/translation';
import style from './style';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SelectDropdown from 'react-native-select-dropdown';
import {useIsFocused} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';

import MapView, {
  MarkerAnimated,
  Callout,
  Marker,
  Polyline,
} from 'react-native-maps';
const LATITUDE_DELTA = 0.08;
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
function MapHistory(props) {
  const focus = useIsFocused();
  const imei = props?.route?.params?.details?.imei;
  const ime = props?.route?.params?.imei;
  const [data, setData] = useState([]);
  const [newImei, setNewImei] = useState(imei || ime);
  const [parkMode, setParkMode] = useState(true);
  const [selected, setSelected] = useState(
    props?.route?.params?.details?.deviceId || 'All Vehicle',
  );
  const [open, setOpen] = useState(false);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [fdate, setFdate] = useState('');
  const [fdateend, setFdateend] = useState('');
  const [ftime, setFtime] = useState('00:00');
  const [ftimeend, setFtimeend] = useState('');
  const [dtype, setDtype] = useState();
  const [myMarker, setMyMarker] = useState(null);
  const [animate, setAnimate] = useState('start');
  const [degree, setDegree] = useState(null);
  const [vehicleData, setVehicleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [speed, setSpeed] = useState(5000);
  const [trackViewChanges, setTrackViewChanges] = useState(false);
  const [isVisibleMarker, setIsVisibleMarker] = useState(false);
  const [isVisibleMarker1, setIsVisibleMarker1] = useState(false);
  const [lastRide, setLastRide] = useState(false);
  const [loop, setLoop] = useState(1);

  const [coordinates, setCoordinates] = useState({
    coordinate: {
      latitude: 30.7046,
      longitude: 77.1025,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  });
  const GOOGLE_MAP_KEY = 'AIzaSyCOKXBz_YM85k4KcFzNxPUvEArDjhipX8c';
  React.useEffect(() => {
    if (focus == true) {
      const filterImei = imei || ime;
      console.log('props', filterImei);
      setNewImei(imei || ime);
      var a = moment(new Date()).format('YYYY-MM-DD');
      setFdate(a);
      if (props?.route?.params?.summaryData != undefined) {
        const summaryData = props?.route?.params?.summaryData;
        console.log('summaryD', summaryData['startTime:']);
        console.log('summaryData', summaryData['endTime:']);
        var fTime = moment(summaryData['startTime:']).format('hh:mm');
        var endTime = moment(summaryData['endTime:']).format('hh:mm');
        console.log('fTime', fTime);
        console.log('endTime', endTime);
        setFtime(fTime);
        setFtimeend(endTime);
        getMapHistory(a, endTime, fTime);
        setIsVisibleMarker(true);
      } else {
        setFtime('00:00');
        var ab = moment(new Date()).format('hh:mm');
        console.log('avavava', ab);
        setFtimeend(ab);
        getMapHistory(a, ab, fTime);
      }

      getImei(filterImei);
      // getMapHistory(a, ab);
    }
  }, [props, focus]);

  const getImei = async filterImei => {
    console.log('filterImei for ma[', filterImei);
    const data = await Storage.getVehicleDetail('vehicle_detail');
    if (filterImei !== undefined) {
      const filterVehicle = data.find(item => {
        return item.imei === filterImei;
      });
      setSelected(filterVehicle.deviceId);
    } else {
      setSelected(data[0]?.deviceId);
      setNewImei(data[0]?.imei);
    }
    setVehicleData(data);
  };
  const Select = async (data, imei) => {
    setSelected(data);
    setNewImei(imei);
  };
  const getMapHistory = async (date, endTime, startTime) => {
    console.log('gggetetetetmamam', loading);
    setLoading(false);

    const loginDetail = await Storage.getLoginDetail('login_detail');
    let username = loginDetail.accountId;
    let password = loginDetail.password;
    let data = {
      accountid: username,
      password: password,

      imei: newImei,
      date: date || fdate,
      startTime: startTime || ftime,
      endTime: endTime || ftimeend,
      //
      // startTime: '03:00',
      // imei: '353701092279609',
      // endTime: '10:00',
      // date: '2022-09-05',
      //
    };
    console.log('maphistory eith time daata', data);
    const response = await axiosGetData('mapHistoryWithTime', data);
    let newCoordinate = response?.data?.EventHistory;
    setLoading(true);

    console.log('mapHistory APi', newCoordinate?.length);

    setData(newCoordinate);

    if (newCoordinate.length > 0) {
      setCoordinates(prev => ({
        ...prev,
        coordinate: {
          latitude: parseFloat(newCoordinate[0]?.lat),
          longitude: parseFloat(newCoordinate[0]?.lng),
        },
      }));
    } else {
      Toast.show('There is no data for this vehicle');
    }
  };
  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  const onChangeStart = selectedDate => {
    const currentDate = selectedDate || dateStart;
    setShow(Platform.OS === 'ios');
    setDateStart(currentDate);
    let fDateStart = new Date(currentDate);
    setFdate(formatDate(fDateStart.toString()));

    const fTimeStart = moment(fDateStart).format('hh:mm');
    setFtime(fTimeStart);
  };
  const onChangeEnd = selectedDate => {
    const currentDate = selectedDate || dateEnd;
    setShow(Platform.OS === 'ios');
    setDateEnd(currentDate);
    let fDateEnd = new Date(currentDate);

    setFdateend(formatDate(fDateEnd.toString()));
    let fTimeEnd = fDateEnd.toLocaleTimeString().slice(0, 40);

    const endTime = moment(fDateEnd).format('hh:mm');
    setFtimeend(endTime);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  var mapRef = React.useRef(null);

  const showDatepicker = type => {
    setDtype(type);
    showMode('date');
  };
  const showTimepicker = type => {
    setDtype(type);
    showMode('time');
  };
  let i = 1;
  const [interval, setT] = useState(null);
  const speedRef = useRef(speed);
  const loopRef = useRef(loop);
  console.log('llllllllllloooooooooooooooooopppppppppp', loopRef.current);
  useEffect(() => {
    speedRef.current = speed;
    loopRef.current = loop;
  });
  useEffect(() => {
    console.log('laaaaaaaaaaaaaaaaaaaaaaa', lastRide);
    if (lastRide == true) {
      clearInterval(interval);
      // setT(null);
    }
  });

  const start = datas => {
    console.log('markerRef.current', mapRef.current);
    mapRef.current.animateToRegion({
      latitude: parseFloat(data[0]?.lat),
      longitude: parseFloat(data[0]?.lng),
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
    // var timeOut = setTimeout(() => {
    //   mapRef?.current?.getCamera().then(cam => {
    //     console.log('caamam', cam);
    //     cam.zoom += 3;
    //     mapRef?.current?.animateCamera(cam);
    //   }, 2000);
    // });
    // clearTimeout(timeout);

    setT(
      setInterval(() => {
        console.log('aaaaabbbccc');
        animateMarkerAndCamera(datas);
      }, speedRef.current),
    );
  };

  function animateMarkerAndCamera(datas) {
    console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiii', loopRef.current);
    if (loopRef.current <= data?.length - 1) {
      const cord1 = {
        latitude: parseFloat(data[loopRef.current - 1].lat),
        longitude: parseFloat(data[loopRef.current - 1].lng),
      };
      const cord2 = {
        latitude: parseFloat(data[loopRef.current].lat),
        longitude: parseFloat(data[loopRef.current].lng),
      };

      const y =
        Math.sin(cord2.longitude - cord1.longitude) * Math.cos(cord2.latitude);
      const x =
        Math.cos(cord1.latitude) * Math.sin(cord2.latitude) -
        Math.sin(cord1.latitude) *
          Math.cos(cord2.latitude) *
          Math.cos(cord2.longitude - cord1.longitude);
      const θ = Math.atan2(y, x);
      const brng = ((θ * 180) / Math.PI + 360) % 360;

      setDegree(brng);

      let newCoordinate = {
        latitude: parseFloat(data[loopRef.current]?.lat),
        longitude: parseFloat(data[loopRef.current]?.lng),
        latitudeDelta: 0.012,
        longitudeDelta: 0.012,
      };
      const newCamera = {
        center: {
          latitude: parseFloat(data[loopRef.current]?.lat),
          longitude: parseFloat(data[loopRef.current]?.lng),
        },
        pitch: 0,
        heading: 0,
      };
      if (myMarker && mapRef.current) {
        console.log(
          'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          speedRef.current,
        );
        myMarker.animateMarkerToCoordinate(newCoordinate, speedRef.current);
        mapRef.current.animateCamera(newCamera, {duration: speedRef.current});
      }
      setLoop(prev => {
        return prev + 1;
      });
    } else {
      console.log('0987654321234567890');
      setAnimate('start');
      const newCoordinate = {
        latitude: parseFloat(data[0]?.lat),
        longitude: parseFloat(data[0]?.lng),
      };

      myMarker.animateMarkerToCoordinate(newCoordinate, speedRef.current);
      mapRef.current.animateCamera(newCoordinate, {
        duration: speedRef.current,
      });
      // setAnimate('start');
      setLoop(1);
      setLastRide(true);
      // setT('')
      //
      // mapRef?.current?.getCamera().then(cam => {
      //   cam.zoom -= 3;
      //   mapRef?.current?.animateCamera(cam);
      // });
    }
  }
  const [mapPs, setMapPs] = useState(0);
  const markerRef = React.useRef(null);
  const [isActive, setIsActive] = useState(null);
  const [showCallout, setCallout] = useState(false);
  const CustomMarker1 = ({isVisibleMarker}) => {
    const a = data?.filter(item => {
      return item.stoppage !== '';
    });
    const getMessage = () => {
      Toast.show('No stoppages found');
      return null;
    };
    return (
      <>
        {isVisibleMarker && a.length > 0
          ? data
              ?.filter(item => {
                return item.stoppage !== '';
              })
              .map((coordinate, index) => {
                return (
                  <>
                    <MarkerAnimated
                      key={index}
                      coordinate={{
                        latitude: parseFloat(coordinate.lat),
                        longitude: parseFloat(coordinate.lng),
                      }}>
                      <Image
                        resizeMode="contain"
                        source={image.parkingPoint}
                        style={{
                          height: 50,
                          width: 50,
                        }}
                      />
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
                              Address : {coordinate.stoppage.address}
                            </Text>
                            <Text style={style.firstboxtext1}>
                              Stop Duration : {coordinate.stoppage.stopDuration}
                            </Text>
                            <Text style={style.firstboxtext1}>
                              From : {coordinate.stoppage.stopTime1}
                            </Text>
                            <Text style={style.firstboxtext1}>
                              To : {coordinate.stoppage.stopTime2}
                            </Text>
                          </View>
                        </LinearGradient>
                      </Callout>
                    </MarkerAnimated>
                  </>
                );
              })
          : getMessage()}
      </>
    );
  };
  const CustomMarker = ({isVisibleMarker, isActive, setIsActive}) => {
    const renderCallout = coordinate => {
      console.log('hhhhhhhhhhhhhhhhhhhhhhh');
      return (
        <LinearGradient
          colors={[colors.mainThemeColor3, colors.mainThemeColor4]}
          start={{x: 1.3, y: 0}}
          end={{x: 0, y: 0}}
          locations={[0, 0.9]}
          style={style.firstbox}>
          <View style={{paddingBottom: 5}}>
            <Text style={style.firstboxtext1}>{coordinate.timeStamp}</Text>
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
              <Text style={style.secondboxtext1}>
                {Math.floor(coordinate.odometer)} {__('KM')}
              </Text>
              <Text style={style.secondboxtext11}>{__("TODAY'S ODO")}</Text>
            </View>
          </View>
        </LinearGradient>
      );
    };
    return (
      <>
        {isVisibleMarker
          ? data.map((coordinate, index) => {
              return (
                <>
                  <Marker
                    trackViewChanges={false}
                    ref={markerRef}
                    onCalloutPress={() => {
                      setCallout(false);
                      markerRef.current.showCallout();
                    }}
                    onPress={() => {
                      setCallout(true);
                      setIsActive(coordinate.packetTimeStamp),
                        markerRef.current.showCallout();
                      console.log(',,,,,,', coordinate);
                    }}
                    icon={
                      coordinate.direction == 'E'
                        ? image.E
                        : coordinate.direction == 'N'
                        ? image.N
                        : coordinate.direction == 'NE'
                        ? image.NE
                        : coordinate.direction == 'NW'
                        ? image.NW
                        : coordinate.direction == 'S'
                        ? image.S
                        : coordinate.direction == 'SE'
                        ? image.SE
                        : coordinate.direction == 'SW'
                        ? image.SW
                        : coordinate.direction == 'W'
                        ? image.W
                        : null
                    }
                    key={index}
                    pinColor={coordinate.ignition == 'On' ? 'green' : 'red'}
                    coordinate={{
                      latitude: parseFloat(coordinate.lat),
                      longitude: parseFloat(coordinate.lng),
                    }}>
                    {/* {showCallout ? ( */}
                    {/* <Callout tooltip> */}
                    {isActive === coordinate.packetTimeStamp
                      ? renderCallout(coordinate)
                      : null}
                    {/* </Callout> */}

                    {/* ) : null} */}
                  </Marker>
                </>
              );
            })
          : null}
      </>
    );
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
            justifyContent: 'space-between',
            paddingVertical: 10,
            // backgroundColor: 'red',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              // style={{paddingVertical: 10}}
            >
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
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                animate == 'start' && setIsVisibleMarker(!isVisibleMarker);
              }}
              style={{
                borderRadius: 50,
                float: 'right',
                justifyContent: 'flex-end',
                // backgroundColor: 'green',
              }}>
              {isVisibleMarker ? (
                <Fontisto
                  style={{
                    color: 'green',
                    fontSize: 30,
                  }}
                  name={'map-marker-alt'}
                />
              ) : (
                <Fontisto
                  style={{
                    color: 'grey',
                    fontSize: 30,
                  }}
                  name={'map-marker-alt'}
                />
              )}
            </TouchableOpacity>
            {props?.route?.params?.summaryData == undefined ? (
              <TouchableOpacity
                disabled={!loading}
                onPress={() => {
                  console.log('GOOOOOOOOOOOOOOOOOOOOOOOO');
                  animate == 'start' && getMapHistory();
                }}
                style={{
                  borderRadius: 50,
                  float: 'right',
                  justifyContent: 'flex-end',
                }}>
                <Text
                  style={{
                    fontSize: Size.large,
                    color: colors.white,
                    paddingHorizontal: 15,
                  }}>
                  {__('Go')}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </LinearGradient>
      <View style={style.textinputbox}>
        <SelectDropdown
          buttonStyle={{
            width: '100%',
            borderRadius: 7,
            backgroundColor: colors.white,
          }}
          data={vehicleData}
          defaultButtonText={selected}
          onSelect={(selectedItem, index) => {
            setSelected(selectedItem.deviceId);
            Select(selectedItem.deviceId, selectedItem.imei);
            // console.log(selectedItem.deviceId, index);
          }}
          buttonTextAfterSelection={selectedItem => {
            return selectedItem.deviceId;
          }}
          rowTextForSelection={item => {
            return item.deviceId;
          }}
          renderDropdownIcon={() => {
            return (
              <MaterialIcons
                style={{
                  color: '#3D3D3D',
                  fontSize: 20,
                }}
                name={'keyboard-arrow-down'}
              />
            );
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingHorizontal: 20,
          justifyContent: 'space-between',
          paddingVertical: 10,
          backgroundColor: colors.white,
          elevation: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            showDatepicker('start'), setOpen(true);
          }}
          style={{
            borderWidth: 1,
            borderColor: '#D9D9D9',
            flexDirection: 'row',
            paddingHorizontal: 15,
            width: '47%',
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            editable={false}
            placeholder={'From Date'}
            style={{fontSize: 14}}
            value={fdate}></TextInput>

          <MaterialIcons
            style={{
              color: '#3D3D3D',
              fontSize: 16,
            }}
            name={'keyboard-arrow-down'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            showDatepicker('end'), setOpen(true);
          }}
          style={{
            borderColor: '#D9D9D9',
            borderWidth: 1,
            flexDirection: 'row',
            paddingHorizontal: 15,
            width: '47%',
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            editable={false}
            style={{fontSize: 14}}
            value={fdateend}
            placeholder={'To Date'}
          />

          <MaterialIcons
            style={{
              color: '#3D3D3D',
              fontSize: 16,
            }}
            name={'keyboard-arrow-down'}
          />
        </TouchableOpacity>
      </View>
      {show && (
        <DatePicker
          modal
          open={open}
          date={dtype == 'start' ? dateStart : dateEnd}
          onConfirm={date => {
            dtype == 'start' ? onChangeStart(date) : onChangeEnd(date);
            setOpen(false);
          }}
          mode={mode}
          onCancel={() => {
            setOpen(false);
          }}
        />
      )}
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
          onPress={() => {
            showTimepicker('start'), setOpen(true);
          }}
          style={{
            borderWidth: 1,
            borderColor: '#D9D9D9',
            flexDirection: 'row',
            paddingHorizontal: 15,
            width: '47%',
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            editable={false}
            placeholder={'From Time'}
            style={{fontSize: 14}}
            value={ftime}
          />
          <MaterialIcons
            style={{
              color: '#3D3D3D',
              fontSize: 16,
            }}
            name={'keyboard-arrow-down'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            showTimepicker('end'), setOpen(true);
          }}
          style={{
            borderColor: '#D9D9D9',
            borderWidth: 1,
            flexDirection: 'row',
            paddingHorizontal: 15,
            width: '47%',
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            editable={false}
            placeholder={'To Time'}
            style={{fontSize: 14}}
            value={ftimeend}
          />
          <MaterialIcons
            style={{
              color: '#3D3D3D',
              fontSize: 16,
            }}
            name={'keyboard-arrow-down'}
          />
        </TouchableOpacity>
      </View>
      {loading ? (
        <>
          <View
            style={{position: 'relative'}}
            onLayout={event => {
              const layout = event.nativeEvent.layout;

              setMapPs(layout.y);
            }}>
            <MapView
              onPress={e => {
                if (e.nativeEvent.action !== 'marker-press') {
                  // console.log('eeeeeeeeeeeeeeeeeeeeee', e.nativeEvent.action);
                  setIsActive(null);
                  // pressed a marker
                } else {
                  // pressed the map
                }
              }}
              // onRegionChangeComplete={() => setIsActive(null)}
              onMapReady={region =>
                setCoordinates(prev => {
                  return {
                    ...prev,
                    coordinate: {
                      latitude:
                        parseFloat(data[0]?.lat) ||
                        coordinates.coordinate.latitude,
                      longitude:
                        parseFloat(data[0]?.lng) ||
                        coordinates.coordinate.longitude,
                    },
                  };
                })
              }
              pitchEnabled={false}
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
              }}
              ref={mapRef}
              // minZoomLevel={15}
              region={{
                latitude: coordinates.coordinate.latitude,
                longitude: coordinates.coordinate.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}>
              {data[0] ? (
                <Marker
                  coordinate={{
                    latitude: parseFloat(data[0]?.lat),
                    longitude: parseFloat(data[0]?.lng),
                  }}>
                  <Image
                    source={image.greenFlag}
                    style={{resizeMode: 'contain', height: 40, width: 40}}
                  />
                </Marker>
              ) : null}
              {data[data.length - 1] ? (
                <Marker
                  coordinate={{
                    latitude: parseFloat(data[data.length - 1]?.lat),
                    longitude: parseFloat(data[data.length - 1]?.lng),
                  }}>
                  <Image
                    source={image.pinkFlag}
                    style={{resizeMode: 'contain', height: 40, width: 40}}
                  />
                </Marker>
              ) : null}
              {data?.length > 0 ? (
                <>
                  {parkMode ? (
                    <CustomMarker
                      isVisibleMarker={isVisibleMarker}
                      isActive={isActive}
                      setIsActive={setIsActive}
                    />
                  ) : (
                    <CustomMarker1 isVisibleMarker={isVisibleMarker} />
                  )}
                  <MarkerAnimated
                    flat={true}
                    icon={
                      animate == 'stop'
                        ? image.carGreenUp1
                        : animate == 'start'
                        ? image.blank
                        : null
                    }
                    ref={marker => {
                      setMyMarker(marker);
                    }}
                    style={{
                      transform: [
                        {
                          rotate: degree === null ? '0deg' : `${degree}deg`,
                        },
                      ],
                    }}
                    coordinate={{
                      latitude: parseFloat(data[0]?.lat),
                      longitude: parseFloat(data[0]?.lng),
                    }}></MarkerAnimated>
                  <Polyline
                    strokeWidth={2}
                    strokeColor="red"
                    coordinates={[
                      ...data.map((value, index) => {
                        return {
                          latitude: parseFloat(value.lat),
                          longitude: parseFloat(value.lng),
                        };
                      }),
                    ]}
                  />
                </>
              ) : null}
            </MapView>
          </View>
          {data?.length > 0 ? (
            <>
              {animate == 'start' || animate == '' ? (
                <>
                  <TouchableOpacity
                    style={{position: 'absolute', bottom: 0, width: '100%'}}
                    onPress={() => {
                      setAnimate('stop'), start('start'), setIsActive(null);

                      setLastRide(false);
                    }}>
                    <LinearGradient
                      colors={['#0065B3', '#083273']}
                      start={{x: 0, y: 1}}
                      end={{x: 1, y: 0}}
                      style={{
                        width: '100%',
                        backgroundColor: 'red',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 15,
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}>
                        Replay
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      position: 'absolute',
                      bottom: 60,
                      width: '100%',
                      justifyContent: 'space-around',
                    }}>
                    <LinearGradient
                      style={{borderRadius: 7, padding: 5, width: '21%'}}
                      start={{x: 0, y: 1}}
                      end={{x: 1, y: 0}}
                      colors={[colors.largeBtn1, colors.largeBtn2]}>
                      <TouchableOpacity
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingVertical: 5,
                          borderRadius: 10,
                        }}>
                        <Text style={{fontSize: 14, color: 'white'}}>
                          {data[data.length - 1].odometer} KM
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: 'white',
                          }}>
                          Odometer
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient
                      start={{x: 0, y: 1}}
                      end={{x: 1, y: 0}}
                      style={{borderRadius: 7, padding: 5, width: '21%'}}
                      colors={[colors.largeBtn1, colors.largeBtn2]}>
                      <TouchableOpacity
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingVertical: 5,
                          borderRadius: 10,
                        }}>
                        <Text style={{fontSize: 14, color: 'white'}}>
                          {moment(data[0]?.timeStamp).format('hh:mm A')}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: 'white',
                          }}>
                          Start Time
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient
                      start={{x: 0, y: 1}}
                      end={{x: 1, y: 0}}
                      style={{borderRadius: 7, padding: 5, width: '21%'}}
                      colors={[colors.largeBtn1, colors.largeBtn2]}>
                      <TouchableOpacity
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 10,
                          paddingVertical: 5,
                        }}>
                        <Text style={{fontSize: 14, color: 'white'}}>
                          {moment(data[data.length - 1].timeStamp).format(
                            'hh:mm A',
                          )}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: 'white',
                          }}>
                          End Time
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient
                      start={{x: 0, y: 1}}
                      end={{x: 1, y: 0}}
                      style={{borderRadius: 7, padding: 5, width: '21%'}}
                      colors={[colors.largeBtn1, colors.largeBtn2]}>
                      <TouchableOpacity
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingVertical: 5,
                          borderRadius: 10,
                        }}
                        onPress={() => {
                          if (speed > 500) {
                            clearInterval(interval);
                            speedRef.current -= 1500;

                            setSpeed(prev => {
                              return prev - 1500;
                            });
                            // const a = speedRef.current - 1500;

                            setT(
                              setInterval(() => {
                                console.log('aaaaabbbccc');
                                animateMarkerAndCamera();
                              }, speedRef.current),
                            );
                          } else {
                            clearInterval(interval);
                            setSpeed(5000);
                            speedRef.current = 5000;

                            console.log(
                              '.........................................................................',
                              speedRef.current,
                            );

                            setT(
                              setInterval(() => {
                                console.log('aaaaabbbccc');
                                animateMarkerAndCamera();
                              }, speedRef.current),
                            );
                            // clearInterval(interval);
                          }
                        }}>
                        <Text style={{fontSize: 14, color: 'white'}}>
                          {speed == 5000
                            ? '1x'
                            : speed == 3500
                            ? '2x'
                            : speed == 2000
                            ? '4x'
                            : speed == 500
                            ? '8x'
                            : null}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: 'white',
                          }}>
                          Replay Speed
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                  <TouchableOpacity
                    style={{position: 'absolute', bottom: 0, width: '100%'}}
                    onPress={() => {
                      const newCoordinate = {
                        latitude: parseFloat(data[0]?.lat),
                        longitude: parseFloat(data[0]?.lng),
                      };
                      setAnimate('start'),
                        // setT(null),
                        clearInterval(interval),
                        setIsActive(null);
                      // (i = 0);
                      // animateMarkerAndCamera('stop');
                      myMarker.animateMarkerToCoordinate(
                        newCoordinate,
                        speedRef.current,
                      );
                      mapRef.current.animateCamera(newCoordinate, {
                        duration: speedRef.current,
                      });
                      // setLastRide(true);
                      setLoop(1);
                      // mapRef?.current?.getCamera().then(cam => {
                      //   cam.zoom -= 3;
                      //   mapRef?.current?.animateCamera(cam);
                      // });
                    }}>
                    <LinearGradient
                      colors={['#0065B3', '#083273']}
                      start={{x: 0, y: 1}}
                      end={{x: 1, y: 0}}
                      style={{
                        width: '100%',
                        backgroundColor: 'red',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 15,
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}>
                        stop
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              )}
            </>
          ) : null}

          {data?.length > 0 && mapPs !== 0 ? (
            <TouchableOpacity
              onPress={() => {
                setIsVisibleMarker1(!isVisibleMarker1), setParkMode(!parkMode);
              }}
              style={{
                position: 'absolute',
                // zIndex: 60,
                top: mapPs + 10,
                right: 10,

                justifyContent: 'center',
              }}>
              <Image source={image.parking2} style={{width: 65, height: 65}} />
            </TouchableOpacity>
          ) : null}
        </>
      ) : (
        <ActivityIndicator color={colors.black} />
      )}
    </>
  );
}
export default MapHistory;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    position: 'absolute',
    top: '90%',
    right: '40%',
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});
