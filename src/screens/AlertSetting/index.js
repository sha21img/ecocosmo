import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from 'react-native';
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
import Storage from '../../../Utils/Storage';

const AlertSetting = props => {
  const {details} = props.route.params;
  console.log('details.imei', details.imei);
  console.log('details for alert', details);
  const [daysset, setDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [shift, setShift] = useState({
    shift1From: '',
    shift1To: '',
    shift2From: '',
    shift2To: '',
  });
  const [newDetail, setNewDetail] = useState({
    push: details['push'] == 'Off' ? false : true,
    sms: details.sms == 'Off' ? false : true,
    email: details.email == 'Off' ? false : true,
    call: details.email == 'Off' ? false : true,
    days: details.days,
    isActive: details.isActive == 'No' ? false : true,
    anc: details.anc,
    data: details.data,
    mobiles: details.mobiles,
  });

  const handleDays = id => {
    // console.log(newDetail.days.includes(id));
    if (newDetail.days != '') {
      if (newDetail.days.includes(id)) {
        let a = newDetail.days.split(',').filter(el => {
          return el != id;
        });
        // console.log('>', a.join(','));
        setNewDetail({
          ...newDetail,
          days: a.join(','),
        });
      } else {
        let a = newDetail.days.split(',');
        a.push(id.toString());
        // console.log(a.join(','));
        setNewDetail({
          ...newDetail,
          days: a.join(','),
        });
      }
    } else
      setNewDetail({
        ...newDetail,
        days: id.toString(),
      });
  };

  let day = daysset.join(',');

  const alertSetting = [
    {
      id: 1,
      name: 'sms',
    },
    {
      id: 2,
      name: 'email',
    },
    {
      id: 3,
      name: 'push',
    },
    {
      id: 4,
      name: 'call',
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
  console.log(
    'props.routes.params.details',
    `${shift.shift1From},${shift.shift1To}`,
  );

  const postAlertResponse = async () => {
    const loginDetail = await Storage.getLoginDetail('login_detail');
    let username = loginDetail.accountId;
    let password = loginDetail.password;
    const params = {
      accountid: username,
      password: password,
      imei: details.imei,
      alertType: details.alertName,
      isactive: newDetail.isActive,
      data: newDetail.data,
      mobiles: newDetail.mobiles,
      isSms: newDetail.sms,
      isCall: newDetail.call,
      isEmail: newDetail.email,
      isPush: newDetail.push,
      isAnnouncement: newDetail.anc,
      days: newDetail.days,
      d1_on: 1,
      d1_off: 0,
      shift1_timeRange1: `${shift.shift1From},${shift.shift1To}`,
      shift2_timeRange1: `${shift.shift2From},${shift.shift2To}`,
    };
    setLoading(true);

    console.log('getegetteparams', params);

    const response = await axiosGetData(`saveVehicleAlert`, params);
    console.log('0987654432', response.data);
    //

    const paramss = {
      accountid: username,
      password: password,
      imei: details.imei,
    };
    const responses = await axiosGetData(`getAlertDetails`, paramss);
    console.log('alertData', responses.data.alert_details);
    //
    if (response.data.apiResult === 'success') {
      props.navigation.goBack();
      setLoading(false);
    } else {
      Toast.show(response.data.message);
      setLoading(false);
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
          <View style={styles.headerImageCont}>
            <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
              <Image source={image.drawer} style={{height: 20, width: 23}} />
            </TouchableOpacity>
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
        <Text style={styles.subHeaderText}>
          {__(details.alertName)}
           {/* {newDetail['isActive'] == false ? 'Off' : 'On'} */}
        </Text>
        {/* <Image source={image.selected} /> */}
        <CheckBox
          isChecked={newDetail['isActive'] == false ? false : true}
          checkBoxColor="skyblue"
          onClick={() => {
            setNewDetail({
              ...newDetail,
              ['isActive']: newDetail['isActive'] == false ? true : false,
            });
            // setIsActive(!isActive);
          }}
          // setState({ ...state, [event.target.name]: event.target.checked });
        />
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
                  isChecked={newDetail[el.name] == false ? false : true}
                  checkBoxColor="skyblue"
                  onClick={() => {
                    setNewDetail({
                      ...newDetail,
                      [el.name]: newDetail[el.name] == false ? true : false,
                    });
                    // setIsActive(!isActive);
                  }}
                  // setState({ ...state, [event.target.name]: event.target.checked });
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.bodyheading}>
          <Text style={styles.bodyHeadingText}>{__('Weekday')}</Text>
        </View>
        <View style={{marginTop: 5}}>
          {WeekDays.map((el, index) => {
            return (
              <TouchableOpacity
                key={el.id}
                style={styles.alertSettingContainer}
                onPress={() => handleDays(el.id)}>
                <Text style={styles.FooterText}>{el.days}</Text>
                <CheckBox
                  checkBoxColor="skyblue"
                  isChecked={
                    newDetail['days'].split(',').join('').includes(index)
                      ? true
                      : false
                  }
                  onClick={
                    () => handleDays(el.id)
                    // setNewDetail({
                    //   ...newDetail,
                    //   ['days']: newDetail['days'].split(',').join("").includes(index) ? newDetail['days'].split(',').splice(index,1).join(',') : newDetail['days'].split(',').push(index).join(','),
                    // })
                  }
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
              value={shift.shift1From}
              onChangeText={value => setShift({...shift, shift1From: value})}
              placeholder="From"
              placeholderTextColor={colors.toggleColorOff}
              style={styles.FooterInput}
            />
            <TextInput
              value={shift.shift1To}
              onChangeText={value => setShift({...shift, shift1To: value})}
              placeholder="To"
              placeholderTextColor={colors.toggleColorOff}
              style={styles.FooterInput}
            />
          </View>
          <View style={styles.FooterTextContainer}>
            <Text style={styles.FooterText}>{__('Shift 2')}</Text>
            <TextInput
              value={shift.shift2From}
              onChangeText={value => setShift({...shift, shift2From: value})}
              placeholder="From"
              placeholderTextColor={colors.toggleColorOff}
              style={styles.FooterInput}
            />
            <TextInput
              placeholder="To"
              value={shift.shift2To}
              onChangeText={value => setShift({...shift, shift2To: value})}
              placeholderTextColor={colors.toggleColorOff}
              style={styles.FooterInput}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => postAlertResponse()}>
          <LinearGradient
            colors={[colors.largeBtn1, colors.largeBtn2]}
            style={styles.loginButton}>
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.loginButtonText}>{__('Save')}</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};
export default AlertSetting;
// ?accountid=${accountid}
// &password=${password}&imei=${imei}&alertType=${alertType}
// &isactive=${newDetail.isActive}&data=${newDetail.data}&mobiles=${
//   newDetail.mobiles
// }
// &isSms=${newDetail.sms}&isCall=${newDetail.call}&isEmail=${
//   newDetail.email
// }
// &isPush=${newDetail.push}&isAnnouncement=${newDetail.anc}&days=${
//   newDetail.days
// }
// &d1_on=${d1_on}&d1_off=${d1_off}&shift1_timeRange1=${`${shift.shift1From},${shift.shift1To}`}
// &shift2_timeRange1=${`${shift.shift2From},${shift.shift2To}`}
