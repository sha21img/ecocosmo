import React, {useState, useEffect} from 'react';
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  TextInput,
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
    // console.log(response.data.EventHistory, 'vvvv');
    const newCoordinate = response.data.EventHistory;
    // console.log('newCoordinate123', newCoordinate);
    // const filterData = newCoordinate.map(item => {
    //   return {latitude: parseFloat(item.lat), longitude: parseFloat(item.lng)};
    // });
    const filterDataa = newCoordinate.map(item => {
      const date = parseFloat(item.packetTimeStamp) + 19800;
      const newDate = new Date(date);
      let month = newDate.getMonth() + 1;
      if (String(Math.abs(month)).length == 1) {
        month = '0' + month;
      }

      const filterTime = newDate.toLocaleTimeString('en-US');
      // const filterDate = `${newDate.getFullYear()}-${month}-${newDate.getDate()}`;
      // console.log('filterDate', filterDate);
      // console.log('filterTime', filterTime);
      return {...item, packetTimeStamp: filterTime};
      // if (filterDate == fdate && filterDate == fdateend) {
      //   if (ftime > filterTime) {
      //     return ftime > filterTime;
      //   } else if (ftimeend < filterTime) {
      //     return ftimeend < filterTime;
      //   }

      // var startTime = moment(ftime, 'HH:mm:ss');
      // var endTime = moment(ftimeend, 'HH:mm:ss');
      // var duration = moment.duration(endTime.diff(startTime));
      // var hours = parseInt(duration.asHours());
      // var minutes = parseInt(duration.asMinutes()) % 60;
      // var seconds = parseInt(duration.asSeconds()) % 60;
      // const newTime = `${hours}-${minutes}-${seconds}`;
      // console.log('11111111111111111', newTime);
      //   return newTime < filterTime;
      // } else {
      // 09:41:37
      // console.log('ftimeendftimeend', ftimeend);
      // console.log('ftimeftimeftimeftime', ftime);
      // var result = moment(ftimeend.diff(ftime)).format('H:mm:ss');
      // console.log('result', result);
      // console.log(
      //   'elsesese------------------------------------------------------------------------------------',
      // );
      // }
    });
    // console.log(
    //   'hihiihih---------------------------------------------------------------------------------------',
    //   filterDataa,
    // );

    if (fdate === fdateend) {
      const newFilterData = filterDataa.filter(item => {
        // if (item.packetTimeStamp > ftime && item.packetTimeStamp < ftimeend) {
        return item.packetTimeStamp > ftime && item.packetTimeStamp < ftimeend;
        // }
        // else if(item.packetTimeStamp<ftimeend){

        // }
      });
      setData(newFilterData);
      // console.log('aaaaaaaaaaaa', aa);
    } else {
      // console.log('eeeeee');
      setData(newCoordinate);
    }
    // console.log('filterererre', filterData);

    // console.log('filterData', newCoordinate);
    // setData(newCoordinate);
    // const filter = response.data.EventHistory.slice(0,1);
    // setData(filter);
  };
  // console.log(data, '098765432');
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
    // console.log('selectedDate', selectedDate);
    const currentDate = selectedDate || dateStart;
    setShow(Platform.OS === 'ios');
    setDateStart(currentDate);
    let fDateStart = new Date(currentDate);
    // console.log('fDateStart', fDateStart);
    setFdate(formatDate(fDateStart.toString()));

    let fTimeStart = fDateStart.toLocaleTimeString().slice(0, 8);
    // console.log('fTimeStart', fTimeStart);
    setFtime(fTimeStart);
  };
  const onChangeEnd = selectedDate => {
    // console.log('onChangeEnd selectedDate', selectedDate);

    // console.log('onChangeend')
    const currentDate = selectedDate || dateEnd;
    setShow(Platform.OS === 'ios');
    setDateEnd(currentDate);
    let fDateEnd = new Date(currentDate);
    // console.log('fDateEnd', fDateEnd);

    setFdateend(formatDate(fDateEnd.toString()));
    let fTimeEnd = fDateEnd.toLocaleTimeString().slice(0, 8);
    // console.log('fTimeEnd', fTimeEnd);

    setFtimeend(fTimeEnd);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = type => {
    // console.log('type', type);
    setDtype(type);
    showMode('date');
  };
  const showTimepicker = type => {
    setDtype(type);
    showMode('time');
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
          onPress={() => {
            showDatepicker('start'), setOpen(true);
          }}
          // onPress={() => showDatepicker('from')}
          style={{
            borderWidth: 1,
            borderColor: '#D9D9D9',
            flexDirection: 'row',
            paddingHorizontal: 15,
            // paddingVertical: 12,
            width: '47%',
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            editable={false}
            placeholder={'From Date'}
            style={{fontSize: 14}}
            value={fdate}>
            {/* {' '} */}
            {/* {fdate} */}
          </TextInput>

          <MaterialIcons
            style={{
              color: '#3D3D3D',
              fontSize: 16,
            }}
            name={'keyboard-arrow-down'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() => showDatepicker('to')}
          onPress={() => {
            showDatepicker('end'), setOpen(true);
          }}
          style={{
            borderColor: '#D9D9D9',
            borderWidth: 1,
            flexDirection: 'row',
            paddingHorizontal: 15,
            // paddingVertical: 12,
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
          // is24hourSource="device"
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
            // paddingVertical: 12,
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
            // paddingVertical: 12,
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
                {
                  /* console.log('index.length', coordinate); */
                }
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
