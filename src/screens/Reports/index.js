import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
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

import moment from 'moment';

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
  const [isActive, setIsActive] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isActive4, setIsActive4] = useState(false);

  const setDate = () => {
    var d = new Date();
    const startDate = moment(d).format('YYYY-MM-DD');
    // console.log('startDate', startDate);
    setFdate(startDate);
    // console.log(d.toLocaleDateString());
    d.setMonth(d.getMonth() - 1);
    // console.log('11111', d.toLocaleDateString());
    const aa = moment(d).format('YYYY-MM-DD');
    setFdateend(aa);
    // console.log('endDate', aa);
  };
  useEffect(() => {
    setDate();
  }, []);
  useEffect(() => {
    if (fdate !== '' && fdateend !== '') {
      data1();
    }
    // if (fdate !== '' && fdateend !== '') {
    //   Promise.all([promise1, promise2, promise3])
    // }
  }, [fdate, fdateend]);

  const data1 = async () => {
    // console.log('chal rha h /////////');
    // console.log('fffffff1f1f2f3f3f', fdate);
    // console.log('poirrtyuiop', fdateend);
    const succcess = await Storage.getLoginDetail('login_detail');
    const vehicleNum = await Storage.getVehicleDetail('vehicle_detail');
    console.log('vehicleNumvehicleNum', vehicleNum);
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
    // console.log('response.data', response.data.DeviceHistory);
    // const resData = response.data.DeviceHistory;
    // const sumOdo = resData.reduce((accumulator, object) => {
    //   return accumulator + object.todaysODO;
    // }, 0);
    // setTotalOdo(sumOdo);
    // const sumIgnitionOn = resData.reduce((accumulator, object) => {
    //   return accumulator + parseFloat(object.todaysIgnitionOnTimeSeconds);
    // }, 0);
    // setSumIgnitionOn(sumIgnitionOn);
    // const sumWaitingTime = resData.reduce((accumulator, object) => {
    //   return accumulator + parseFloat(object.todaysWaitingIgnitionTime);
    // }, 0);
  };

  let index = 0;
  const data = [
    {key: index++, label: '87768'},
    {key: index++, label: '8785875'},
  ];
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
                  setIsActive(!isActive);
                }}>
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

              {isActive ? (
                newVehicleNumber?.map(item => {
                  return <Text>{item.label.slice(0, 13)}</Text>;
                })
              ) : (
                <Text>{newVehicleNumber[0]?.label.slice(0, 13)}</Text>
              )}
            </View>
            <View style={{paddingRight: 20}}>
              <Text>Date</Text>

              {isActive ? (
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

              {isActive ? (
                mapHistory.map(item => {
                  return <Text>{item.todaysODO}</Text>;
                })
              ) : (
                <Text>
                  {mapHistory[0]?.todaysODO ? mapHistory[0].todaysODO : '00.00'}
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
                onPress={() => setIsActive1(!isActive1)}>
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
              <Text>Date</Text>
              {isActive1 ? (
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
              {isActive1 ? (
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
              {isActive1 ? (
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
            <TouchableOpacity>
              <Image source={image.shareDark} style={{width: 24, height: 24}} />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{flexDirection: 'row', paddingTop: 10}}>
            <View style={{paddingRight: 20}}>
              <Text>Vehicle No.</Text>
              <Text>MH12 RN 0790</Text>
            </View>
            <View style={{paddingRight: 20}}>
              <Text>Start Location</Text>
              <Text>{sumIgnitionOn}</Text>
            </View>
            <View style={{paddingRight: 20}}>
              <Text>End Time</Text>
              <Text>{sumIgnitionOn}</Text>
            </View>
            <View style={{paddingRight: 20}}>
              <Text>Travel Time</Text>
              <Text>{sumIgnitionOn}</Text>
            </View>
            <View style={{paddingRight: 20}}>
              <Text>Work/Idle hrs</Text>
              <Text>{sumIgnitionOn}</Text>
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
              {__('Drive Summary Report')}
            </Text>
            <TouchableOpacity>
              <Image source={image.shareDark} style={{width: 24, height: 24}} />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{flexDirection: 'row', paddingTop: 10}}>
            <View style={{paddingRight: 20}}>
              <Text>Drive No.</Text>
              <Text>MH12 RN 0790</Text>
            </View>
            <View style={{paddingRight: 20}}>
              <Text>Start Location</Text>
              <Text>{sumIgnitionOn}</Text>
            </View>
            <View style={{paddingRight: 20}}>
              <Text>End Time</Text>
              <Text>{sumIgnitionOn}</Text>
            </View>
            <View style={{paddingRight: 20}}>
              <Text>Duration with Location</Text>
              <Text>{sumIgnitionOn}</Text>
            </View>
            <View style={{paddingRight: 20}}>
              <Text>Work/Idle hrs</Text>
              <Text>{sumIgnitionOn}</Text>
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
                onPress={() => setIsActive3(!isActive3)}>
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
              {isActive3 ? (
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
              {isActive3 ? (
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
              {isActive3 ? (
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
            <TouchableOpacity
              style={{
                backgroundColor: colors.mainThemeColor1,
                borderRadius: 50,
              }}
              onPress={() => setIsActive4(!isActive4)}>
              <MaterialIcons
                style={{
                  color: colors.white,
                  fontSize: 25,
                }}
                name={'keyboard-arrow-down'}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={image.shareDark} style={{width: 24, height: 24}} />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{flexDirection: 'row', paddingTop: 10}}>
            <View style={{paddingRight: 20}}>
              <Text>Vehicle No.</Text>
              {isActive4 ? (
                newVehicleNumber?.map(item => {
                  return <Text>{item.label.slice(0, 13)}</Text>;
                })
              ) : (
                <Text>{newVehicleNumber[0]?.label.slice(0, 13)}</Text>
              )}
            </View>
            <View style={{paddingRight: 20}}>
              <Text>Date</Text>
              {isActive4 ? (
                mapHistory?.map(item => {
                  return <Text>{item.timeStamp1.slice(4)}</Text>;
                })
              ) : (
                <Text>{mapHistory[0]?.timeStamp1.slice(4)}</Text>
              )}
            </View>
            <View style={{paddingRight: 20}}>
              <Text>Waiting Time</Text>
              {isActive4 ? (
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
      </ScrollView>
    </>
  );
}

export default Reports;
