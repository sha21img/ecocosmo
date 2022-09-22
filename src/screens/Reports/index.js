import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Platform,
  Alert,
  PermissionsAndroid,
  PERMISSIONS,
  Linking,
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
import style from '../MapHistory/style';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import * as ScopedStorage from 'react-native-scoped-storage';
import XLSX from 'xlsx';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {Dirs, FileSystem} from 'react-native-file-access';
const DDP = Dirs.DocumentDir + '/';
function Reports(props) {
  const focus = useIsFocused();
  const screen = Dimensions.get('window');

  const imei = props?.route?.params?.details?.imei;
  const newDetails = props?.route?.params?.details;
  // console.log('++++++++++++++++++', imei);
  // console.log("imeiimeiimeiimeiimei",props.route.params.details.imei)
  const [vehicleNumber, setVehicleNumber] = useState(
    props?.route?.params?.details?.deviceId || 'Select vehicle number',
  );
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
  const [newImei, setNewImei] = useState(imei);
  const [mapHistory, setMapHistory] = useState([]);
  const [isActive, setIsActive] = useState('');
  const [addres, setAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [newFilterVehicle, setNewFilterVehicle] = useState();
  const [lastLocation, setLastLocation] = useState([]);
  const {
    writeFile,
    readFile,
    dirs: {DocumentDir},
  } = RNFetchBlob.fs;
  const [isActive2, setIsActive2] = useState({
    odometer: 0,
    ignition: 0,
    vehicle: 0,
    drive: 0,
    idle: 0,
    daily: 0,
  });
  const [data2, setData2] = useState([]);

  const [summaryReport, setSummaryReport] = useState([]);
  // const d = ['odometer', 'ignition', 'vehicle', 'drive', 'idle', 'daily']
  const setDate = () => {
    var d = new Date();
    const startDate = moment(d).format('YYYY-MM-DD');
    const startTime = moment(d).format('hh-mm-ss');
    // console.log('lkjh',startDate)
    setFtimeend(startTime);
    setFdateend(startDate);
    d.setMonth(d.getMonth() - 1);
    const endTime = moment(d).format('hh-mm-ss');
    const aa = moment(d).format('YYYY-MM-DD');
    setFtime(endTime);
    setFdate(aa);
  };
  // const setVehicleDetail = async data => {
  //   // console.log('newImeinewImei', newImei);

  //   const vehicleNum = await Storage.getVehicleDetail('vehicle_detail');
  //   if (newImei !== undefined) {
  //     const filterImei = data || newImei;
  //     console.log('filterImei', filterImei);
  //     setIsSelected(true);
  //     // console.log('vehicleNumvehicleNum', vehicleNum);
  //     const filterVehicleNumber = vehicleNum
  //       .filter(item => {
  //         return item.imei === filterImei;
  //       })
  //       .map((item, index) => {
  //         return {key: index++, label: item.deviceId, imei: item.imei};
  //       });
  //     console.log(
  //       'filterVehic99999999999999999999999999999999',
  //       filterVehicleNumber,
  //     );
  //     setNewFilterVehicle(filterVehicleNumber[0].label);
  //     setVehicleNumber(filterVehicleNumber[0].label);
  //     setNewImei(filterVehicleNumber[0].imei);
  //   } else {
  //     setNewFilterVehicle(vehicleNum[0].deviceId);
  //     setVehicleNumber(vehicleNum[0].deviceId);
  //     setNewImei(vehicleNum[0].imei);
  //   }
  //   // else {
  //   const allVehicleDetails = vehicleNum.map((item, index) => {
  //     return {key: index++, label: item.deviceId, imei: item.imei};
  //   });
  //   // console.log('setVehicleDetailsetVehicleDetail', allVehicleDetails);
  //   setNewVehicleNumber(allVehicleDetails);
  //   // }
  // };

  useEffect(() => {
    // if (focus == true) {

    setNewImei(imei);
    setDate();
    getInitialData(imei);
    // setVehicleDetail();
  }, [props]);
  const getInitialData = async imei => {
    console.log('getInitialDatagetInitialDatagetInitialData', newImei);
    const vehicleNum = await Storage.getVehicleDetail('vehicle_detail');
    const allVehicleDetails = vehicleNum.map((item, index) => {
      return {key: index++, label: item.deviceId, imei: item.imei};
    });
    setNewVehicleNumber(allVehicleDetails);

    if (imei == undefined) {
      // console.log('ifffffffffffffffffffffffffff');
      setNewFilterVehicle(vehicleNum[0].deviceId);
      setVehicleNumber(vehicleNum[0].deviceId);
      setNewImei(vehicleNum[0].imei);
    } else {
      // console.log()
      // console.log('newDetails.deviceId', newDetails.deviceId);
      // console.log('newDetails.imei', newDetails.imei);
      setNewFilterVehicle(newDetails.deviceId);
      setVehicleNumber(newDetails.deviceId);
      setNewImei(newDetails.imei);
    }
  };

  const getSummaryReport = async () => {
    console.log('getSummaryReportgetSummaryReportgetSummaryReport');
    const success = await Storage.getLoginDetail('login_detail');
    let username = success.accountId;
    let encodedPassWord = success.password;
    // console.log('aaa', success);
    const data = {
      accountid: username,
      password: encodedPassWord,
      imei: newImei,
      // startdate: '2022-06-08 20:41:32',
      // enddate: '2022-08-10 20:42:31',

      startdate: `${fdate} ${ftime}`,
      enddate: `${fdateend} ${ftimeend}`,
    };
    console.log('datadatadata', data);
    const response = await axiosGetData('getDriveDetails', data);
    // console.log('ppppppppppppppppppppppppppppppppppppppp', response?.data);
    if (response?.data?.Drives.length > 0) {
      const summarReport = response?.data?.Drives?.forEach(async item => {
        // console.log('item', item);

        getAddress(item.startPoint, username, encodedPassWord);
        getLastAddress(item.endPoint, username, encodedPassWord);
      });
    }
    // console.log('response.data.Drives', response.data.Drives.slice(0, 3));
    setSummaryReport(response?.data?.Drives);

    return response?.data?.Drives;
  };
  var lastFilterAddress = [];
  const getLastAddress = async (address, username, password) => {
    const newAddress = address.split(',').join('/');
    const response =
      // await axiosGetData(`getAddress`,data);
      await axios.get(
        `http://54.169.20.116/react_v1_ec_apps/api/v3/getAddress/${username}/${password}/${newAddress}`,
      );
    lastFilterAddress.push(response.data);
    setLastLocation(lastFilterAddress);
  };
  // startPoint":"19.268671,72.869516",
  var filterAddress = [];
  const getAddress = async (address, username, password) => {
    // console.log('hihi')
    const newAddress = address.split(',').join('/');
    const response =
      // await axiosGetData(`getAddress`,data);
      await axios.get(
        `http://54.169.20.116/react_v1_ec_apps/api/v3/getAddress/${username}/${password}/${newAddress}`,
      );
    filterAddress.push(response.data);
    setData2(filterAddress);
    // console.log('aafilterAddressa', filterAddress);
  };
  // console.log('pl,pl,ddatatatattataa,pl', data2.length);

  useEffect(() => {
    // if (fdate !== '' && fdateend !== '') {
    //   data1();
    // }
    // console.log('imei-=-', newImei);
    if (fdate !== '' && fdateend !== '' && newImei !== undefined) {
      data1();
      getSummaryReport();
    }
  }, [fdate, fdateend, newImei]);

  const data1 = async () => {
    const succcess = await Storage.getLoginDetail('login_detail');
    console.log('succcess');
    setLoading(false);

    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    const data = {
      accountid: username,
      password: encodedPassWord,
      imei: newImei,
      // startdate: '2016-11-01',
      // enddate: '2016-11-22',
      startdate: fdate.toString(),
      enddate: fdateend.toString(),
      type: 'odo',
    };
    console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', data);
    const response = await axiosGetData('reportHistory', data);
    const aa = response.data.DeviceHistory;
    console.log('098765432345678987654345678', aa?.length);
    setMapHistory(aa);
    setLoading(true);

    return aa;
  };

  let index = 0;
  function formatDate(date) {
    var d = new Date(date);
    // console.log('oiuytrewqweiopoiuytrew', d);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  // function formatDate(date) {
  //   var d = new Date(date);
  //   console.log('oiuytrewqweiopoiuytrew', d.getMonth());
  //   (month = '' + (d.getMonth() + 1)),
  //     (day = '' + d.getDate()),
  //     (year = d.getFullYear());
  //   if (month.length < 2) month = '0' + month;
  //   if (day.length < 2) day = '0' + day;
  //   return [year, month, day].join('-');
  // }
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
  const getFilterVehicle = async (data, imei) => {
    // console.log('selected==============', data, imei);
    setLoading(false);
    setVehicleNumber(data);
    // setNewVehicleNumber(data)

    const vehicleNum = await Storage.getVehicleDetail('vehicle_detail');
    const includedArray = vehicleNum
      .filter(item => {
        return item.deviceId == data;
      })
      .map(item => item.imei);
    // console.log('includedArray', includedArray[0]);
    setNewImei(includedArray[0]);
    setIsSelected(true);
    // setVehicleDetail(includedArray[0]);
    setNewFilterVehicle(data);
    setVehicleNumber(data);
    // setNewImei(filterVehicleNumber[0].imei);
    setLoading(true);
  };

  const getTime = secs => {
    var minutes = Math.floor(secs / 60);
    secs = secs % 60;
    var hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    let time = `${hours.toString().length == 1 ? '0' + hours : hours}:${
      minutes.toString().length == 1 ? '0' + minutes : minutes
    }:${secs.toString().length == 1 ? '0' + secs : secs}`;
    // console.log('time', time);
    return time;
  };
  const getNewDate = data => {
    const d = moment(data, 'Do MMM YYYY').toDate();
    const newDate = moment(d).format('YYYY-MM-DD');
    return newDate;
  };
  const requestRunTimePermission = async (data, heading, option) => {
    try {
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      // console.log('isPermitedExternalStorage', isPermitedExternalStorage);
      if (!isPermitedExternalStorage) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data.',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          if (option == 'Excel') {
            exportDataToExcel(data, heading);
          } else {
            createPDF_File(data, heading);
          }
        } else {
          alert('WRITE_EXTERNAL_STORAGE permission denied');
        }
      } else {
        if (option == 'Excel') {
          exportDataToExcel(data, heading);
        } else {
          createPDF_File(data, heading);
        }
      }
    } catch (err) {
      Alert.alert('Write permission err', err);
      console.warn(err);
      return;
    }
  };
  const exportDataToExcel = async (data, heading) => {
    let Data;
    if (data == 'Odometer Total km') {
      Data = mapHistory.map(item => {
        const kms = item.todaysODO;
        const date = getNewDate(item.timeStamp1);
        return {VehicleNumber: newFilterVehicle, Date: date, Kms: kms};
      });
    } else if (data == 'Ignition On') {
      Data = mapHistory.map(item => {
        const date = getNewDate(item.timeStamp1);
        const ingnitionOn = getTime(item.todaysIgnitionOnTimeSeconds);
        const ingnitionOff = getTime(item.todaysIdleTimeSeconds);
        return {
          VehicleNumber: newFilterVehicle,
          Date: date,
          [`IngnitionOn(HH:MM:SS)`]: ingnitionOn,
          [`IngnitionOff(HH:MM:SS)`]: ingnitionOff,
        };
      });
    } else if (data == 'Idle Report') {
      Data = mapHistory.map(item => {
        const date = getNewDate(item.timeStamp1);
        const ingnitionOff = getTime(item.todaysIdleTimeSeconds);
        return {
          VehicleNumber: newFilterVehicle,
          Date: date,
          [`IngnitionOff(HH:MM:SS)`]: ingnitionOff,
        };
      });
    } else if (data == 'Daily Waiting Time Report') {
      Data = mapHistory.map(item => {
        const date = getNewDate(item.timeStamp1);
        const waitingtime = getTime(item.todaysWaitingIgnitionTime);
        return {
          VehicleNumber: newFilterVehicle,
          Date: date,
          [`Waitingtime(HH:MM:SS)`]: waitingtime,
        };
      });
    } else if (data == 'Drive Summary Report') {
      Data = summaryReport.map(item => {
        return {
          VehicleNumber: newFilterVehicle,
          StartTime: item['startTime:'],
          EndTime: item['endTime:'],
          kms: item.odo,
          Duration: item.duration,
        };
      });
      // Data = [...a, ...b];
    } else if (data == 'Vehicle Summary') {
      Data = mapHistory.map(item => {
        const date = getNewDate(item.timeStamp1);
        const startTime = getTime(item.todaysWaitingIgnitionTime);
        const idleTime = getTime(item.todaysIdleTimeSeconds);
        const ignition = getTime(item.todaysIgnitionOnTimeSeconds);
        return {
          'Vehicle Number': newFilterVehicle,
          'Start Location': item?.startLocation,
          'Start Time': item?.startTime,
          'Travel Time': item?.travelTime,
          'Work/Idle hrs': startTime,
          'Stoped Time': idleTime,
          'Max Speed(Km/h)': item.todaysMaxSpeed,
          'Avg Speed(Km/h)': item.avgSpeed,
          'Engine Hours': ignition,
          'Distance Travelled(kms)': item?.todaysODO,
          'End Location': item?.endLocation,
          'End Time (HH:MM)': item?.endTime,
          '#OverSpeed': item?.overspeedCounter,
          '#Alert': item?.alertsCounter,
          '#Report Date': item?.timeStamp1,
        };
      });
    }

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(Data);
    XLSX.utils.book_append_sheet(wb, ws);
    const b64 = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
    RNFS.writeFile(RNFS.DocumentDirectoryPath + '/Report.xlsx', b64, 'ascii')
      .then(async r => {
        RNFetchBlob.fs
          .readFile(RNFS.DocumentDirectoryPath + '/Report.xlsx', 'base64')
          .then(async data => {
            const shareOption = {
              url: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${data}`,
            };
            const ShareResponse = await Share.open(shareOption);
          })
          .catch(err => {
            console.log('error', err);
          });
        console.log('Success', r);
      })
      .catch(e => {
        console.log('Error1', e);
      });
  };
  const createPDF_File = async (data, heading) => {
    let html = ``;
    html += `<h3 style="text-align: center;">${data} ${' '}(${newFilterVehicle})</h3>`;
    html += `<table style="width:100%; border:1px solid black;">
    <tr>`;
    heading.map(item => {
      html += `<th style=" text-align: center; ">${item}</th>`;
    });
    html += ` </tr> </table>`;
    mapHistory?.map(item => {
      const date = getNewDate(item.timeStamp1);
      const kms = item.todaysODO;
      const ingnitionOn = getTime(item.todaysIgnitionOnTimeSeconds);
      const ingnitionOff = getTime(item.todaysIdleTimeSeconds);
      const waitingtime = getTime(item.todaysWaitingIgnitionTime);

      if (data == 'Odometer Total km') {
        html += `<table style="width:100%; border:1px solid black;">
                   <tr>
                     <td style=" text-align: center;width: 600px; ">${newFilterVehicle}</td>
                     <td style=" text-align: center;width: 200px; ">${date}</td>
                     <td style=" text-align: center;width: 200px; ">${kms}</td>
                   </tr>
                </table>`;
      } else if (data == 'Ignition On') {
        html += `<table style="width:100%; border:1px solid black;">
        <tr>
          <td style=" text-align: center;width: 200px;">${newFilterVehicle}</td>
          <td style=" text-align: center;width: 150px;">${date}</td>
          <td style=" text-align: center;width: 300px;">${ingnitionOn}</td>
          <td style=" text-align: center;width: 300px;">${ingnitionOff}</td>
        </tr>
     </table>`;
      } else if (data == 'Idle Report') {
        html += `<table style="width:100%; border:1px solid black;">
          <tr>
            <td style=" text-align: center;width: 110px; ">${newFilterVehicle}</td>
            <td style=" text-align: center;width: 60px; ">${date}</td>
            <td style=" text-align: center;width: 200px; ">${ingnitionOff}</td>
          </tr>
       </table>`;
      } else if (data == 'Daily Waiting Time Report') {
        html += `<table style="width:100%; border:1px solid black;">
          <tr>
            <td style=" text-align: center;width: 120px; ">${newFilterVehicle}</td>
            <td style=" text-align: center;width: 60px;  ">${date}</td>
            <td style=" text-align: center;width: 200px ">${waitingtime}</td>
          </tr>
       </table>`;
      }
    });

    let file = await RNHTMLtoPDF.convert({html});
    RNFetchBlob.fs
      .readFile(file.filePath, 'base64')
      .then(async data => {
        // console.log('datadatadatadatadatadatadatadatadatadatadata', data);
        const shareOption = {
          url: `data:application/pdf;base64,${data}`,
        };
        const ShareResponse = await Share.open(shareOption);
      })
      .catch(err => {
        console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', err);
      });
  };
  const showModal = (data, heading) => {
    // console.log('qqqqqqqqqqqqqqqq', data);
    // console.log('hhhhhhhhhhhhhhhhhhh', heading);
    Alert.alert(
      '',
      'Which you want to share',
      data != 'Vehicle Summary' && data != 'Drive Summary Report'
        ? [
            {
              text: 'Share as Pdf',
              onPress: () => requestRunTimePermission(data, heading, 'Pdf'),
            },
            {
              text: 'Share as Excel',
              onPress: () => requestRunTimePermission(data, heading, 'Excel'),
              style: 'cancel',
            },
          ]
        : [
            {
              text: 'Share as Excel',
              onPress: () => requestRunTimePermission(data, heading, 'Excel'),
              style: 'cancel',
            },
          ],
      {
        cancelable: true,
      },
    );
  };

  const renderLocation = location => {
    const totalSplits = Math.ceil(location?.length / 15);
    // console.log(
    //   'asssssss',
    //   location
    //     .split('')
    //     .slice(1 * 15, 1 * 15 + 15)
    //     .join(''),
    // );
    if (!location) return null;
    return Array(totalSplits)
      .fill(1)
      .map((item, i) => {
        return (
          <Text>
            {location
              .split('')
              .slice(i * 15, i * 15 + 15)
              .join('')}
          </Text>
        );
      });
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
              <Text style={styles.dashboardText}> Numerical Report</Text>
              {/* <TextInput editable={false} value={__('Distance Reports')} /> */}
            </View>
            <View style={styles.alertContainer}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('GraphicalReports', {
                    newImei: newImei,
                  })
                }>
                <Image source={image.graph} style={{height: 35, width: 35}} />
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
                  getFilterVehicle(option.label, option.imei);
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
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              paddingHorizontal: 20,
              justifyContent: 'space-between',
              paddingVertical: 10,
              padding: 0,
              backgroundColor: 'transparent',
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
                backgroundColor: 'white',
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
                backgroundColor: 'white',
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
        </LinearGradient>

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
      {/* {isSelected ? ( */}
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
                      setIsActive2(prev => {
                        return {
                          ...prev,
                          odometer: prev['odometer'] == 0 ? 1 : 0,
                        };
                      });
                      //   setIsActive2((prev)=>{
                      //   return
                      //   {...prev,prev['odometer']:prev['odometer']==0?1:0})
                      // }
                    }}>
                    <MaterialIcons
                      style={{
                        color: colors.white,
                        fontSize: 25,
                      }}
                      name={'keyboard-arrow-down'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={
                      () =>
                        showModal('Odometer Total km', [
                          'Vehicle Number',
                          'Date',
                          'Kms',
                        ])
                      // requestRunTimePermission('Odometer Total km', [
                      //   'Vehicle Number',
                      //   'Date',
                      //   'Kms',
                      // ])
                    }>
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
                  <Text style={styles.textHead}>Vehicle No.</Text>

                  {/* {isActive === 'odometer' && isActive2.odometer === 1 ? (
                      <Text>{newFilterVehicle}</Text>
                    ) : null} */}
                  {isActive === 'odometer' && isActive2.odometer === 1 ? (
                    mapHistory?.map(item => {
                      return <Text>{newFilterVehicle}</Text>;
                    })
                  ) : (
                    <Text>{newFilterVehicle}</Text>
                  )}
                </View>
                <View style={{paddingRight: 20}}>
                  <Text style={styles.textHead}>Date</Text>

                  {isActive == 'odometer' && isActive2.odometer === 1 ? (
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
                  <Text style={styles.textHead}>Kms</Text>

                  {isActive === 'odometer' && isActive2.odometer === 1 ? (
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
                    onPress={() => {
                      setIsActive('ignition'),
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
                  <TouchableOpacity
                    onPress={() =>
                      showModal('Ignition On', [
                        'Vehicle Number',
                        'Date',
                        'Ignition On (HH:MM:SS)',
                        'Ignition Off (HH:MM:SS)',
                      ])
                    }>
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
                  <Text style={styles.textHead}>Vehicle No.</Text>
                  {/* <Text>20-07-2022</Text> */}
                  {/* {isActive === 'ignition' && isActive2.ignition === 1 ? (
                      newVehicleNumber?.map(item => {
                        return <Text>{item.label.slice(0, 13)}</Text>;
                      })
                    ) : (
                      <Text>{newVehicleNumber[0]?.label.slice(0, 13)}</Text>
                    )} */}
                  {/* {isActive === 'ignition' && isActive2.ignition === 1 ? ( */}

                  {/* <Text>{newFilterVehicle}</Text> */}
                  {isActive === 'ignition' && isActive2.ignition === 1 ? (
                    mapHistory?.map(item => {
                      return <Text>{newFilterVehicle}</Text>;
                    })
                  ) : (
                    <Text>{newFilterVehicle}</Text>
                  )}
                  {/* ) : null} */}
                </View>
                <View style={{paddingRight: 20}}>
                  <Text style={styles.textHead}>Date</Text>
                  {isActive === 'ignition' && isActive2.ignition === 1 ? (
                    mapHistory.map(item => {
                      return <Text>{getNewDate(item.timeStamp1)}</Text>;
                    })
                  ) : (
                    <Text>
                      {mapHistory[0]?.timeStamp1
                        ? getNewDate(mapHistory[0]?.timeStamp1)
                        : '00-00-00'}
                    </Text>
                  )}
                </View>
                <View style={{paddingRight: 20}}>
                  <Text style={styles.textHead}>Ignition on</Text>
                  {isActive === 'ignition' && isActive2.ignition === 1 ? (
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
                  <Text style={styles.textHead}>Ignition off</Text>
                  {isActive === 'ignition' && isActive2.ignition === 1 ? (
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
            {/* {data2.length > 0 ? ( */}
            {/* {mapHistory.length > 0 ? ( */}
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
                    onPress={() => {
                      setIsActive('vehicle'),
                        setIsActive2(prev => {
                          return {
                            ...prev,
                            vehicle: prev['vehicle'] == 0 ? 1 : 0,
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
                  <TouchableOpacity
                    onPress={() =>
                      showModal('Vehicle Summary', [
                        'Vehicle Number',
                        'Start Location',
                        'Start Time',
                        'Travel Time',
                        'Work/Idle hrs',
                        'Stoped Time',
                        'Max Speed(Km/h)',
                        'Avg Speed(Km/h)',
                        'Engine Hours',
                        'Distance Travelled(kms)',
                        'End Location',
                        'End Time (HH:MM)',
                        '#OverSpeed',
                        '#Alert',
                        '#Report Date',
                      ])
                    }>
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
                style={{paddingTop: 10}}>
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.text}>Vehicle No.</Text>
                    <Text style={styles.text}>Report Date</Text>
                    <Text style={styles.text}>Start Location</Text>
                    <Text style={styles.text}>Start Time</Text>
                    <Text style={styles.text}>Travel Time</Text>
                    <Text style={styles.text}>Work/Idle hrs</Text>
                    <Text style={styles.text}>Stopped Time</Text>
                    <Text style={styles.text}>Max Speed(Km/h)</Text>
                    <Text style={styles.text}>Avg Speed(Km/h)</Text>
                    <Text style={styles.text}>Engine Hours</Text>
                    <Text style={styles.text}>Distance Travelled(kms)</Text>
                    <Text style={styles.text}>End Location</Text>
                    <Text style={styles.text}>End Time (HH:MM)</Text>
                    <Text style={styles.text}>#OverSpeed</Text>
                    <Text style={styles.text}>#Alerts</Text>
                  </View>
                  {isActive === 'vehicle' && isActive2.vehicle === 1 ? (
                    mapHistory?.map(item => {
                      return (
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.tex}>{newFilterVehicle}</Text>
                          <Text style={styles.tex}>
                            {getNewDate(item.timeStamp1)}
                          </Text>

                          <View
                            style={{alignSelf: 'flex-start', minWidth: 180}}>
                            {renderLocation(item?.startLocation)}
                          </View>
                          <Text style={styles.tex}>{item?.startTime}</Text>
                          <Text style={styles.tex}>{item?.travelTime}</Text>
                          <Text style={styles.tex}>
                            {getTime(item.todaysWaitingIgnitionTime)}
                          </Text>
                          <Text style={styles.tex}>
                            {getTime(item.todaysIdleTimeSeconds)}
                          </Text>
                          <Text style={styles.tex}>{item.todaysMaxSpeed}</Text>
                          <Text style={styles.tex}>{item.avgSpeed}</Text>
                          <Text style={styles.tex}>
                            {getTime(item.todaysIgnitionOnTimeSeconds)}
                          </Text>
                          <Text style={styles.tex}>{item.todaysODO}</Text>

                          <View
                            style={{alignSelf: 'flex-start', minWidth: 180}}>
                            {renderLocation(item?.endLocation)}
                          </View>
                          <Text style={styles.tex}>{item?.endTime}</Text>
                          <Text style={styles.tex}>
                            {item?.overspeedCounter}
                          </Text>
                          <Text style={styles.tex}>{item?.alertsCounter}</Text>
                        </View>
                      );
                    })
                  ) : (
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.tex}>{newFilterVehicle}</Text>
                      <Text style={styles.tex}>
                        {mapHistory[0]?.timeStamp1}
                      </Text>

                      {/* <Text style={styles.tex} numberOfLines={1}>
                        {mapHistory[0]?.startLocation}
                      </Text> */}

                      <View style={{alignSelf: 'flex-start', minWidth: 180}}>
                        {renderLocation(mapHistory[0]?.startLocation)}
                      </View>
                      <Text style={styles.tex}>{mapHistory[0]?.startTime}</Text>
                      <Text style={styles.tex}>
                        {mapHistory[0]?.travelTime}
                      </Text>
                      <Text style={styles.tex}>
                        {getTime(mapHistory[0]?.todaysWaitingIgnitionTime)}
                      </Text>
                      <Text style={styles.tex}>
                        {getTime(mapHistory[0]?.todaysIdleTimeSeconds)}
                      </Text>
                      <Text style={styles.tex}>
                        {mapHistory[0]?.todaysMaxSpeed}
                      </Text>
                      <Text style={styles.tex}>{mapHistory[0]?.avgSpeed}</Text>
                      <Text style={styles.tex}>
                        {getTime(mapHistory[0]?.todaysIgnitionOnTimeSeconds)}
                      </Text>
                      <Text style={styles.tex}>{mapHistory[0]?.todaysODO}</Text>
                      <View style={{alignSelf: 'flex-start', minWidth: 180}}>
                        {renderLocation(mapHistory[0]?.endLocation)}
                      </View>
                      {/* <Text style={styles.tex}>{mapHistory[0]?.endLocation}</Text> */}
                      <Text style={styles.tex}>{mapHistory[0]?.endTime}</Text>
                      <Text style={styles.tex}>
                        {mapHistory[0]?.overspeedCounter}
                      </Text>
                      <Text style={styles.tex}>
                        {mapHistory[0]?.alertsCounter}
                      </Text>
                    </View>
                  )}
                </View>
              </ScrollView>
            </LinearGradient>
            {/* ) : null} */}

            {/*
             */}

            {/* {data2.length > 0 ? ( */}

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
                    onPress={() => {
                      setIsActive('idle'),
                        setIsActive2(prev => {
                          return {
                            ...prev,
                            idle: prev['idle'] == 0 ? 1 : 0,
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
                  <TouchableOpacity
                    onPress={() =>
                      showModal('Idle Report', [
                        'Vehicle Number',
                        'Date',
                        'Engine Idle Time (HH:MM:SS)',
                      ])
                    }>
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
                  <Text style={styles.textHead}>Vehicle No.</Text>
                  {/* <Text>20-07-2022</Text> */}
                  {/* {isActive == 'idle' && isActive2.idle === 1 ? (
                      newVehicleNumber?.map(item => {
                        return <Text>{item.label.slice(0, 13)}</Text>;
                      })
                    ) : (
                      <Text>{newVehicleNumber[0]?.label.slice(0, 13)}</Text>
                    )} */}
                  {/* {isActive == 'idle' && isActive2.idle === 1 ? ( */}
                  {/* <Text>{newFilterVehicle}</Text> */}
                  {/* ) : null} */}
                  {isActive == 'idle' && isActive2.idle === 1 ? (
                    mapHistory?.map(item => {
                      return <Text>{newFilterVehicle}</Text>;
                    })
                  ) : (
                    <Text>{newFilterVehicle}</Text>
                  )}
                </View>
                <View style={{paddingRight: 20}}>
                  <Text style={styles.textHead}>Date</Text>
                  {/* <Text>{sumIgnitionOn}</Text> */}
                  {isActive == 'idle' && isActive2.idle === 1 ? (
                    mapHistory?.map(item => {
                      {
                        /* console.log('item.timeStamp1', item.timeStamp1); */
                      }
                      return (
                        <Text>
                          {/* {moment(item.timeStamp1.slice(3)).format('YYYY-MM-DD')} */}
                          {getNewDate(item.timeStamp1)}
                        </Text>
                      );
                    })
                  ) : (
                    <Text>
                      {mapHistory[0]?.timeStamp1
                        ? getNewDate(mapHistory[0].timeStamp1)
                        : '00:00:00'}
                    </Text>
                    /* <Text>
                      {getNewDate(mapHistory[0]?.timeStamp1)}
                    </Text> */
                  )}
                </View>
                <View style={{paddingRight: 20}}>
                  <Text style={styles.textHead}>Engine Idle Time</Text>
                  {isActive == 'idle' && isActive2.idle === 1 ? (
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
                    onPress={() => {
                      setIsActive('daily'),
                        setIsActive2(prev => {
                          return {
                            ...prev,
                            daily: prev['daily'] == 0 ? 1 : 0,
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
                  <TouchableOpacity
                    onPress={() =>
                      showModal('Daily Waiting Time Report', [
                        'Vehicle Number',
                        'Date',
                        'Waiting Time (HH:MM:SS)',
                      ])
                    }>
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
                  <Text style={styles.textHead}>Vehicle No.</Text>
                  {isActive === 'daily' && isActive2.daily === 1 ? (
                    mapHistory?.map(item => {
                      return <Text>{newFilterVehicle}</Text>;
                    })
                  ) : (
                    <Text>{newFilterVehicle}</Text>
                  )}
                </View>
                <View style={{paddingRight: 20}}>
                  <Text style={styles.textHead}>Date</Text>
                  {isActive === 'daily' && isActive2.daily === 1 ? (
                    mapHistory?.map(item => {
                      return <Text>{item.timeStamp1.slice(4)}</Text>;
                    })
                  ) : (
                    <Text>
                      {mapHistory[0]?.timeStamp1
                        ? getNewDate(mapHistory[0].timeStamp1)
                        : '00:00:00'}
                    </Text>
                    /* <Text>{mapHistory[0]?.timeStamp1.slice(4)}</Text> */
                  )}
                </View>
                <View style={{paddingRight: 20}}>
                  <Text style={styles.textHead}>Waiting Time</Text>
                  {isActive === 'daily' && isActive2.daily === 1 ? (
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
            {summaryReport.length > 0 ? (
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
                    onPress={() => {
                      setIsActive('drive'),
                        setIsActive2(prev => {
                          return {
                            ...prev,
                            drive: prev['drive'] == 0 ? 1 : 0,
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
                  <TouchableOpacity
                    onPress={() =>
                      showModal('Drive Summary Report', [
                        'Vehicle Number',
                        'End Time',
                        'kms',
                        'Duration',
                        'Start Time',
                      ])
                    }>
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
                  <View style={{paddingRight: 20}}>
                    <Text style={styles.textHead}>Vehicle No.</Text>
                    {isActive === 'drive' && isActive2.drive === 1 ? (
                      summaryReport?.map(item => {
                        return <Text>{newFilterVehicle}</Text>;
                      })
                    ) : (
                      <Text>{newFilterVehicle}</Text>
                    )}
                  </View>
                  <View
                    style={{
                      paddingRight: 20,
                    }}>
                    <Text style={styles.textHead}>Start Location</Text>
                    {isActive === 'drive' && isActive2.drive === 1 ? (
                      data2?.map(item => {
                        return <Text>{item?.vehicleAddress}</Text>;
                      })
                    ) : (
                      <Text>{data2[0]?.vehicleAddress}</Text>
                    )}
                  </View>
                  {/*  */}
                  <View
                    style={{
                      paddingRight: 20,
                    }}>
                    <Text style={styles.textHead}>End Location</Text>
                    {isActive === 'drive' && isActive2.drive === 1 ? (
                      lastLocation?.map(item => {
                        return <Text>{item?.vehicleAddress}</Text>;
                      })
                    ) : (
                      <Text>{lastLocation[0]?.vehicleAddress}</Text>
                    )}
                  </View>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text style={styles.textHead}>Start Time</Text>
                      <Text style={styles.textHead}>End Time</Text>
                      <Text style={styles.textHead}>kms</Text>
                      <Text style={styles.textHead}>Duration</Text>
                    </View>
                    {isActive === 'drive' && isActive2.drive === 1 ? (
                      summaryReport?.map(item => {
                        return (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignContent: 'flex-start',
                            }}>
                            <Text style={{minWidth: 100, alignSelf: 'center'}}>
                              {moment(item['startTime:']).format('hh:mm')}
                            </Text>
                            <Text style={{minWidth: 100, alignSelf: 'center'}}>
                              {moment(item['endTime:']).format('hh:mm')}
                            </Text>
                            <Text style={{minWidth: 100, alignSelf: 'center'}}>
                              {item.odo}
                            </Text>
                            <Text style={{minWidth: 100, alignSelf: 'center'}}>
                              {item.duration}
                            </Text>

                            <TouchableOpacity
                              onPress={() =>
                                props.navigation.navigate('MapHistory', {
                                  summaryData: item,
                                  imei: newImei,
                                })
                              }>
                              <Image
                                source={image.maphistory}
                                style={{
                                  resizeMode: 'contain',
                                  height: 20,
                                  width: 20,
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                        );
                      })
                    ) : (
                      <View style={{flexDirection: 'row'}}>
                        <View style={styles.textHead}>
                          <Text>
                            {summaryReport[0]
                              ? moment(summaryReport[0]['startTime:']).format(
                                  'hh:mm',
                                )
                              : '00:00:00'}
                          </Text>
                        </View>
                        <View style={styles.textHead}>
                          <Text>
                            {summaryReport[0]
                              ? moment(summaryReport[0]['endTime:']).format(
                                  'hh:mm',
                                )
                              : '00:00:00'}
                          </Text>
                        </View>
                        <View style={styles.textHead}>
                          <Text>{summaryReport[0]?.odo}</Text>
                        </View>
                        <View style={styles.textHead}>
                          <Text>{summaryReport[0]?.duration}</Text>
                        </View>
                      </View>
                    )}
                  </View>
                </ScrollView>
              </LinearGradient>
            ) : null}
          </>
        ) : (
          <ActivityIndicator color={colors.black} />
        )}
      </ScrollView>
      {/* ) 
      : (
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
      )} */}
    </>
  );
}

export default Reports;
