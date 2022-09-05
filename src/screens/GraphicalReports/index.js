import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {image} from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import {__} from '../../../Utils/Translation/translation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalSelector from 'react-native-modal-selector';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';
import Storage from '../../../Utils/Storage';
import {axiosGetData} from '../../../Utils/ApiController';
import {VictoryBar, VictoryChart, VictoryLabel} from 'victory-native';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';

function GraphicalReports(props) {
  const ime = props?.route?.params?.newImei;
  const im = props?.route?.params?.details?.imei;
  console.log('ime', ime);
  console.log('im', im);
  const filterImei = ime || im;
  const [vehicleNumber, setVehicleNumber] = useState('Select vehicle number');
  const [open, setOpen] = useState(false);
  const [fdate, setFdate] = useState('');
  const [fdateend, setFdateend] = useState('');
  const [newVehicleNumber, setNewVehicleNumber] = useState([]);
  const [imei, setImei] = useState(filterImei);
  const [todayOdo, setTodayOdo] = useState([]);
  const [todayIgniOn, setTodayIgniOn] = useState([]);
  const [toggle, setToggle] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [Sel, setSel] = useState({y: ''});
  const [isActive2, setIsActive2] = useState({
    odometer: 0,
    ignition: 0,
    coverage: 0,
    waiting: 0,
  });
  const focus = useIsFocused();

  useEffect(() => {
    setImei(filterImei);
  }, [focus]);
  const setDate = () => {
    var d = new Date();
    const startDate = moment(d).format('YYYY-MM-DD');

    setFdateend(startDate);
    d.setMonth(d.getMonth() - 1);
    const aa = moment(d).format('YYYY-MM-DD');
    setFdate(aa);
  };
  const setVehicleDetail = async () => {
    const vehicleNum = await Storage.getVehicleDetail('vehicle_detail');
    const filterVehicleNumber = vehicleNum.map((item, index) => {
      return {key: index++, label: item.deviceId};
    });
    console.log('filterVehicleNumber', filterVehicleNumber[0]);
    setNewVehicleNumber(filterVehicleNumber);
    console.log('graphical report imei', imei);
    if (imei != undefined) {
      console.log('fifiififififiifiif');
      setIsSelected(true);
      const includedArray = vehicleNum.find(item => {
        return item.imei == imei;
      });
      console.log('poiuytrew', includedArray);
      setVehicleNumber(includedArray.deviceId);
      setImei(includedArray.imei);
    } else {
      console.log('elselelles');
      getFilterVehicle(filterVehicleNumber[0].label);
    }
  };
  useEffect(() => {
    setDate();
    setVehicleDetail();
  }, [props]);
  useEffect(() => {
    if (fdate !== '' && fdateend !== '' && imei !== undefined) {
      data1();
    }
  }, [fdate, fdateend, imei]);

  const data1 = async () => {
    const succcess = await Storage.getLoginDetail('login_detail');
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    const data = {
      accountid: username,
      password: encodedPassWord,
      imei: imei,
      // imei: "459710040353691",
      // startdate: '2016-11-01',
      // enddate: '2016-11-22',
      startdate: fdate.toString(),
      enddate: fdateend.toString(),
      type: 'odo',
    };
    const response = await axiosGetData('reportHistory', data);
    const aa = response?.data?.DeviceHistory?.reverse();
    if (aa) {
      setLoading(true);
    }
    console.log('this is aa', aa);
    const TodaysODO = response?.data?.DeviceHistory?.map((item, index) => {
      // console.log(item.todaysODO,"item.todaysOdo")
      return {x: index + 1, y: item.todaysODO};
    });
    setTodayOdo(TodaysODO);
    const TodayIgniOn = response?.data?.DeviceHistory?.map((item, index) => {
      // console.log(item.todaysODO,"item.todaysOdo")
      return {x: index + 1, y: item.todaysIgnitionOnTimeSeconds};
    });
    setTodayIgniOn(TodayIgniOn);
  };

  const getFilterVehicle = async data => {
    setLoading(true);
    setVehicleNumber(data);
    const vehicleNum = await Storage.getVehicleDetail('vehicle_detail');
    const includedArray = vehicleNum
      .filter(item => {
        return item.deviceId == data;
      })
      .map(item => item.imei);
    setImei(includedArray[0]);
    setIsSelected(true);
    setLoading(false);
  };

  const getTime = secs => {
    var minutes = Math.floor(secs / 60);
    // secs = secs % 60;
    var hours = Math.floor(minutes / 60);
    // minutes = minutes % 60;
    // let time = `${hours.toString().length == 1 ? '0' + hours : hours}:${
    //   minutes.toString().length == 1 ? '0' + minutes : minutes
    // }:${secs.toString().length == 1 ? '0' + secs : secs}`;
    return hours;
  };

  const refs = React.useRef();

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
              <Text style={styles.dashboardText}>Graphical Reports</Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('Reports', {details: {imei: imei}})
              }>
              <Image
                source={image.keepSmall}
                style={{height: 25, width: 25, marginRight: 5}}
              />
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
                  console.log('option', option);
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
                  // flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  elevation: 20,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    padding: 15,
                    color: 'black',
                  }}>
                  Odometer Total km
                </Text>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <VictoryChart
                    key={Math.random()}
                    width={400}
                    height={400}
                    domainPadding={{x: 10}}>
                    <VictoryBar
                      style={{
                        data: {fill: '#5EB9FF'},
                      }}
                      alignment="end"
                      data={todayOdo}
                      barRatio={1}
                      labels={({datum}) => {
                        return datum.y === Sel.y
                          ? `${datum.y}\n${item.timeStamp1}`
                          : '';
                      }}
                      // labelComponent={<VictoryLabel dy={1} dx={-50} />}
                      // events={[
                      //   {
                      //     eventHandlers: {
                      //       onPress: item => {
                      //         return [
                      //           {
                      //             target: 'data',
                      //             mutation: props => {
                      //               if (Sel.y == props.datum.y) {
                      //                 setSel({y: ''});
                      //               } else {
                      //                 setSel(props.datum);
                      //               }
                      //             },
                      //           },
                      //         ];
                      //       },
                      //     },
                      //   },
                      // ]}
                    />
                  </VictoryChart>
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
                  width: '100%',
                  justifyContent: 'space-between',
                  elevation: 20,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    padding: 15,
                    color: 'black',
                  }}>
                  Ignition Location On
                </Text>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <VictoryChart
                    key={Math.random()}
                    width={400}
                    height={400}
                    domainPadding={{x: 10}}>
                    <VictoryBar
                      style={{
                        data: {fill: '#5EB9FF'},
                      }}
                      alignment="end"
                      data={todayIgniOn}
                      barRatio={1}
                      // labels={({datum}) => {
                      //   return datum.y === Sel.y
                      //     ? `${datum.y}\n${item.timeStamp1}`
                      //     : '';
                      // }}
                      // labelComponent={<VictoryLabel dy={1} dx={-50} />}
                      // events={[
                      //   {
                      //     eventHandlers: {
                      //       onPress: item => {
                      //         return [
                      //           {
                      //             target: 'data',
                      //             mutation: props => {
                      //               console.log(
                      //                 'insideeeeeeeeeeeeeeeeeeee',
                      //                 props.datum,
                      //                 'insideeeeeeeeeeeeeeeeeeee',
                      //               );
                      //               if (Sel.y == props.datum.y) {
                      //                 setSel({y: ''});
                      //               } else {
                      //                 setSel(props.datum);
                      //               }
                      //             },
                      //           },
                      //         ];
                      //       },
                      //     },
                      //   },
                      // ]}
                    />
                  </VictoryChart>
                </View>
              </LinearGradient>

              {/*
        Out Of Coverage
        */}

              {/* <LinearGradient
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
                            barRatio={0.7}
                            labels={({datum}) => {
                              return datum.y === Sel.y
                                ? `${datum.y}\n${item.timeStamp1}`
                                : '';
                            }}
                            labelComponent={<VictoryLabel dy={1} dx={-50} />}
                            events={[
                              {
                                eventHandlers: {
                                  onPress: item => {
                                    return [
                                      {
                                        target: 'data',
                                        mutation: props => {
                                          console.log(
                                            'insideeeeeeeeeeeeeeeeeeee',
                                            props.datum,
                                            'insideeeeeeeeeeeeeeeeeeee',
                                          );
                                          if (Sel.y == props.datum.y) {
                                            setSel({y: ''});
                                          } else {
                                            setSel(props.datum);
                                          }
                                        },
                                      },
                                    ];
                                  },
                                },
                              },
                            ]}
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
                        labels={({datum}) => {
                          return datum.y === Sel.y
                            ? `${datum.y}\n${mapHistory[0]?.timeStamp1}`
                            : '';
                        }}
                        labelComponent={<VictoryLabel dy={1} dx={-50} />}
                        events={[
                          {
                            eventHandlers: {
                              onPress: item => {
                                return [
                                  {
                                    target: 'data',
                                    mutation: props => {
                                      console.log(
                                        'insideeeeeeeeeeeeeeeeeeee',
                                        props.datum,
                                        'insideeeeeeeeeeeeeeeeeeee',
                                      );
                                      if (Sel.y == props.datum.y) {
                                        setSel({y: ''});
                                      } else {
                                        setSel(props.datum);
                                      }
                                    },
                                  },
                                ];
                              },
                            },
                          },
                        ]}
                      />
                    </VictoryChart>
                  )}
                </View>
              </LinearGradient> */}

              {/*
        Daily Waiting
        */}

              {/* <LinearGradient
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
                            barRatio={0.7}
                            labels={({datum}) => {
                              return datum.y === Sel.y
                                ? `${datum.y}\n${item.timeStamp1}`
                                : '';
                            }}
                            labelComponent={<VictoryLabel dy={1} dx={-50} />}
                            events={[
                              {
                                eventHandlers: {
                                  onPress: item => {
                                    return [
                                      {
                                        target: 'data',
                                        mutation: props => {
                                          console.log(
                                            'insideeeeeeeeeeeeeeeeeeee',
                                            props.datum,
                                            'insideeeeeeeeeeeeeeeeeeee',
                                          );
                                          if (Sel.y == props.datum.y) {
                                            setSel({y: ''});
                                          } else {
                                            setSel(props.datum);
                                          }
                                        },
                                      },
                                    ];
                                  },
                                },
                              },
                            ]}
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
                        labels={({datum}) => {
                          return datum.y === Sel.y
                            ? `${datum.y}\n${mapHistory[0]?.timeStamp1}`
                            : '';
                        }}
                        labelComponent={<VictoryLabel dy={1} dx={-50} />}
                        events={[
                          {
                            eventHandlers: {
                              onPress: item => {
                                return [
                                  {
                                    target: 'data',
                                    mutation: props => {
                                      console.log(
                                        'insideeeeeeeeeeeeeeeeeeee',
                                        props.datum,
                                        'insideeeeeeeeeeeeeeeeeeee',
                                      );
                                      if (Sel.y == props.datum.y) {
                                        setSel({y: ''});
                                      } else {
                                        setSel(props.datum);
                                      }
                                    },
                                  },
                                ];
                              },
                            },
                          },
                        ]}
                      />
                    </VictoryChart>
                  )}
                </View>
              </LinearGradient> */}
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
