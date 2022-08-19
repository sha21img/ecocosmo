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
// import MapView from '../../../Utils/helper/GoogleMap';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
const LATITUDE_DELTA = 0.04;
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
function MapHistory(props) {
  const [data, setData] = useState([]);

  //

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
  const GOOGLE_MAP_KEY = 'AIzaSyCOKXBz_YM85k4KcFzNxPUvEArDjhipX8c';

  useEffect(() => {
    if (fdate !== '') {
      getMapHistory();
    }
  }, [open]);

  const getMapHistory = async () => {
    const loginDetail = await Storage.getLoginDetail('login_detail');
    let username = loginDetail.accountName;
    let password = loginDetail.password;
    let data = {
      accountid: username,
      password: password,
      imei: '351608080772390',
      date: fdate,
    };
    const response = await axiosGetData('mapHistory', data);
    const newCoordinate = response.data.EventHistory.slice(0, 10);
    const filterDataa = newCoordinate.map(item => {
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

    let fTimeStart = fDateStart.toLocaleTimeString();
    setFtime(fTimeStart);
  };
  const onChangeEnd = selectedDate => {
    const currentDate = selectedDate || dateEnd;
    setShow(Platform.OS === 'ios');
    setDateEnd(currentDate);
    let fDateEnd = new Date(currentDate);

    setFdateend(formatDate(fDateEnd.toString()));
    let fTimeEnd = fDateEnd.toLocaleTimeString();

    setFtimeend(fTimeEnd);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const mapRef = React.useRef(null);

  const showDatepicker = type => {
    setDtype(type);
    showMode('date');
  };
  const showTimepicker = type => {
    setDtype(type);
    showMode('time');
  };
  let i = 0;
  var interval;
  const start = () => {
    interval = setInterval(() => {
      animateMarkerAndCamera();
    }, 5000);
  };

  function animateMarkerAndCamera() {
    console.log('animateMarkerAndCamera');
    console.log('i', i);
    if (i < data.length) {
      let newCoordinate = {
        latitude: parseFloat(data[i].lat),
        longitude: parseFloat(data[i].lng),
        latitudeDelta: 0.012,
        longitudeDelta: 0.012,
      };
      const newCamera = {
        center: {
          latitude: parseFloat(data[i].lat),
          longitude: parseFloat(data[i].lng),
        },
        pitch: 0,
        heading: 0,
      };
      if (myMarker) {
        myMarker.animateMarkerToCoordinate(newCoordinate, 5000);
        mapRef.current.animateCamera(newCamera, {duration: 5000});
      }
      i++;
    } else {
      clearInterval(interval);
      i = 0;
    }
  }

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
      {data.length > 0 ? (
        <View style={{flex: 1}}>
          <MapView
            pitchEnabled={false}
            style={{flex: 1}}
            ref={mapRef}
            caheEnabled
            region={{
              latitude: parseFloat(data[0].lat),
              longitude: parseFloat(data[0].lng),
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}>
            {data?.map((coordinate, index) => {
              return (
                <>
                  <MarkerAnimated
                    ref={marker => {
                      setMyMarker(marker);
                    }}
                    pinColor={coordinate.ignition == 'On' ? 'green' : 'red'}
                    key={index.toString()}
                    coordinate={{
                      latitude: parseFloat(coordinate.lat),
                      longitude: parseFloat(coordinate.lng),
                    }}>
                    {data[0] == coordinate ? (
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
                  </MarkerAnimated>
                </>
              );
            })}

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
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
      <TouchableOpacity
        onPress={() => start()}
        style={[styles.bubble, styles.button]}>
        <Text>Animate</Text>
      </TouchableOpacity>
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
