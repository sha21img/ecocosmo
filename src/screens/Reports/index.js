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

  useEffect(() => {
    data1();
  }, []);

  const data1 = async () => {
    const succcess = await Storage.getLoginDetail('login_detail');
    // const vehicleNum = await Storage.getVehicleDetail('vehicle_detail');
    // setdata(vehicleNum);
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    const data = {
      accountid: username,
      password: encodedPassWord,
      imei: '459710040353691',
      startdate: '2016-11-01',
      enddate: '2016-11-22',
      type: 'odo',
    };
    const response = await axiosGetData('reportHistory', data);
    console.log('response.data', response.data.DeviceHistory);
    const resData = response.data.DeviceHistory;
    const sumOdo = resData.reduce((accumulator, object) => {
      return accumulator + object.todaysODO;
    }, 0);
    setTotalOdo(sumOdo);
    const sumIgnitionOn = resData.reduce((accumulator, object) => {
      return accumulator + parseFloat(object.todaysIgnitionOnTimeSeconds);
    }, 0);
    setSumIgnitionOn(sumIgnitionOn);
    const sumWaitingTime = resData.reduce((accumulator, object) => {
      return accumulator + parseFloat(object.todaysWaitingIgnitionTime);
    }, 0);
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
                width: '60%',
              }}>
              <ModalSelector
                initValue="Select tickets"
                accessible={true}
                data={data}
                scrollViewAccessibilityLabel={'Scrollable options'}
                onChange={option => {
                  setVehicleNumber(option.label);
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

            <TouchableOpacity style={{width: '35%'}}>
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
            </TouchableOpacity>
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
            <TouchableOpacity>
              <Image source={image.shareDark} style={{width: 24, height: 24}} />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{flexDirection: 'row', paddingTop: 10}}>
            <View style={{paddingRight: 20}}>
              <Text>Date</Text>
              <Text>20-07-2022</Text>
            </View>
            <View style={{paddingRight: 20}}>
              <Text>Kms</Text>
              <Text>{totalOdo}</Text>
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
            <TouchableOpacity>
              <Image source={image.shareDark} style={{width: 24, height: 24}} />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{flexDirection: 'row', paddingTop: 10}}>
            <View style={{paddingRight: 20}}>
              <Text>Date</Text>
              <Text>20-07-2022</Text>
            </View>
            <View style={{paddingRight: 20}}>
              <Text>Ignition on</Text>
              <Text>{sumIgnitionOn}</Text>
            </View>
            <View style={{paddingRight: 20}}>
              <Text>Ignition off</Text>
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
              <Text>20-07-2022</Text>
            </View>
            <View style={{paddingRight: 20}}>
              <Text>Date</Text>
              <Text>{sumIgnitionOn}</Text>
            </View>
            <View style={{paddingRight: 20}}>
              <Text>Engine Idle Time</Text>
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
              {__('Daily Waiting Time Report')}
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
              <Text>20-07-2022</Text>
            </View>
            <View style={{paddingRight: 20}}>
              <Text>Date</Text>
              <Text>{sumIgnitionOn}</Text>
            </View>
            <View style={{paddingRight: 20}}>
              <Text>Waiting Time</Text>
              <Text>{sumIgnitionOn}</Text>
            </View>
          </ScrollView>
        </LinearGradient>
      </ScrollView>
    </>
  );
}

export default Reports;

