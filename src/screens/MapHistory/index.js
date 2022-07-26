import React, {useState, useEffect} from 'react';
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  TextInput,
  StyleSheet,
} from 'react-native';
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
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
// import MapView from '../../../Utils/helper/GoogleMap';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SelectDropdown from 'react-native-select-dropdown';

import MapView, {
  AnimatedRegion,
  Animated,
  MarkerAnimated,
  Callout,
  CalloutSubview,
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import GoogleMap from '../../../Utils/helper/GoogleMap';
import SimpleToast from 'react-native-simple-toast';
import {color} from 'react-native-reanimated';
const LATITUDE_DELTA = 0.08;
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
function MapHistory(props) {
  // console.log('props mapHist', props.route.params.details.imei);
  const imei = props?.route?.params?.details?.imei;
  const ime = props?.route?.params?.imei;

  // console.log('imeiimeiimeiimeiimei1111111111111111111', imei);
  // console.log('imeimeimeime000000000000000000000000000000000000', ime);
  const [data, setData] = useState([]);
  const [newImei, setNewImei] = useState(imei || ime);
  // console.log('newImeinewImeinewImeinewImeinewImei', newImei);

  //
  const [parkMode, setParkMode] = useState(true);
  const [selected, setSelected] = useState('All Vehicle');

  const [open, setOpen] = useState(false);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [fdate, setFdate] = useState('');
  const [fdateend, setFdateend] = useState('');
  const [ftime, setFtime] = useState('');
  const [ftimeend, setFtimeend] = useState('');
  const [dtype, setDtype] = useState();
  const [myMarker, setMyMarker] = useState(null);
  const [animate, setAnimate] = useState('');
  const [degree, setDegree] = useState(null);
  const [vehicleData, setVehicleData] = useState(false);
  const [loading, setLoading] = useState(false);

  const [coordinates, setCoordinates] = useState({
    coordinate: new AnimatedRegion({
      latitude: 30.7046,
      longitude: 77.1025,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
  });
  const GOOGLE_MAP_KEY = 'AIzaSyCOKXBz_YM85k4KcFzNxPUvEArDjhipX8c';
  React.useEffect(() => {
    getImei();
  }, [props]);

  const getImei = async () => {
    const data = await Storage.getVehicleDetail('vehicle_detail');
    if (newImei) {
      const filterVehicle = data.find(item => {
        return item.imei === newImei;
      });
      // setVehicleData(filterVehicle);
      setSelected(filterVehicle.deviceId);
      console.log('filerIIIMMMEEEEIIII', filterVehicle);
    }
    setVehicleData(data);
  };
  useEffect(() => {
    console.log('side bar menu', newImei);
    if (fdate !== '' && newImei !== undefined && fdateend !== '') {
      getMapHistory();
    }
    // return () => {
    //   clearInterval(interval);
    // };
  }, [fdate, fdateend, ftime, ftimeend, newImei]);
  const Select = async (data, imei) => {
    console.log('datadatadatadata', data);
    setSelected(data);
    setNewImei(imei);
    // setLoading(true);

    // setLoading(false);
  };
  const getMapHistory = async () => {
    const loginDetail = await Storage.getLoginDetail('login_detail');
    let username = loginDetail.accountId;
    let password = loginDetail.password;
    let data = {
      accountid: username,
      password: password,
      // imei: imei,
      imei: newImei,
      date: fdate,
    };
    const response = await axiosGetData('mapHistory', data);
    let newCoordinate = response?.data?.EventHistory;
    // 12:41:37
    console.log('1234567ftime', ftime);
    console.log('1234567ftimeend', ftimeend);
    var tstart = moment(ftime, 'hh:mm:ss').unix();
    var tsend = moment(ftimeend, 'hh:mm:ss').unix();
    console.log('tstart', tstart);
    console.log('tsend', tsend);
    newCoordinate.filter(item => {
      return tstart < parseFloat(item.packetTimeStamp) < tsend;
    });
    console.log('newDDDDDDDDDDDDDDDDDDDDD', newCoordinate.length);
    if (ime) {
      const summaryData = props?.route?.params?.summaryData;
      console.log('summaryData', summaryData);
      var ts = moment(
        summaryData?.['startTime:'],
        'YYYY-MM-DD hh:mm:ss',
      ).unix();
      var te = moment(summaryData?.['endTime:'], 'YYYY-MM-DD hh:mm:ss').unix();
      const utcTimeStart = ts - 19800;
      const utcTimeEnd = te - 19800;
      console.log('utcTimeStartutcTimeStartutcTimeStart', utcTimeStart);
      console.log('utcTimeEndutcTimeEndutcTimeEnd', utcTimeEnd);

      newCoordinate = response?.data?.EventHistory.filter(item => {
        return utcTimeStart < parseFloat(item.packetTimeStamp) < utcTimeEnd;
      });
    }
    // console.log('==--=-newCoordinate', newCoordinate);
    if (newCoordinate.length <= 0) {
      Toast.show('There is no data for this vehicle');
    } else {
      newCoordinate?.forEach(el => {
        setCoordinates(prev => ({
          ...prev,
          coordinate: {latitude: el.lat, longitude: el.lng},
        }));
      });
    }

    const filterDataa = newCoordinate?.map(item => {
      const date = parseFloat(item.packetTimeStamp) + 19800;
      const newDate = new Date(date);
      let month = newDate.getMonth() + 1;
      if (String(Math.abs(month)).length == 1) {
        month = '0' + month;
      }

      const filterTime = newDate.toLocaleTimeString('en-US');
      return {...item, packetTimeStamp: filterTime};
    });
    if (fdate === fdateend) {
      const newFilterData = filterDataa.filter(item => {
        return item.packetTimeStamp > ftime && item.packetTimeStamp < ftimeend;
      });
      setData(newFilterData);
    } else {
      setData(newCoordinate);
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

    let fTimeStart = fDateStart.toLocaleTimeString().slice(0, 8);
    console.log(fTimeStart);
    setFtime('00:00:00');
  };
  const onChangeEnd = selectedDate => {
    const currentDate = selectedDate || dateEnd;
    setShow(Platform.OS === 'ios');
    setDateEnd(currentDate);
    let fDateEnd = new Date(currentDate);

    setFdateend(formatDate(fDateEnd.toString()));
    let fTimeEnd = fDateEnd.toLocaleTimeString().slice(0, 40);

    setFtimeend(fTimeEnd);
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
  const start = data => {
    mapRef?.current?.getCamera().then(cam => {
      cam.zoom += 5;
      mapRef?.current?.animateCamera(cam);
    });
    setT(
      setInterval(() => {
        animateMarkerAndCamera(data);
      }, 5000),
    );
  };
  // console.log('dayaatatatatattatta', data[0]);
  // console.log('i', i);
  function animateMarkerAndCamera(datas) {
    console.log('poiuytrew ', datas);
    if (i <= data?.length - 1) {
      if (datas === 'start') {
        console.log('dtattatatiifiifif fif fif ', datas);

        const cord1 = {
          latitude: parseFloat(data[i - 1].lat),
          longitude: parseFloat(data[i - 1].lng),
        };
        const cord2 = {
          latitude: parseFloat(data[i].lat),
          longitude: parseFloat(data[i].lng),
        };

        const y =
          Math.sin(cord2.longitude - cord1.longitude) *
          Math.cos(cord2.latitude);
        const x =
          Math.cos(cord1.latitude) * Math.sin(cord2.latitude) -
          Math.sin(cord1.latitude) *
            Math.cos(cord2.latitude) *
            Math.cos(cord2.longitude - cord1.longitude);
        const θ = Math.atan2(y, x);
        console.log('θ', θ);
        const brng = ((θ * 180) / Math.PI + 360) % 360;
        console.log('brng', brng);

        setDegree(brng);

        let newCoordinate = {
          latitude: parseFloat(data[i]?.lat),
          longitude: parseFloat(data[i]?.lng),
          latitudeDelta: 0.012,
          longitudeDelta: 0.012,
        };
        const newCamera = {
          center: {
            latitude: parseFloat(data[i]?.lat),
            longitude: parseFloat(data[i]?.lng),
          },
          pitch: 0,
          heading: 0,
        };
        if (myMarker && mapRef.current) {
          myMarker.animateMarkerToCoordinate(newCoordinate, 5000);
          mapRef.current.animateCamera(newCamera, {duration: 5000});

          // mapRef.current.animateToRegion(newCoordinate, {duration: 5000});

          // mapRef.current.animateToRegion(newCoordinate, {duration: 5000});
        }
        i++;
      } else {
        console.log('elseseseelelelsrseese');
        const cord1 = {
          latitude: parseFloat(data[i].lat),
          longitude: parseFloat(data[i].lng),
        };
        const cord2 = {
          latitude: parseFloat(data[i + 1].lat),
          longitude: parseFloat(data[i + 1].lng),
        };

        const y =
          Math.sin(cord2.longitude - cord1.longitude) *
          Math.cos(cord2.latitude);
        const x =
          Math.cos(cord1.latitude) * Math.sin(cord2.latitude) -
          Math.sin(cord1.latitude) *
            Math.cos(cord2.latitude) *
            Math.cos(cord2.longitude - cord1.longitude);
        const θ = Math.atan2(y, x);
        console.log('θ', θ);
        const brng = ((θ * 180) / Math.PI + 360) % 360;
        console.log('brng', brng);

        setDegree(brng);

        let newCoordinate = {
          latitude: parseFloat(data[0]?.lat),
          longitude: parseFloat(data[0]?.lng),
          latitudeDelta: 0.012,
          longitudeDelta: 0.012,
        };
        const newCamera = {
          center: {
            latitude: parseFloat(data[0]?.lat),
            longitude: parseFloat(data[0]?.lng),
          },
          pitch: 0,
          heading: 0,
        };
        if (myMarker && mapRef.current) {
          myMarker.animateMarkerToCoordinate(newCoordinate, 1000);
          // mapRef == null;
          mapRef.current.animateCamera(newCamera, {duration: 1000});

          //

          mapRef?.current?.getCamera().then(cam => {
            cam.zoom -= 5;
            mapRef?.current?.animateCamera(cam);
          });

          //
          // mapRef.current.animateToRegion(newCoordinate, {duration: 5000});

          // mapRef.current.animateToRegion(newCoordinate, {duration: 5000});
        }
      }
    } else {
      console.log('jijijijiij');
      setAnimate(false);
      clearInterval(interval);
      setAnimate('stop');
      // i = 1;

      //
      mapRef?.current?.getCamera().then(cam => {
        cam.zoom -= 3;
        mapRef?.current?.animateCamera(cam);
      });
    }
  }

  // const animated = () => {
  //   console.log('myMarker.myMarker', mapRef.current.animateToRegion);

  //   const aaa = {
  //     latitude: parseFloat(data[0].lat),
  //     longitude: parseFloat(data[0].lng),
  //     latitudeDelta: LATITUDE_DELTA,
  //     longitudeDelta: (screen.width / screen.height) * 0.8822,
  //   };
  //   let r = {
  //     latitude: parseFloat(data[0].lat),
  //     longitude: parseFloat(data[0].lng),
  //     latitudeDelta: LATITUDE_DELTA,
  //     longitudeDelta: (screen.width / screen.height) * 0.00522,
  //   };
  //   // mapRef.current.animateToRegion(r, 1000);
  //   mapRef.current.animateToRegion(aaa);
  // };

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
      <TouchableOpacity style={style.textinputbox}>
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
            console.log(selectedItem.deviceId, index);
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
      </TouchableOpacity>
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

      {data?.length > 0 ? (
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => setParkMode(!parkMode)}
            style={{
              position: 'absolute',
              zIndex: 10,
              right: 0,
              top: 20,
            }}>
            <Image source={image.parking2} style={{width: 65, height: 65}} />
          </TouchableOpacity>
          {parkMode ? (
            <MapView
              // minZoomLevel={15}
              pitchEnabled={false}
              style={{flex: 1}}
              ref={mapRef}
              caheEnabled
              // onMapReady={() => animated()}
              // initialRegion={{
              //   latitude: parseFloat(data[0].lat),
              //   longitude: parseFloat(data[0].lng),
              //   latitudeDelta: LATITUDE_DELTA,
              //   longitudeDelta: LONGITUDE_DELTA,
              // }}
              region={{
                latitude: parseFloat(data[0]?.lat),
                longitude: parseFloat(data[0]?.lng),
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}>
              {data?.map((coordinate, index) => {
                return (
                  <>
                    <MarkerAnimated
                      // ref={marker => {
                      //   // console.log('marker', marker);
                      //   setMyMarker(marker);
                      // }}
                      pinColor={coordinate.ignition == 'On' ? 'green' : 'red'}
                      key={index.toString()}
                      coordinate={{
                        latitude: parseFloat(coordinate.lat),
                        longitude: parseFloat(coordinate.lng),
                      }}>
                      {/* {data[data.length - 1] == coordinate ? (
                      <Image
                        resizeMode="contain"
                        source={image.carGreenUp}
                        style={{
                          height: 50,
                          width: 50,
                        }}
                      />
                    ) : null} */}

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
                    </MarkerAnimated>
                  </>
                );
              })}
              <MarkerAnimated
                ref={marker => {
                  // console.log('marker', marker);
                  setMyMarker(marker);
                }}
                style={{
                  transform: [
                    {
                      rotate: degree === null ? '0deg' : `${degree}deg`,
                    },
                  ],
                }}
                // key={index.toString()}
                coordinate={{
                  latitude: parseFloat(data[0]?.lat),
                  longitude: parseFloat(data[0]?.lng),
                }}>
                {animate == 'stop' ? (
                  <Image
                    resizeMode="contain"
                    source={image.carGreenUp}
                    style={{
                      height: 30,
                      width: 30,
                    }}
                  />
                ) : animate == 'start' ? (
                  <Image
                    resizeMode="contain"
                    source={image.carGreenUp}
                    style={{
                      height: 0,
                      width: 0,
                    }}
                  />
                ) : null}
              </MarkerAnimated>

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
            </MapView>
          ) : (
            <>
              <MapView
                // minZoomLevel={15}
                pitchEnabled={false}
                style={{flex: 1}}
                ref={mapRef}
                caheEnabled
                region={{
                  latitude: parseFloat(data[0]?.lat),
                  longitude: parseFloat(data[0]?.lng),
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}>
                {data
                  ?.filter(item => item.stoppage)
                  .map((coordinate, index) => {
                    return (
                      <>
                        <MarkerAnimated
                          key={Math.random()}
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
                                  Stop Duration :{' '}
                                  {coordinate.stoppage.stopDuration}
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
                  })}

                <MarkerAnimated
                  ref={marker => {
                    // console.log('marker', marker);
                    setMyMarker(marker);
                  }}
                  style={{
                    transform: [
                      {
                        rotate: degree === null ? '0deg' : `${degree}deg`,
                      },
                    ],
                  }}
                  // key={index.toString()}
                  coordinate={{
                    latitude: parseFloat(data[0]?.lat),
                    longitude: parseFloat(data[0]?.lng),
                  }}>
                  {animate == 'stop' ? (
                    <Image
                      resizeMode="contain"
                      source={image.carGreenUp}
                      style={{
                        height: 30,
                        width: 30,
                      }}
                    />
                  ) : animate == 'start' ? (
                    <Image
                      resizeMode="contain"
                      source={image.carGreenUp}
                      style={{
                        height: 0,
                        width: 0,
                      }}
                    />
                  ) : null}
                </MarkerAnimated>
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
              </MapView>
            </>
          )}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
      {/* <TouchableOpacity
        onPress={() => {
          setAnimate(true), start();
        }}
        style={[styles.bubble, styles.button]}>
        <Text>Animate</Text>
      </TouchableOpacity> */}

      {data?.length > 0 ? (
        <>
          {animate == 'start' || animate == '' ? (
            <TouchableOpacity
              style={{position: 'absolute', bottom: 20, width: '100%'}}
              onPress={() => {
                setAnimate('stop'), start('start');
              }}>
              <LinearGradient
                colors={['#0065B3', '#083273']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                style={{
                  width: '80%',
                  backgroundColor: 'red',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 20,
                  borderRadius: 10,
                }}>
                <Text
                  style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                  Replay
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{position: 'absolute', bottom: 20, width: '100%'}}
              onPress={() => {
                setAnimate('start'),
                  clearInterval(interval),
                  (i = 0),
                  animateMarkerAndCamera('stop');
              }}>
              <LinearGradient
                colors={['#0065B3', '#083273']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                style={{
                  width: '80%',
                  backgroundColor: 'red',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 20,
                  borderRadius: 10,
                }}>
                <Text
                  style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                  stop
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </>
      ) : null}
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
