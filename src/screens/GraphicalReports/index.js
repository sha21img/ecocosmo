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
import {
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryAxis,
} from 'victory-native';
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
  const [outOfCoverage, setOutOfCoverage] = useState([]);
  const [todayWaitingIgniTime, setTodayWaitingIgniTime] = useState([]);
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
    console.log(
      'response?.data?.DeviceHistory',
      response?.data?.DeviceHistory.slice(0, 10),
    );
    const TodaysODO = response?.data?.DeviceHistory?.map((item, index) => {
      // const i = moment(item.timeStamp1).format('DD');
      var d = moment(item.timeStamp1, 'Do MMM YYYY').toDate();
      var a = moment(d).format('DD');
      console.log('aaaaaa', item);
      return {x: a, y: item.todaysODO, z: item.timeStamp1};
    });
    setTodayOdo(TodaysODO);
    console.log('TodaysODO', TodaysODO);

    const TodayIgniOn = response?.data?.DeviceHistory?.map((item, index) => {
      var d = moment(item.timeStamp1, 'Do MMM YYYY').toDate();
      var a = moment(d).format('DD');
      // console.log('aaaaaa', a);
      return {
        x: a,
        y: getTime(item.todaysIgnitionOnTimeSeconds),
        z: item.timeStamp1,
      };
    });
    setTodayIgniOn(TodayIgniOn);

    const OutofCoverage = response?.data?.DeviceHistory?.map((item, index) => {
      var d = moment(item.timeStamp1, 'Do MMM YYYY').toDate();
      var a = moment(d).format('DD');
      // console.log('aaaaaa', a);
      return {
        x: a,
        y: getTime(item.todaysOutOfCoverage),
        z: item.timeStamp1,
      };
    });
    setOutOfCoverage(OutofCoverage);

    const TodayWaitIgniTime = response?.data?.DeviceHistory?.map(
      (item, index) => {
        // console.log('TodayWaitIgniTime+_+_+_+_=-=-=-=-', item);
        var d = moment(item.timeStamp1, 'Do MMM YYYY').toDate();
        var a = moment(d).format('DD');
        console.log('aaaaaa', a);
        return {
          x: a,
          y: getTime(item.todaysWaitingIgnitionTime),
          z: item.timeStamp1,
        };
      },
    );
    0;
    setTodayWaitingIgniTime(TodayWaitIgniTime);
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
                props.navigation.navigate('Reports', {
                  details: {imei: imei, deviceId: vehicleNumber},
                })
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1, backgroundColor: 'white'}}>
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
                    // minDomain={{x:2}}
                    width={400}
                    // padding={{top: 100, bottom: 90, left: 70, right: 80}}
                    height={550}
                    domainPadding={{x: 10}}>
                    <VictoryBar
                      style={{
                        data: {fill: '#5EB9FF'},
                      }}
                      // fixoverlap={true}
                      alignment="end"
                      data={todayOdo}
                      barRatio={1}
                      labels={({datum}) => {
                        return datum.x === Sel.x && datum.y === Sel.y
                          ? `${datum.y} KM\n${datum.z}`
                          : '';
                      }}
                      labelComponent={
                        <VictoryLabel
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            fill: 'black',
                          }}
                          dy={-10}
                          dx={0}
                        />
                      }
                      events={[
                        {
                          eventHandlers: {
                            onPress: item => {
                              return [
                                {
                                  target: 'data',
                                  mutation: props => {
                                    console.log(
                                      'props.datum',
                                      props.datum,
                                      'props.datum',
                                    );
                                    if (Sel.x == props.datum.x) {
                                      setSel({y: ''});
                                    } else {
                                      setSel(props.datum);
                                    }

                                    // const fill =
                                    //   props.style && props.style.fill;
                                    // if (fill === 'red') {
                                    //   return {
                                    //     style: {
                                    //       fill: '#5EB9FF',
                                    //       padding: 8,
                                    //       strokeWidth: 0,
                                    //     },
                                    //   };
                                    // } else {
                                    //   return {
                                    //     style: {
                                    //       fill: 'red',
                                    //       padding: 8,
                                    //       strokeWidth: 0,
                                    //     },
                                    //   };
                                    // }
                                  },
                                },
                              ];
                            },
                          },
                        },
                      ]}
                    />
                    <VictoryAxis
                      dependentAxis
                      axisLabelComponent={<VictoryLabel dx={20} />}
                    />
                    <VictoryAxis
                      scale="time"
                      tickFormat={t => `${t}`}
                      fixLabelOverlap
                      style={{tickLabels: {padding: 3, fontSize: 7}}}
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
                    height={550}
                    domainPadding={{x: 10}}>
                    <VictoryBar
                      style={{
                        data: {fill: '#5EB9FF'},
                      }}
                      alignment="end"
                      data={todayIgniOn}
                      barRatio={1}
                      labels={({datum}) => {
                        return datum.x === Sel.x && datum.y === Sel.y
                          ? `${datum.y} Hrs\n${datum.z}`
                          : '';
                      }}
                      labelComponent={
                        <VictoryLabel
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            fill: 'black',
                          }}
                          dy={-10}
                          dx={0}
                        />
                      }
                      events={[
                        {
                          eventHandlers: {
                            onPress: item => {
                              return [
                                {
                                  target: 'data',
                                  mutation: props => {
                                    if (Sel.x == props.datum.x) {
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
                    <VictoryAxis
                      dependentAxis
                      axisLabelComponent={<VictoryLabel dx={20} />}
                    />
                    <VictoryAxis
                      scale="time"
                      tickFormat={t => `${t}`}
                      fixLabelOverlap
                      style={{tickLabels: {padding: 3, fontSize: 7}}}
                    />
                  </VictoryChart>
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
                  Out Of Coverage
                </Text>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <VictoryChart
                    key={Math.random()}
                    width={370}
                    height={550}
                    domainPadding={{x: 10}}>
                    <VictoryBar
                      style={{
                        data: {fill: '#5EB9FF'},
                      }}
                      alignment="end"
                      data={outOfCoverage}
                      barRatio={1}
                      labels={({datum}) => {
                        return datum.x === Sel.x && datum.y === Sel.y
                          ? `${datum.y} Hrs\n${datum.z}`
                          : '';
                      }}
                      labelComponent={
                        <VictoryLabel
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            fill: 'black',
                          }}
                          dy={-10}
                          dx={0}
                        />
                      }
                      events={[
                        {
                          eventHandlers: {
                            onPress: item => {
                              return [
                                {
                                  target: 'data',
                                  mutation: props => {
                                    if (Sel.x == props.datum.x) {
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
                    <VictoryAxis
                      dependentAxis
                      axisLabelComponent={<VictoryLabel dx={20} />}
                    />
                    <VictoryAxis
                      scale="time"
                      tickFormat={t => `${t}`}
                      fixLabelOverlap
                      style={{tickLabels: {padding: 3, fontSize: 7}}}
                    />
                  </VictoryChart>
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
                  Daily Waiting
                </Text>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <VictoryChart
                    key={Math.random()}
                    width={370}
                    height={550}
                    domainPadding={{x: 10}}>
                    <VictoryBar
                      style={{
                        data: {fill: '#5EB9FF'},
                      }}
                      alignment="end"
                      data={todayWaitingIgniTime}
                      barRatio={1}
                      labels={({datum}) => {
                        return datum.x === Sel.x && datum.y === Sel.y
                          ? `${datum.y} Hrs\n${datum.z}`
                          : '';
                      }}
                      labelComponent={
                        <VictoryLabel
                          dy={-10}
                          dx={0}
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            fill: 'black',
                          }}
                        />
                      }
                      events={[
                        {
                          eventHandlers: {
                            onPress: item => {
                              return [
                                {
                                  target: 'data',
                                  mutation: props => {
                                    if (Sel.x == props.datum.x) {
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
                    <VictoryAxis
                      dependentAxis
                      axisLabelComponent={<VictoryLabel dx={20} />}
                    />
                    <VictoryAxis
                      scale="time"
                      tickFormat={t => `${t}`}
                      fixLabelOverlap
                      style={{tickLabels: {padding: 3, fontSize: 7}}}
                    />
                  </VictoryChart>
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