// {"DeviceHistory":
// const data = [
//   {
//     deviceId: 'Petrol zeep',
//     0: 'Petrol zeep',
//     todaysODO: 33.34,
//     1: '33.3442',
//     todaysIgnitionOnTimeSeconds: '5216',
//     2: '5216',
//     todaysIdleTimeSeconds: '81184',
//     3: '81184',
//     todaysWaitingIgnitionTime: '1306',
//     4: '1306',
//     cumulativeIgnitionOnTimeSeconds: '993412',
//     5: '993412',
//     timeStamp1: 'Tue 22nd Nov 2016',
//     6: 'Tue 22nd Nov 2016',
//     eventTime: '1479816000',
//     7: '1479816000',
//   },
//   {
//     deviceId: 'Petrol zeep',
//     0: 'Petrol zeep',
//     // todaysODO: 3.85,
//     // 1: '3.84679',
//     // todaysIgnitionOnTimeSeconds: '488',
//     // 2: '488',
//     // todaysIdleTimeSeconds: '85912',
//     // 3: '85912',
//     // todaysWaitingIgnitionTime: '125',
//     // 4: '125',
//     cumulativeIgnitionOnTimeSeconds: '988196',
//     5: '988196',
//     timeStamp1: 'Mon 21st Nov 2016',
//     6: 'Mon 21st Nov 2016',
//     eventTime: '1479729600',
//     7: '1479729600',
//   },
//   {
//     deviceId: 'Petrol zeep',
//     0: 'Petrol zeep',
//     todaysODO: 23.97,
//     1: '23.9698',
//     todaysIgnitionOnTimeSeconds: '3210',
//     2: '3210',
//     todaysIdleTimeSeconds: '83190',
//     3: '83190',
//     todaysWaitingIgnitionTime: '825',
//     4: '825',
//     cumulativeIgnitionOnTimeSeconds: '987708',
//     5: '987708',
//     timeStamp1: 'Wed 9th Nov 2016',
//     6: 'Wed 9th Nov 2016',
//     eventTime: '1478692800',
//     7: '1478692800',
//   },
//   {
//     deviceId: 'Petrol zeep',
//     0: 'Petrol zeep',
//     todaysODO: 73.46,
//     1: '73.4575',
//     todaysIgnitionOnTimeSeconds: '10969',
//     2: '10969',
//     todaysIdleTimeSeconds: '75431',
//     3: '75431',
//     todaysWaitingIgnitionTime: '2305',
//     4: '2305',
//     cumulativeIgnitionOnTimeSeconds: '984498',
//     5: '984498',
//     timeStamp1: 'Tue 8th Nov 2016',
//     6: 'Tue 8th Nov 2016',
//     eventTime: '1478606400',
//     7: '1478606400',
//   },
//   {
//     deviceId: 'Petrol zeep',
//     0: 'Petrol zeep',
//     todaysODO: 30.62,
//     1: '30.6189',
//     todaysIgnitionOnTimeSeconds: '5162',
//     2: '5162',
//     todaysIdleTimeSeconds: '81238',
//     3: '81238',
//     todaysWaitingIgnitionTime: '1718',
//     4: '1718',
//     cumulativeIgnitionOnTimeSeconds: '973529',
//     5: '973529',
//     timeStamp1: 'Mon 7th Nov 2016',
//     6: 'Mon 7th Nov 2016',
//     eventTime: '1478520000',
//     7: '1478520000',
//   },
//   {
//     deviceId: 'Petrol zeep',
//     0: 'Petrol zeep',
//     todaysODO: 19.37,
//     1: '19.3699',
//     todaysIgnitionOnTimeSeconds: '2901',
//     2: '2901',
//     todaysIdleTimeSeconds: '83499',
//     3: '83499',
//     todaysWaitingIgnitionTime: '334',
//     4: '334',
//     cumulativeIgnitionOnTimeSeconds: '968367',
//     5: '968367',
//     timeStamp1: 'Sun 6th Nov 2016',
//     6: 'Sun 6th Nov 2016',
//     eventTime: '1478433600',
//     7: '1478433600',
//   },
//   {
//     deviceId: 'Petrol zeep',
//     0: 'Petrol zeep',
//     todaysODO: 8.98,
//     1: '8.98227',
//     todaysIgnitionOnTimeSeconds: '4763',
//     2: '4763',
//     todaysIdleTimeSeconds: '81637',
//     3: '81637',
//     todaysWaitingIgnitionTime: '2631',
//     4: '2631',
//     cumulativeIgnitionOnTimeSeconds: '965466',
//     5: '965466',
//     timeStamp1: 'Sat 5th Nov 2016',
//     6: 'Sat 5th Nov 2016',
//     eventTime: '1478347200',
//     7: '1478347200',
//   },
// ];
