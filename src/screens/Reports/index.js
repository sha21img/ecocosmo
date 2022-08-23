import React, {useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
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
import axios from 'axios';
import moment from 'moment';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

function Reports(props) {
  const [vehicleNumber, setVehicleNumber] = useState('Select vehicle number');
  const [totalOdo, setTotalOdo] = useState();
  const [sumIgnitionOn, setSumIgnitionOn] = useState();
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
  const [imei, setImei] = useState(null);
  const [mapHistory, setMapHistory] = useState([]);

  const [isActive, setIsActive] = useState('');
  const [addres, setAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [data2, setData2] = useState([]);

  const [summaryReport, setSummaryReport] = useState([]);
  // const d = ['odometer', 'ignition', 'vehicle', 'drive', 'idle', 'daily']
  const setDate = () => {
    var d = new Date();
    const startDate = moment(d).format('YYYY-MM-DD');
    const startTime = moment(d).format('hh-mm-ss');
    // console.log('startTimestartTimestartTimestartTime', startTime);
    setFtime(startTime);
    // console.log('startDate', startDate);
    setFdate(startDate);
    // console.log(d.toLocaleDateString());
    d.setMonth(d.getMonth() - 1);
    // console.log('11111111111111111111111111111111111', d);
    const endTime = moment(d).format('hh-mm-ss');
    setFtimeend(endTime);
    console.log('endTimeendTimeendTime', endTime);
    const aa = moment(d).format('YYYY-MM-DD');
    setFdateend(aa);
    // console.log('endDate', aa);
  };
  useEffect(() => {
    setDate();
  }, []);

  const getSummaryReport = async () => {
    const success = await Storage.getLoginDetail('login_detail');
    let username = success.accountId;
    let encodedPassWord = success.password;
    // console.log('aaa', success);
    const data = {
      accountid: username,
      password: encodedPassWord,
      imei: imei || '353701092279609',
      startdate: '2022-06-08 20:41:32',
      enddate: '2022-08-10 20:42:31',

      // startdate: `${fdate}{" "}${ftime}`,
      // enddate: `${fdateend}{" "}${ftimeend}`,
    };
    const response = await axiosGetData('getDriveDetails', data);
    const summarReport = response.data.Drives.forEach(item => {
      // console.log('item', item);

      getAddress(item.startPoint, username, encodedPassWord);
    });
    // console.log('response.data.Drives', response.data.Drives);
    setSummaryReport(response.data.Drives);
    return response.data.Drives;
  };
  // startPoint":"19.268671,72.869516",
  var filterAddress = [];
  const getAddress = async (address, username, password) => {
    const newAddress = address.split(',').join('/');
    const response =
      // await axiosGetData(`getAddress`,data);
      await axios.get(
        `http://54.169.20.116/react_v1_ec_apps/api/v3/getAddress/${username}/${password}/${newAddress}`,
      );
    filterAddress.push(response.data);
    setData2(filterAddress);
    //  console.log("aafilterAddressa",filterAddress)
    // setAddress([...addres, response.data]);

    // console.log('pl,pl,pl,pl', response.data);
  };
  useEffect(() => {
    // if (fdate !== '' && fdateend !== '') {
    //   data1();
    // }
    console.log('uusususuususuusuu');
    if (fdate !== '' && fdateend !== '') {
      console.log('proprorprprorp');
      Promise.all([data1(), getSummaryReport()])
        .then(values => {
          if (values) {
            console.log("values",values)
            setLoading(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [fdate, fdateend]);

  // console.log('filterAddress', filterAddress);
  const data1 = async () => {
    // console.log('chal rha h /////////');
    // console.log('fffffff1f1f2f3f3f', fdate);
    // console.log('poirrtyuiop', fdateend);
    const succcess = await Storage.getLoginDetail('login_detail');
    const vehicleNum = await Storage.getVehicleDetail('vehicle_detail');
    // console.log('vehicleNumvehicleNum', vehicleNum);
    const filterVehicleNumber = vehicleNum.map((item, index) => {
      return {key: index++, label: item.deviceId};
    });
    // console.log('filterVehicleNumberfilterVehicleNumber', filterVehicleNumber);
    setNewVehicleNumber(filterVehicleNumber);
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    const data = {
      accountid: username,
      password: encodedPassWord,
      imei: imei || '459710040353691',
      startdate: '2016-11-01',
      enddate: '2016-11-22',
      // startdate: fdate.toString(),
      // enddate: fdateend.toString(),
      type: 'odo',
    };
    const response = await axiosGetData('reportHistory', data);
    const aa = response.data.DeviceHistory.reverse();
    // console.log('098765432345678987654345678', aa);
    setMapHistory(aa);
    return aa;
  };

  let index = 0;
  function formatDate(date) {
    var d = new Date(date);
    console.log('oiuytrewqweiopoiuytrew', d);
    (month = '' + (d.getMonth() + 1)),
      (day = '' + d.getDate()),
      (year = d.getFullYear());
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
    // console.log('includedArray', includedArray[0]);
    setImei(includedArray[0]);
  };

  const getTime = secs => {
    var minutes = Math.floor(secs / 60);
    secs = secs % 60;
    var hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    let time = `${hours.toString().length == 1 ? '0' + hours : hours}:${
      minutes.toString().length == 1 ? '0' + minutes : minutes
    }:${secs.toString().length == 1 ? '0' + secs : secs}`;
    return time;
  };
  const getNewDate = data => {
    const d = moment(data, 'Do MMM YYYY').toDate();
    const newDate = moment(d).format('YYYY-MM-DD');
    return newDate;
  };


  const createPDF = async()=> {
    let options = {
      html: '<h1>PDF TEST</h1>',
      fileName: 'test',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options)
    // console.log(file.filePath);
    alert(file.filePath);
  }
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
            <View style={styles.alertContainer}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('GraphicalReports')}>
                <Image source={image.graph} style={{height: 35, width: 35}} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={image.search} style={styles.searchIcon} />
              </TouchableOpacity>
            </View>
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
                  // setVehicleNumber(option.label);
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

            {/* <TouchableOpacity style={{width: '35%'}}>
              <LinearGradient
                colors={['#00D957', '#2ACBA1', '#5EB9FF']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  paddingVertical: 12,
                  // width: '35%',
                  borderRadius: 7,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 14, color: 'white'}}>Yesterday</Text>
                <MaterialIcons
                  style={{
                    color: '#3D3D3D',
                    fontSize: 16,
                  }}
                  name={'keyboard-arrow-down'}
                />
              </LinearGradient>
            </TouchableOpacity> */}
          </View>
        </LinearGradient>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            paddingVertical: 10,
            padding: 0,
            backgroundColor: colors.white,
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
        )}
      </View>

      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        {loading ? (
          <>
            <LinearGradient
              colors={['#BCE2FF', '#ffffff']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={{
                padding: 20,
                elevation: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {__('Odometer Total km')}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    minWidth: '20%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.mainThemeColor1,
                      borderRadius: 50,
                    }}
                    onPress={() => {
                      setIsActive('odometer');
                    }}>
                    <MaterialIcons
                      style={{
                        color: colors.white,
                        fontSize: 25,
                      }}
                      name={'keyboard-arrow-down'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={createPDF}>
                    <Image
                      source={image.shareDark}
                      style={{width: 24, height: 24}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={{flexDirection: 'row', paddingTop: 10}}>
                <View style={{paddingRight: 20}}>
                  <Text>Vehicle No.</Text>

                  {isActive === 'odometer' ? (
                    newVehicleNumber?.map(item => {
                      return <Text>{item.label.slice(0, 13)}</Text>;
                    })
                  ) : (
                    <Text>{newVehicleNumber[0]?.label.slice(0, 13)}</Text>
                  )}
                </View>
                <View style={{paddingRight: 20}}>
                  <Text>Date</Text>

                  {isActive == 'odometer' ? (
                    mapHistory.map(item => {
                      return (
                        <Text>
                          {item.timeStamp1
                            ? getNewDate(item.timeStamp1)
                            : '00:00:00'}
                        </Text>
                      );
                    })
                  ) : (
                    <Text>
                      {mapHistory[0]?.timeStamp1
                        ? getNewDate(mapHistory[0].timeStamp1)
                        : '00:00:00'}
                    </Text>
                  )}
                </View>
                <View style={{paddingRight: 20}}>
                  <Text>Kms</Text>

                  {isActive === 'odometer' ? (
                    mapHistory.map(item => {
                      return <Text>{item.todaysODO}</Text>;
                    })
                  ) : (
                    <Text>
                      {mapHistory[0]?.todaysODO
                        ? mapHistory[0].todaysODO
                        : '00.00'}
                    </Text>
                  )}
                </View>
              </ScrollView>
            </LinearGradient>

            {/*
             */}

            <LinearGradient
              colors={['#BCE2FF', '#ffffff']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={{padding: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {__('Ignition Location On')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    minWidth: '20%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.mainThemeColor1,
                      borderRadius: 50,
                    }}
                    onPress={() => setIsActive('ignition')}>
                    <MaterialIcons
                      style={{
                        color: colors.white,
                        fontSize: 25,
                      }}
                      name={'keyboard-arrow-down'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={image.shareDark}
                      style={{width: 24, height: 24}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={{flexDirection: 'row', paddingTop: 10}}>
                <View style={{paddingRight: 20}}>
                  <Text>Vehicle No.</Text>
                  {/* <Text>20-07-2022</Text> */}
                  {isActive === 'ignition' ? (
                    newVehicleNumber?.map(item => {
                      return <Text>{item.label.slice(0, 13)}</Text>;
                    })
                  ) : (
                    <Text>{newVehicleNumber[0]?.label.slice(0, 13)}</Text>
                  )}
                </View>
                <View style={{paddingRight: 20}}>
                  <Text>Date</Text>
                  {isActive === 'ignition' ? (
                    mapHistory.map(item => {
                      return <Text>{getNewDate(item.timeStamp1)}</Text>;
                    })
                  ) : (
                    <Text>
                      {mapHistory[0]?.timeStamp1
                        ? getNewDate(mapHistory[0]?.timeStamp1)
                        : '0000-00-00'}
                    </Text>
                  )}
                </View>
                <View style={{paddingRight: 20}}>
                  <Text>Ignition on</Text>
                  {isActive === 'ignition' ? (
                    mapHistory.map(item => {
                      return (
                        <Text>
                          {item.todaysIgnitionOnTimeSeconds
                            ? getTime(item.todaysIgnitionOnTimeSeconds)
                            : '00:00:00'}
                        </Text>
                      );
                    })
                  ) : (
                    <Text>
                      {mapHistory[0]?.todaysIgnitionOnTimeSeconds
                        ? getTime(mapHistory[0]?.todaysIgnitionOnTimeSeconds)
                        : '00:00:00'}
                    </Text>
                  )}
                </View>
                <View style={{paddingRight: 20}}>
                  <Text>Ignition off</Text>
                  {isActive === 'ignition' ? (
                    mapHistory.map(item => {
                      return (
                        <Text>
                          {item.todaysIdleTimeSeconds
                            ? getTime(item.todaysIdleTimeSeconds)
                            : '00:00:00'}
                        </Text>
                      );
                    })
                  ) : (
                    <Text>
                      {mapHistory[0]?.todaysIdleTimeSeconds
                        ? getTime(mapHistory[0]?.todaysIdleTimeSeconds)
                        : '00:00:00'}
                    </Text>
                  )}
                </View>
              </ScrollView>
            </LinearGradient>

            {/*
             */}
            {data2.length > 0 ? (
              <LinearGradient
                colors={['#BCE2FF', '#ffffff']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={{padding: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    {__('Vehicle Summary')}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      minWidth: '20%',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.mainThemeColor1,
                        borderRadius: 50,
                      }}
                      onPress={() => setIsActive('vehicle')}>
                      <MaterialIcons
                        style={{
                          color: colors.white,
                          fontSize: 25,
                        }}
                        name={'keyboard-arrow-down'}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image
                        source={image.shareDark}
                        style={{width: 24, height: 24}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  style={{flexDirection: 'row', paddingTop: 10}}>
                  <View style={{paddingRight: 20}}>
                    <Text>Vehicle No.</Text>

                    {isActive === 'vehicle' ? (
                      newVehicleNumber?.map(item => {
                        return <Text>{item.label.slice(0, 13)}</Text>;
                      })
                    ) : (
                      <Text>{newVehicleNumber[0]?.label.slice(0, 13)}</Text>
                    )}
                  </View>
                  <View style={{paddingRight: 20}}>
                    <Text>Start Location</Text>
                    {/* <Text>{sumIgnitionOn}</Text> */}
                    {isActive === 'vehicle' ? (
                      mapHistory?.map(item => {
                        {
                          /* console.log('aaassshihihishishishi', item); */
                        }
                        return <Text>{item?.startLocation}</Text>;
                      })
                    ) : (
                      <Text>{mapHistory[0]?.startLocation}</Text>
                    )}
                  </View>
                  <View style={{paddingRight: 20}}>
                    <Text>Start Time</Text>
                    {isActive === 'vehicle' ? (
                      mapHistory?.map(item => {
                        {
                          /* console.log("item.endTime",item) */
                        }
                        return <Text>{item?.startTime}</Text>;
                      })
                    ) : (
                      <Text>{mapHistory[0]?.startTime}</Text>
                    )}
                    {/* <Text>{sumIgnitionOn}</Text> */}
                  </View>
                  <View style={{paddingRight: 20}}>
                    <Text>Travel Time</Text>
                    {isActive === 'vehicle' ? (
                      mapHistory?.map(item => {
                        {
                          /* console.log("item.endTime",item) */
                        }
                        return <Text>{item?.travelTime}</Text>;
                      })
                    ) : (
                      <Text>{mapHistory[0]?.travelTime}</Text>
                    )}
                    {/* <Text>{sumIgnitionOn}</Text> */}
                  </View>
                  <View style={{paddingRight: 20}}>
                    <Text>Work/Idle hrs</Text>
                    {isActive === 'daily' ? (
                      mapHistory?.map(item => {
                        return (
                          <Text>
                            {item.todaysWaitingIgnitionTime
                              ? getTime(item.todaysWaitingIgnitionTime)
                              : '00:00:00'}
                          </Text>
                        );
                      })
                    ) : (
                      <Text>
                        {mapHistory[0]?.todaysWaitingIgnitionTime
                          ? getTime(mapHistory[0]?.todaysWaitingIgnitionTime)
                          : '00:00:00'}
                      </Text>
                    )}
                    {/* <Text>{sumIgnitionOn}</Text> */}
                  </View>

                  {/*  */}
                  <View style={{paddingRight: 20}}>
                    <Text>Work/Idle hrs</Text>
                    {isActive === 'daily' ? (
                      mapHistory?.map(item => {
                        return (
                          <Text>
                            {item.todaysWaitingIgnitionTime
                              ? getTime(item.todaysWaitingIgnitionTime)
                              : '00:00:00'}
                          </Text>
                        );
                      })
                    ) : (
                      <Text>
                        {mapHistory[0]?.todaysWaitingIgnitionTime
                          ? getTime(mapHistory[0]?.todaysWaitingIgnitionTime)
                          : '00:00:00'}
                      </Text>
                    )}
                    {/* <Text>{sumIgnitionOn}</Text> */}
                  </View>
                  {/*  */}
                  <View style={{paddingRight: 20}}>
                    <Text>Stopped Time</Text>
                    {isActive === 'daily' ? (
                      mapHistory?.map(item => {
                        return (
                          <Text>
                            {item.todaysIdleTimeSeconds
                              ? getTime(item.todaysIdleTimeSeconds)
                              : '00:00:00'}
                          </Text>
                        );
                      })
                    ) : (
                      <Text>
                        {mapHistory[0]?.todaysIdleTimeSeconds
                          ? getTime(mapHistory[0]?.todaysIdleTimeSeconds)
                          : '00:00:00'}
                      </Text>
                    )}
                    {/* <Text>{sumIgnitionOn}</Text> */}
                  </View>
                  {/*  */}

                  <View style={{paddingRight: 20}}>
                    <Text>Max Speed(Km/h)</Text>
                    {isActive === 'daily' ? (
                      mapHistory?.map(item => {
                        return (
                          <Text>
                            {item.todaysMaxSpeed
                              ? getTime(item.todaysMaxSpeed)
                              : '00:00:00'}
                          </Text>
                        );
                      })
                    ) : (
                      <Text>
                        {mapHistory[0]?.todaysMaxSpeed
                          ? getTime(mapHistory[0]?.todaysMaxSpeed)
                          : '00:00:00'}
                      </Text>
                    )}
                    {/* <Text>{sumIgnitionOn}</Text> */}
                  </View>
                  {/*  */}
                  <View style={{paddingRight: 20}}>
                    <Text>Avg Speed(Km/h)</Text>
                    {isActive === 'daily' ? (
                      mapHistory?.map(item => {
                        return (
                          <Text>
                            {item.avgSpeed
                              ? getTime(item.avgSpeed)
                              : '00:00:00'}
                          </Text>
                        );
                      })
                    ) : (
                      <Text>
                        {mapHistory[0]?.avgSpeed
                          ? getTime(mapHistory[0]?.avgSpeed)
                          : '00:00:00'}
                      </Text>
                    )}
                    {/* <Text>{sumIgnitionOn}</Text> */}
                  </View>
                  {/*  */}
                  <View style={{paddingRight: 20}}>
                    <Text>Engine Hours</Text>
                    {isActive === 'vehicle' ? (
                      mapHistory.map(item => {
                        return (
                          <Text>
                            {item.todaysIgnitionOnTimeSeconds
                              ? getTime(item.todaysIgnitionOnTimeSeconds)
                              : '00:00:00'}
                          </Text>
                        );
                      })
                    ) : (
                      <Text>
                        {mapHistory[0]?.todaysIgnitionOnTimeSeconds
                          ? getTime(mapHistory[0]?.todaysIgnitionOnTimeSeconds)
                          : '00:00:00'}
                      </Text>
                    )}
                  </View>
                  {/*  */}

                  <View style={{paddingRight: 20}}>
                    <Text>Distance Travelled(kms)</Text>
                    {isActive === 'vehicle' ? (
                      mapHistory.map(item => {
                        return <Text>{item.todaysODO}</Text>;
                      })
                    ) : (
                      <Text>
                        {mapHistory[0]?.todaysODO
                          ? mapHistory[0].todaysODO
                          : '00.00'}
                      </Text>
                    )}
                  </View>
                  {/*  */}
                  <View style={{paddingRight: 20}}>
                    <Text>End Location</Text>
                    {/* <Text>{sumIgnitionOn}</Text> */}
                    {isActive === 'vehicle' ? (
                      mapHistory?.map(item => {
                        {
                          /* console.log('aaassshihihishishishi', item); */
                        }
                        return <Text>{item?.endLocation}</Text>;
                      })
                    ) : (
                      <Text>{mapHistory[0]?.endLocation}</Text>
                    )}
                  </View>
                  {/*  */}
                  <View style={{paddingRight: 20}}>
                    <Text>End Time (HH:MM)</Text>
                    {/* <Text>{sumIgnitionOn}</Text> */}
                    {isActive === 'vehicle' ? (
                      mapHistory?.map(item => {
                        {
                          /* console.log('aaassshihihishishishi', item); */
                        }
                        return <Text>{item?.endTime}</Text>;
                      })
                    ) : (
                      <Text>{mapHistory[0]?.endTime}</Text>
                    )}
                  </View>
                  {/*  */}
                  <View style={{paddingRight: 20}}>
                    <Text>#OverSpeed</Text>
                    {/* <Text>{sumIgnitionOn}</Text> */}
                    {isActive === 'vehicle' ? (
                      mapHistory?.map(item => {
                        {
                          /* console.log('aaassshihihishishishi', item); */
                        }
                        return <Text>{item?.overspeedCounter}</Text>;
                      })
                    ) : (
                      <Text>{mapHistory[0]?.overspeedCounter}</Text>
                    )}
                  </View>
                  {/*  */}
                  <View style={{paddingRight: 20}}>
                    <Text>#Alerts</Text>
                    {/* <Text>{sumIgnitionOn}</Text> */}
                    {isActive === 'vehicle' ? (
                      mapHistory?.map(item => {
                        {
                          /* console.log('aaassshihihishishishi', item); */
                        }
                        return <Text>{item?.alertsCounter}</Text>;
                      })
                    ) : (
                      <Text>{mapHistory[0]?.alertsCounter}</Text>
                    )}
                  </View>
                  {/*  */}
                  <View style={{paddingRight: 20}}>
                    <Text>Report Date</Text>
                    {/* <Text>{sumIgnitionOn}</Text> */}
                    {isActive === 'vehicle' ? (
                      mapHistory?.map(item => {
                        {
                          /* console.log('aaassshihihishishishi', item); */
                        }
                        return <Text>{item?.timeStamp1}</Text>;
                      })
                    ) : (
                      <Text>{mapHistory[0]?.timeStamp1}</Text>
                    )}
                  </View>
                </ScrollView>
              </LinearGradient>
            ) : null}

            {/*
             */}

            {data2.length > 0 ? (
              <LinearGradient
                colors={['#BCE2FF', '#ffffff']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={{padding: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    {__('Drive Summary Report')}
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.mainThemeColor1,
                      borderRadius: 50,
                    }}
                    onPress={() => setIsActive('drive')}>
                    <MaterialIcons
                      style={{
                        color: colors.white,
                        fontSize: 25,
                      }}
                      name={'keyboard-arrow-down'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={image.shareDark}
                      style={{width: 24, height: 24}}
                    />
                  </TouchableOpacity>
                </View>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  style={{flexDirection: 'row', paddingTop: 10}}>
                  {/* <View style={{paddingRight: 20}}>
              <Text>Drive No.</Text>
              <Text>MH12 RN 0790</Text>
            </View> */}
                  <View style={{paddingRight: 20}}>
                    <Text>Vehicle No.</Text>

                    {isActive === 'drive' ? (
                      newVehicleNumber?.map(item => {
                        return <Text>{item.label.slice(0, 13)}</Text>;
                      })
                    ) : (
                      <Text>{newVehicleNumber[0]?.label.slice(0, 13)}</Text>
                    )}
                  </View>
                  <View
                    style={{
                      paddingRight: 20,
                    }}>
                    <Text>Start Location</Text>
                    {isActive === 'drive' ? (
                      data2?.map(item => {
                        {
                          /* console.log('aaassshihihishishishi', item); */
                        }
                        return <Text>{item?.vehicleAddress}</Text>;
                      })
                    ) : (
                      <Text>{data2[0]?.vehicleAddress}</Text>
                    )}
                    {/* <Text>{sumIgnitionOn}</Text> */}
                  </View>
                  <View style={{paddingRight: 20}}>
                    <Text>End Time</Text>
                    {isActive === 'drive' ? (
                      summaryReport?.map(item => {
                        {
                          /* console.log("item.endTime",item) */
                        }
                        return <Text>{item['endTime:']}</Text>;
                      })
                    ) : (
                      <Text>{summaryReport[0]['endTime:']}</Text>
                    )}
                    {/* <Text>{sumIgnitionOn}</Text> */}
                  </View>
                  <View style={{paddingRight: 20}}>
                    <Text>Duration</Text>
                    {isActive === 'drive' ? (
                      summaryReport?.map(item => {
                        {
                          /* console.log("item.endTime",item) */
                        }
                        return <Text>{item.duration}</Text>;
                      })
                    ) : (
                      <Text>{summaryReport[0]?.duration}</Text>
                    )}
                    {/* <Text>{sumIgnitionOn}</Text> */}
                  </View>
                  <View style={{paddingRight: 20}}>
                    <Text>Work/Idle hrs</Text>
                    {isActive === 'drive' ? (
                      summaryReport?.map(item => {
                        {
                          /* console.log("item.endTime",item) */
                        }
                        return <Text>{item.odo}</Text>;
                      })
                    ) : (
                      <Text>{summaryReport[0]?.odo}</Text>
                    )}
                    {/* <Text>{sumIgnitionOn}</Text> */}
                  </View>
                </ScrollView>
              </LinearGradient>
            ) : null}

            {/*
             */}

            <LinearGradient
              colors={['#BCE2FF', '#ffffff']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={{padding: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {__('Idle Report')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    minWidth: '20%',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.mainThemeColor1,
                      borderRadius: 50,
                    }}
                    onPress={() => setIsActive('idle')}>
                    <MaterialIcons
                      style={{
                        color: colors.white,
                        fontSize: 25,
                      }}
                      name={'keyboard-arrow-down'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={image.shareDark}
                      style={{width: 24, height: 24}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={{flexDirection: 'row', paddingTop: 10}}>
                <View style={{paddingRight: 20}}>
                  <Text>Vehicle No.</Text>
                  {/* <Text>20-07-2022</Text> */}
                  {isActive == 'idle' ? (
                    newVehicleNumber?.map(item => {
                      return <Text>{item.label.slice(0, 13)}</Text>;
                    })
                  ) : (
                    <Text>{newVehicleNumber[0]?.label.slice(0, 13)}</Text>
                  )}
                </View>
                <View style={{paddingRight: 20}}>
                  <Text>Date</Text>
                  {/* <Text>{sumIgnitionOn}</Text> */}
                  {isActive == 'idle' ? (
                    mapHistory?.map(item => {
                      return (
                        <Text>
                          {/* {moment(item.timeStamp1.slice(3)).format('YYYY-MM-DD')} */}
                          {getNewDate(item.timeStamp1)}
                        </Text>
                      );
                    })
                  ) : (
                    <Text>
                      {/* {moment(item.timeStamp1.slice(3)).format('YYYY-MM-DD')} */}
                      {getNewDate(mapHistory[0]?.timeStamp1)}
                    </Text>
                  )}
                </View>
                <View style={{paddingRight: 20}}>
                  <Text>Engine Idle Time</Text>
                  {isActive == 'idle' ? (
                    mapHistory?.map(item => {
                      return (
                        <Text>
                          {item.todaysIdleTimeSeconds
                            ? getTime(item.todaysIdleTimeSeconds)
                            : '00:00:00'}
                        </Text>
                      );
                    })
                  ) : (
                    <Text>
                      {mapHistory[0]?.todaysIdleTimeSeconds
                        ? getTime(mapHistory[0]?.todaysIdleTimeSeconds)
                        : '00:00:00'}
                    </Text>
                  )}
                </View>
              </ScrollView>
            </LinearGradient>

            {/*
             */}

            <LinearGradient
              colors={['#BCE2FF', '#ffffff']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={{padding: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {__('Daily Waiting Time Report')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    minWidth: '20%',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.mainThemeColor1,
                      borderRadius: 50,
                    }}
                    onPress={() => setIsActive('daily')}>
                    <MaterialIcons
                      style={{
                        color: colors.white,
                        fontSize: 25,
                      }}
                      name={'keyboard-arrow-down'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={image.shareDark}
                      style={{width: 24, height: 24}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={{flexDirection: 'row', paddingTop: 10}}>
                <View style={{paddingRight: 20}}>
                  <Text>Vehicle No.</Text>
                  {isActive === 'daily' ? (
                    newVehicleNumber?.map(item => {
                      return <Text>{item.label.slice(0, 13)}</Text>;
                    })
                  ) : (
                    <Text>{newVehicleNumber[0]?.label.slice(0, 13)}</Text>
                  )}
                </View>
                <View style={{paddingRight: 20}}>
                  <Text>Date</Text>
                  {isActive === 'daily' ? (
                    mapHistory?.map(item => {
                      return <Text>{item.timeStamp1.slice(4)}</Text>;
                    })
                  ) : (
                    <Text>{mapHistory[0]?.timeStamp1.slice(4)}</Text>
                  )}
                </View>
                <View style={{paddingRight: 20}}>
                  <Text>Waiting Time</Text>
                  {isActive === 'daily' ? (
                    mapHistory?.map(item => {
                      return (
                        <Text>
                          {item.todaysWaitingIgnitionTime
                            ? getTime(item.todaysWaitingIgnitionTime)
                            : '00:00:00'}
                        </Text>
                      );
                    })
                  ) : (
                    <Text>
                      {mapHistory[0]?.todaysWaitingIgnitionTime
                        ? getTime(mapHistory[0]?.todaysWaitingIgnitionTime)
                        : '00:00:00'}
                    </Text>
                  )}
                </View>
              </ScrollView>
            </LinearGradient>
          </>
        ) : (
          <ActivityIndicator color={colors.black} />
        )}
      </ScrollView>
    </>
  );
}

export default Reports;
