import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';
import {image} from '../../../assets/images';
import {styles} from './style';
import CheckBox from 'react-native-check-box';
import {__} from '../../../Utils/Translation/translation';
import {ScrollView} from 'react-native-gesture-handler';
import {axiosGetData} from '../../../Utils/ApiController';
import Toast from 'react-native-simple-toast';

const AlertSetting = () => {
  const [daysset, setDays] = useState([]);

  const handleDays = id => {
    console.log(id);
    if (daysset.includes(id)) {
      let a = daysset.filter(el => {
        return el != id;
      });
      setDays(a);
    } else {
      setDays([...daysset, id]);
    }
  };

  let day = daysset.join(',');

  const accountid = 'rrenterprises';
  const password = '25f9e794323b453885f5181f1b624d0b';
  const imei = '351608080774446';
  const alertType = 'overspeed';
  const data = 90;
  const isactive = 'Yes';
  const mobiles = '7719932222';
  const isSms = 1;
  const isCall = 0;
  const isEmail = 0;
  const isPush = 1;
  const isAnnouncement = 0;
  const days = day;
  const d1_on = 1;
  const d1_off = 0;
  const shift1_timeRange1 = '07:00,18:00';
  const shift2_timeRange1 = '19:00,20:00';
  const alertSetting = [
    {
      id: 1,
      name: 'SMS',
    },
    {
      id: 2,
      name: 'Email',
    },
    {
      id: 3,
      name: 'Push',
    },
  ];
  const WeekDays = [
    {
      id: 0,
      days: 'Sunday',
    },
    {
      id: 1,
      days: 'Monday',
    },
    {
      id: 2,
      days: 'Tuesday',
    },
    {
      id: 3,
      days: 'Wednesday',
    },
    {
      id: 4,
      days: 'Thursday',
    },
    {
      id: 5,
      days: 'Friday',
    },
    {
      id: 6,
      days: 'Saturday',
    },
  ];

  const postAlertResponse = async () => {
    const response = await axiosGetData(
      `saveVehicleAlert?accountid=${accountid}&password=${password}&imei=${imei}&alertType=${alertType}&isactive=${isactive}&data=${data}&mobiles=${mobiles}&isSms=${isSms}&isCall=${isCall}&isEmail=${isEmail}&isPush=${isPush}&isAnnouncement=${isAnnouncement}&days=${days}&d1_on=${d1_on}&d1_off=${d1_off}&shift1_timeRange1=${shift1_timeRange1}&shift2_timeRange1=${shift2_timeRange1}`,
    );
    if (response.data.apiResult === 'error') {
      Toast.show(__(`${response.data.message}`));
    }
    console.log(response.data);
  };

  // console.log('>>>>>>>>days', day);
  return (
    <>
      <LinearGradient
        colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.header}>
        <View style={styles.headerContainer}>
          <View style={styles.headerImageCont}>
            <Image source={image.drawer} style={{height: 20, width: 23}} />
            <Text
              style={{
                fontSize: Size.large,
                color: colors.white,
              }}>
              {__('Alerts')}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image source={image.search} />
          </View>
        </View>
      </LinearGradient>
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>{__('Ignition OFF')}</Text>
        <Image source={image.selected} />
      </View>
      <ScrollView>
        <View style={styles.bodyheading}>
          <Text style={styles.bodyHeadingText}>{__('Alert Setting')}</Text>
        </View>
        <View style={{marginTop: 5}}>
          {alertSetting.map(el => {
            return (
              <TouchableOpacity
                key={el.id}
                style={styles.alertSettingContainer}>
                <Text style={styles.FooterText}>{el.name}</Text>
                <CheckBox
                  isChecked={false}
                  checkBoxColor="skyblue"
                  onClick={e => console.log(e)}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.bodyheading}>
          <Text style={styles.bodyHeadingText}>{__('Weekday')}</Text>
        </View>
        <View style={{marginTop: 5}}>
          {WeekDays.map(el => {
            return (
              <TouchableOpacity
                key={el.id}
                style={styles.alertSettingContainer}
                onPress={() => handleDays(el.id)}>
                <Text style={styles.FooterText}>{el.days}</Text>
                <CheckBox
                  checkBoxColor="skyblue"
                  isChecked={days.includes(el.id) ? true : false}
                  onClick={e => console.log(e)}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.bodyheading}>
          <Text style={styles.bodyHeadingText}>{__('Time Range')}</Text>
        </View>
        <View style={styles.Footer}>
          <View style={styles.FooterTextContainer}>
            <Text style={styles.FooterText}>{__('Shift 1')}</Text>
            <TextInput
              placeholder="From"
              placeholderTextColor={colors.toggleColorOff}
              style={styles.FooterInput}
            />
            <TextInput
              placeholder="To"
              placeholderTextColor={colors.toggleColorOff}
              style={styles.FooterInput}
            />
          </View>
          <View style={styles.FooterTextContainer}>
            <Text style={styles.FooterText}>{__('Shift 1')}</Text>
            <TextInput
              placeholder="From"
              placeholderTextColor={colors.toggleColorOff}
              style={styles.FooterInput}
            />
            <TextInput
              placeholder="To"
              placeholderTextColor={colors.toggleColorOff}
              style={styles.FooterInput}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => postAlertResponse()}>
          <LinearGradient
            colors={[colors.largeBtn1, colors.largeBtn2]}
            style={styles.loginButton}>
            <Text style={styles.loginButtonText}>{__('Login')}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};
export default AlertSetting;
