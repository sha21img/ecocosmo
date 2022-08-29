import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  View,
  Share,
  TextInput,
  Linking,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';
import {image} from '../../../assets/images';
import {__} from '../../../Utils/Translation/translation';
import {styles} from './style';
import DateTimePicker from '@react-native-community/datetimepicker';
import {axiosGetData} from '../../../Utils/ApiController';
import Storage from '../../../Utils/Storage';
import SelectDropdown from 'react-native-select-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';
import DatePicker from 'react-native-date-picker';

const UrlTracking = props => {
  console.log('this is props', props.route.params.details.imei);
  const IMEI = props.route.params.details.imei;
  const [day, setday] = useState(null);
  const [discription, setDiscription] = useState('');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [cdate, setCdate] = useState('');
  const [ctime, setCtime] = useState('');
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('All Vehicle');
  const [data, setdata] = useState();
  const [imei, setImei] = useState(IMEI || '');

  const sendUrl = async () => {
    const succcess = await Storage.getLoginDetail('login_detail');
    let username = succcess.accountId;
    let password = succcess.password;
    if (day != null && discription != '') {
      const response = await axiosGetData(
        `gettrackurl/${username}/${password}/${imei}/ecvalidate/${day.toString()}`,
      );
      try {
        const result = await Share.share({
          message: `${response.data.message} \n\n\n ${discription}`,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    } else {
      Toast.show('Please select duration and Add description');
    }
  };
  const daysData = [
    '1 hour',
    '2 hours',
    '3 hours',
    '5 hours',
    '12 hours',
    '1 day',
    '2 days',
    '3 days',
    '5 days',
    '7 days',
    '15 days',
  ];
  const Select = data => {
    if (data.includes('hour')) {
      let a = data;
      a = a.split(' ');
      setday(a[0]);
    } else {
      let a = data;
      a = a.split(' ');
      a = Number(a[0]) * 24;
      setday(a.toString());
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
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let fDateStart = new Date(currentDate);
    setCdate(formatDate(fDateStart.toString()));
    let fTimeStart = fDateStart.toLocaleTimeString().slice(0, 8);
    setCtime(fTimeStart);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };
  const showTimepicker = () => {
    showMode('time');
  };
  const SelectVehicle = (data, imei) => {
    setSelected(data);
    setImei(imei);
  };

  const getVehicle = async () => {
    const data = await Storage.getVehicleDetail('vehicle_detail');
    setdata(data);
  };
  useEffect(() => {
    getVehicle();
  }, []);
  return (
    <>
      <LinearGradient
        colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.header}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{paddingVertical: 15}}>
            <Image source={image.backArrow} style={{height: 12, width: 23}} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: Size.large,
              color: colors.white,
              paddingHorizontal: 15,
            }}>
            {__('URL Tracking')}
          </Text>
        </View>
      </LinearGradient>
      <View style={styles.subHeading}>
        <View style={styles.textinputbox}>
          <SelectDropdown
            buttonStyle={styles.picker}
            data={data}
            defaultButtonText={selected}
            onSelect={(selectedItem, index) => {
              setSelected(selectedItem.deviceId);
              SelectVehicle(selectedItem.deviceId, selectedItem.imei);
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
        </View>
      </View>
      <LinearGradient
        style={{height: '100%', paddingHorizontal: 16, paddingVertical: 10}}
        colors={[colors.Modalcolor1, colors.white]}>
        <View style={styles.body}>
          {/* <TouchableOpacity
            onPress={() => {
              showDatepicker(), setOpen(true);
            }}
            style={styles.bodyContent}>
            <TextInput
              editable={false}
              style={{fontSize: 16}}
              value={cdate}
              placeholder={'Select Date'}
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
              showTimepicker(), setOpen(true);
            }}
            style={styles.bodyContent}>
            <TextInput
              editable={false}
              placeholder={'Select Time'}
              style={{fontSize: 16}}
              value={ctime}
            />
            <MaterialIcons
              style={{
                color: '#3D3D3D',
                fontSize: 16,
              }}
              name={'keyboard-arrow-down'}
            />
          </TouchableOpacity>
          {show && (
            <DatePicker
              modal
              open={open}
              date={date}
              onConfirm={date => {
                onChangeStart(date);
                setOpen(false);
              }}
              mode={mode}
              onCancel={() => {
                setOpen(false);
              }}
            />
          )} */}
          <SelectDropdown
            buttonStyle={styles.picker}
            data={daysData}
            defaultButtonText={'Duration'}
            onSelect={(selectedItem, index) => {
              Select(selectedItem);
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={selectedItem => {
              return selectedItem;
            }}
            rowTextForSelection={item => {
              return item;
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
          <View style={styles.bodyContent}>
            <TextInput
              placeholder="Asset Description"
              value={discription}
              style={{
                backgroundColor: colors.white,
                width: '100%',
                borderRadius: 7,
                fontSize: 16,
              }}
              onChangeText={newText => setDiscription(newText)}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => sendUrl()} style={styles.footer}>
          <LinearGradient
            colors={[colors.largeBtn1, colors.largeBtn2]}
            style={styles.loginButton}>
            <Text style={styles.loginButtonText}>{__('Share URL')}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
};
export default UrlTracking;

// if (data === 'UrlTracking') {
//   const response = await axiosGetData(
//     `gettrackurl/${username}/${password}/${details.imei}/ecvalidate/24`,
//   );
//   try {
//     const result = await Share.share({
//       message: response.data.message,
//     });
//     if (result.action === Share.sharedAction) {
//       if (result.activityType) {
//         // shared with activity type of result.activityType
//       } else {
//         // shared
//       }
//     } else if (result.action === Share.dismissedAction) {
//       // dismissed
//     }
//   } catch (error) {
//     alert(error.message);
//   }
// } else
