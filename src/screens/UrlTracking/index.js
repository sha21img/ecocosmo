import React, {useState} from 'react';
import {
  Image,
  Text,
  View,
  Share,
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

const UrlTracking = props => {
  const {details} = props.route.params;
  console.log('props props', details);
  const [mydate, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [day, setday] = useState();

  const changeSelectedDate = (event, selectedDate) => {
    const currentDate = selectedDate || mydate;
    setDate(currentDate);
    setShow(false);
  };
  const changeSelectedTime = (event, selectedDate) => {
    const currentDate = selectedDate || mydate;
    setDate(currentDate);
    setShow(false);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const displayDatepicker = value => {
    showMode(value);
  };
  const sendUrl = async () => {
    const succcess = await Storage.getLoginDetail('login_detail');
    let username = succcess.accountId;
    let password = succcess.password;
    const response = await axiosGetData(
      `gettrackurl/${username}/${password}/${
        details.imei
      }/ecvalidate/${day.toString()}`,
    );
    try {
      const result = await Share.share({
        message: response.data.message,
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
        <View style={styles.subHeadingContent}>
          <Text style={{fontSize: Size.compact, color: colors.black}}>
            {__('All Vehicle')}
          </Text>
          <Image source={image.Down} style={{width: 11, height: 6}} />
        </View>
      </View>
      <LinearGradient
        style={{height: '100%', paddingHorizontal: 16, paddingVertical: 10}}
        colors={[colors.Modalcolor1, colors.white]}>
        <View style={styles.body}>
          <TouchableOpacity
            // onPress={() => displayDatepicker('date')}
            style={styles.bodyContent}>
            <Text style={{fontSize: Size.large, color: colors.textcolor}}>
              {__('Select Date')}
              {/* {date} */}
            </Text>
            <Image source={image.Down} style={{width: 11, height: 6}} />
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => displayDatepicker('time')}
            style={styles.bodyContent}>
            <Text style={{fontSize: Size.large, color: colors.textcolor}}>
              {__('Select Time')}
            </Text>
            <Image source={image.Down} style={{width: 11, height: 6}} />
          </TouchableOpacity>
          <View style={styles.bodyContent}>
            <SelectDropdown
              buttonStyle={{
                width: '100%',
              }}
              data={daysData}
              defaultButtonText={'Duration'}
              onSelect={(selectedItem, index) => {
                // setSelected(selectedItem.deviceId);
                Select(selectedItem);
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={selectedItem => {
                return selectedItem;
              }}
              rowTextForSelection={item => {
                return item;
              }}
            />
          </View>
          <View style={styles.bodyContent}>
            <Text style={{fontSize: Size.large, color: colors.grey}}>
              {__('Asset Description')}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => sendUrl()} style={styles.footer}>
          <LinearGradient
            colors={[colors.largeBtn1, colors.largeBtn2]}
            style={styles.loginButton}>
            <Text style={styles.loginButtonText}>{__('Share URL')}</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={mydate}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={changeSelectedDate}
          />
        )} */}
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
