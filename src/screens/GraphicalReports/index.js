import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {image} from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import {__} from '../../../Utils/Translation/translation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalSelector from 'react-native-modal-selector';
import {color} from 'react-native-reanimated';
import colors from '../../../assets/Colors';
import Moment from 'moment';
import {Size} from '../../../assets/fonts/Fonts';
import Storage from '../../../Utils/Storage';
import {axiosGetData} from '../../../Utils/ApiController';
import DatePicker from 'react-native-date-picker';
import {VictoryBar, VictoryChart} from 'victory-native';
import moment from 'moment';

function GraphicalReports(props) {
  const [vehicleNumber, setVehicleNumber] = useState('Select vehicle number');
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
  const [newVehicleNumber, setNewVehicleNumber] = useState([]);
  const [imei, setImei] = useState();
  const [mapHistory, setMapHistory] = useState([]);
  const [toggle, setToggle] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isActive2, setIsActive2] = useState({
    odometer: 0,
    ignition: 0,
    coverage: 0,
    waiting: 0,
  });
  const setDate = () => {
    var d = new Date();
    const startDate = moment(d).format('YYYY-MM-DD');

    setFdateend(startDate);
    d.setMonth(d.getMonth() - 1);
    const aa = moment(d).format('YYYY-MM-DD');
    setFdate(aa);
  };
  const setVehicleDetail = async () => {
    if (imei != undefined) {
      setIsSelected(true);
    }
    const vehicleNum = await Storage.getVehicleDetail('vehicle_detail');
    const filterVehicleNumber = vehicleNum.map((item, index) => {
      return {key: index++, label: item.deviceId};
    });
    setNewVehicleNumber(filterVehicleNumber);
  };
  useEffect(() => {
    setDate();
    setVehicleDetail();
  }, []);
  useEffect(() => {
    if (fdate !== '' && fdateend !== '' && imei !== undefined) {
      data1();
    }
    // if (fdate !== '' && fdateend !== '') {
    //   Promise.all([promise1, promise2, promise3])
    // }
  }, [fdate, fdateend, imei]);

  const data1 = async () => {
    const succcess = await Storage.getLoginDetail('login_detail');
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    console.log(imei, 'imei02340=2-4=2-4=234');
    const data = {
      accountid: username,
      password: encodedPassWord,
      imei: imei,
      // imei: "459710040353691",
      startdate: '2016-11-01',
      enddate: '2016-11-22',
      // startdate: fdate.toString(),
      // enddate: fdateend.toString(),
      type: 'odo',
    };
    const response = await axiosGetData('reportHistory', data);
    const aa = response.data.DeviceHistory.reverse();
    if (aa) {
      setLoading(true);
    }
    console.log(response.data.DeviceHistory, 'asdhjhhaa a a a a a');
    setMapHistory(aa);
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
    setFtime(fTimeStart);
  };
  const onChangeEnd = selectedDate => {
    const currentDate = selectedDate || dateEnd;
    setShow(Platform.OS === 'ios');
    setDateEnd(currentDate);
    let fDateEnd = new Date(currentDate);

    setFdateend(formatDate(fDateEnd.toString()));
    let fTimeEnd = fDateEnd.toLocaleTimeString().slice(0, 8);
    setFtimeend(fTimeEnd);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = type => {
    setDtype(type);
    showMode('date');
  };
  const showTimepicker = type => {
    setDtype(type);
    showMode('time');
  };
  const getFilterVehicle = async data => {
    setVehicleNumber(data);
    const vehicleNum = await Storage.getVehicleDetail('vehicle_detail');
    const includedArray = vehicleNum
      .filter(item => {
        return item.deviceId == data;
      })
      .map(item => item.imei);
    setImei(includedArray[0]);
    setIsSelected(true);
  };

  const getTime = secs => {
    console.log(secs, 'this is seconds');
    var minutes = Math.floor(secs / 60);
    // secs = secs % 60;
    var hours = Math.floor(minutes / 60);
    console.log(hours, 'this is hours');
    // minutes = minutes % 60;
    // let time = `${hours.toString().length == 1 ? '0' + hours : hours}:${
    //   minutes.toString().length == 1 ? '0' + minutes : minutes
    // }:${secs.toString().length == 1 ? '0' + secs : secs}`;
    return hours;
  };
  const getNewDate = data => {
    const d = moment(data, 'Do MMM YYYY').toDate();
    const newDate = moment(d).format('YYYY-MM-DD');
    return newDate;
  };
  return (
    <>
      <View>
        <LinearGradient
          colors={['#16BCD4', '#395DBF']}
          style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.headerDashboard}>
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Image source={image.backArrow} />
              </TouchableOpacity>
              <TextInput
                style={styles.dashboardText}
                editable={false}
                value={__('Distance Reports')}
              />
            </View>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('Reports')}>
              <Image source={image.keep} style={{height: 35, width: 35}} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 15,
              paddingHorizontal: 20,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '100%',
              }}>
              <ModalSelector
                initValue="Select tickets"
                accessible={true}
                data={newVehicleNumber}
                scrollViewAccessibilityLabel={'Scrollable options'}
                onChange={option => {
                  getFilterVehicle(option.label);
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.white,
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                    borderRadius: 7,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TextInput
                    style={{
                      color: colors.black,
                      fontSize: Size.medium,
                    }}
                    editable={false}
                    value={vehicleNumber}
                  />
                  <MaterialIcons
                    style={{
                      color: '#3D3D3D',
                      fontSize: 16,
                    }}
                    name={'keyboard-arrow-down'}
                  />
                </TouchableOpacity>
              </ModalSelector>
            </View>
          </View>
        </LinearGradient>
        {/* <View
          style={{
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            paddingVertical: 10,
            padding: 0,
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
              height: 50,
              borderRadius: 7,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput
              editable={false}
              placeholder={'From Date'}
              style={{fontSize: 14}}
              value={fdate}
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
              showDatepicker('end'), setOpen(true);
            }}
            style={{
              borderColor: '#D9D9D9',
              borderWidth: 1,
              flexDirection: 'row',
              paddingHorizontal: 15,
              height: 50,
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
        )} */}
      </View>
      {isSelected ? (
        <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
          {loading ? (
            <>
              {/* 
          Odometer
           */}
              <LinearGradient
                colors={['#BCE2FF', '#FFFFFF']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  elevation: 20,
                }}>
                <View style={{width: '50%', padding: 20}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    Odometer Total km
                  </Text>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity style={{paddingVertical: 10}}>
                      <Image
                        source={image.shareDark}
                        style={{width: 25, height: 25}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.mainThemeColor1,
                        borderRadius: 50,
                        width: 25,
                        height: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        setToggle('odometer');
                        setIsActive2(prev => {
                          return {
                            ...prev,
                            odometer: prev['odometer'] == 0 ? 1 : 0,
                          };
                        });
                      }}>
                      <MaterialIcons
                        style={{
                          color: colors.white,
                          fontSize: 25,
                        }}
                        name={'keyboard-arrow-down'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  {toggle == 'odometer' && isActive2.odometer === 1 ? (
                    mapHistory.map(item => {
                      return (
                        <VictoryChart
                          width={230}
                          height={200}
                          domainPadding={{x: 10}}>
                          <VictoryBar
                            style={{
                              data: {fill: '#5EB9FF'},
                            }}
                            alignment="end"
                            data={[
                              {x: '5', y: 0},
                              {x: '10', y: 0},
                              {x: '15', y: 0},
                              {x: '20', y: 0},
                              {x: '25', y: 0},
                              {x: '30', y: item.todaysODO},
                            ]}
                            animate={{
                              duration: 2000,
                              onLoad: {duration: 1000},
                            }}
                            barRatio={0.7}
                          />
                        </VictoryChart>
                      );
                    })
                  ) : (
                    <VictoryChart
                      width={230}
                      height={200}
                      domainPadding={{x: 10}}>
                      <VictoryBar
                        style={{
                          data: {fill: '#5EB9FF'},
                        }}
                        alignment="end"
                        data={[
                          {x: '5', y: 0},
                          {x: '10', y: 0},
                          {x: '15', y: 0},
                          {x: '20', y: 0},
                          {x: '25', y: 0},
                          {
                            x: '30',
                            y:
                              mapHistory[0]?.todaysODO == undefined
                                ? 0
                                : mapHistory[0]?.todaysODO,
                          },
                        ]}
                        animate={{
                          duration: 2000,
                          onLoad: {duration: 1000},
                        }}
                        barRatio={0.7}
                      />
                    </VictoryChart>
                  )}
                </View>
              </LinearGradient>

              {/* 
          ignition
           */}

              <LinearGradient
                colors={['#BCE2FF', '#FFFFFF']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  elevation: 20,
                }}>
                <View style={{width: '50%', padding: 20}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    Ignition Location On
                  </Text>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity style={{paddingVertical: 10}}>
                      <Image
                        source={image.shareDark}
                        style={{width: 25, height: 25}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.mainThemeColor1,
                        borderRadius: 50,
                        width: 25,
                        height: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        setToggle('ignition'), setOpen(true);
                        setIsActive2(prev => {
                          return {
                            ...prev,
                            ignition: prev['ignition'] == 0 ? 1 : 0,
                          };
                        });
                      }}>
                      <MaterialIcons
                        style={{
                          color: colors.white,
                          fontSize: 25,
                        }}
                        name={'keyboard-arrow-down'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  {toggle == 'ignition' && isActive2.ignition === 1 ? (
                    mapHistory.map(item => {
                      return (
                        <VictoryChart
                          width={230}
                          height={200}
                          domainPadding={{x: 10}}>
                          <VictoryBar
                            style={{
                              data: {fill: '#5EB9FF'},
                            }}
                            alignment="end"
                            data={[
                              {x: '5', y: 0},
                              {x: '10', y: 0},
                              {x: '15', y: 0},
                              {x: '20', y: 0},
                              {x: '25', y: 0},
                              {
                                x: '30',
                                y: getTime(item.todaysIgnitionOnTimeSeconds),
                              },
                            ]}
                            animate={{
                              duration: 2000,
                              onLoad: {duration: 1000},
                            }}
                            barRatio={0.7}
                          />
                        </VictoryChart>
                      );
                    })
                  ) : (
                    <VictoryChart
                      width={230}
                      height={200}
                      domainPadding={{x: 10}}>
                      <VictoryBar
                        style={{
                          data: {fill: '#5EB9FF'},
                        }}
                        alignment="end"
                        data={[
                          {x: '5', y: 0},
                          {x: '10', y: 0},
                          {x: '15', y: 0},
                          {x: '20', y: 0},
                          {x: '25', y: 0},
                          {
                            x: '30',
                            y:
                              mapHistory[0]?.todaysIgnitionOnTimeSeconds ==
                              undefined
                                ? 0
                                : getTime(
                                    mapHistory[0]?.todaysIgnitionOnTimeSeconds,
                                  ),
                          },
                        ]}
                        animate={{
                          duration: 2000,
                          onLoad: {duration: 1000},
                        }}
                        barRatio={0.7}
                      />
                    </VictoryChart>
                  )}
                </View>
              </LinearGradient>

              {/*
        Out Of Coverage
        */}

              <LinearGradient
                colors={['#BCE2FF', '#FFFFFF']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  elevation: 20,
                }}>
                <View style={{width: '50%', padding: 20}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    Out Of Coverage
                  </Text>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity style={{paddingVertical: 10}}>
                      <Image
                        source={image.shareDark}
                        style={{width: 25, height: 25}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.mainThemeColor1,
                        borderRadius: 50,
                        width: 25,
                        height: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        setToggle('coverage'), setOpen(true);
                        setIsActive2(prev => {
                          return {
                            ...prev,
                            coverage: prev['coverage'] == 0 ? 1 : 0,
                          };
                        });
                      }}>
                      <MaterialIcons
                        style={{
                          color: colors.white,
                          fontSize: 25,
                        }}
                        name={'keyboard-arrow-down'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  {toggle == 'coverage' && isActive2.coverage === 1 ? (
                    mapHistory.map(item => {
                      return (
                        <VictoryChart
                          width={230}
                          height={200}
                          domainPadding={{x: 10}}>
                          <VictoryBar
                            style={{
                              data: {fill: '#5EB9FF'},
                            }}
                            alignment="end"
                            data={[
                              {x: '5', y: 0},
                              {x: '10', y: 0},
                              {x: '15', y: 0},
                              {x: '20', y: 0},
                              {x: '25', y: 0},
                              {x: '30', y: getTime(item.todaysOutOfCoverage)},
                            ]}
                            animate={{
                              duration: 2000,
                              onLoad: {duration: 1000},
                            }}
                            barRatio={0.7}
                          />
                        </VictoryChart>
                      );
                    })
                  ) : (
                    <VictoryChart
                      width={230}
                      height={200}
                      domainPadding={{x: 10}}>
                      <VictoryBar
                        style={{
                          data: {fill: '#5EB9FF'},
                        }}
                        alignment="end"
                        data={[
                          {x: '5', y: 0},
                          {x: '10', y: 0},
                          {x: '15', y: 0},
                          {x: '20', y: 0},
                          {x: '25', y: 0},
                          {
                            x: '30',
                            y:
                              mapHistory[0]?.todaysOutOfCoverage == undefined
                                ? 0
                                : getTime(mapHistory[0]?.todaysOutOfCoverage),
                          },
                        ]}
                        animate={{
                          duration: 2000,
                          onLoad: {duration: 1000},
                        }}
                        barRatio={0.7}
                      />
                    </VictoryChart>
                  )}
                </View>
              </LinearGradient>

              {/*
        Daily Waiting
        */}

              <LinearGradient
                colors={['#BCE2FF', '#FFFFFF']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  elevation: 20,
                }}>
                <View style={{width: '50%', padding: 20}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    Daily Waiting
                  </Text>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity style={{paddingVertical: 10}}>
                      <Image
                        source={image.shareDark}
                        style={{width: 25, height: 25}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.mainThemeColor1,
                        borderRadius: 50,
                        width: 25,
                        height: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        setToggle('waiting'), setOpen(true);
                        setIsActive2(prev => {
                          return {
                            ...prev,
                            waiting: prev['waiting'] == 0 ? 1 : 0,
                          };
                        });
                      }}>
                      <MaterialIcons
                        style={{
                          color: colors.white,
                          fontSize: 25,
                        }}
                        name={'keyboard-arrow-down'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  {toggle == 'waiting' && isActive2.waiting === 1 ? (
                    mapHistory.map(item => {
                      return (
                        <VictoryChart
                          width={230}
                          height={200}
                          domainPadding={{x: 10}}>
                          <VictoryBar
                            style={{
                              data: {fill: '#5EB9FF'},
                            }}
                            alignment="end"
                            data={[
                              {x: '5', y: 0},
                              {x: '10', y: 0},
                              {x: '15', y: 0},
                              {x: '20', y: 0},
                              {x: '25', y: 0},
                              {
                                x: '30',
                                y: getTime(item.todaysWaitingIgnitionTime),
                              },
                            ]}
                            animate={{
                              duration: 2000,
                              onLoad: {duration: 1000},
                            }}
                            barRatio={0.7}
                          />
                        </VictoryChart>
                      );
                    })
                  ) : (
                    <VictoryChart
                      width={230}
                      height={200}
                      domainPadding={{x: 10}}>
                      <VictoryBar
                        style={{
                          data: {fill: '#5EB9FF'},
                        }}
                        alignment="end"
                        data={[
                          {x: '5', y: 0},
                          {x: '10', y: 0},
                          {x: '15', y: 0},
                          {x: '20', y: 0},
                          {x: '25', y: 0},
                          {
                            x: '30',
                            y:
                              mapHistory[0]?.todaysWaitingIgnitionTime ==
                              undefined
                                ? 0
                                : getTime(
                                    mapHistory[0]?.todaysWaitingIgnitionTime,
                                  ),
                          },
                        ]}
                        animate={{
                          duration: 2000,
                          onLoad: {duration: 1000},
                        }}
                        barRatio={0.7}
                      />
                    </VictoryChart>
                  )}
                </View>
              </LinearGradient>
            </>
          ) : (
            <ActivityIndicator color={colors.black} />
          )}
        </ScrollView>
      ) : (
        <View
          style={{
            height: '100%',
            backgroundColor: colors.white,
          }}>
          <View
            style={{
              height: '70%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>Please select Vehicle</Text>
          </View>
        </View>
      )}
    </>
  );
}

export default GraphicalReports;
