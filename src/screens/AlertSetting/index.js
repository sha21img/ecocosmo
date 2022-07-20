import React from 'react';
import {Image, Text, TextInput, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';
import {image} from '../../../assets/images';
import {styles} from './style';
import CheckBox from 'react-native-check-box';
import {__} from '../../../Utils/Translation/translation';
import {ScrollView} from 'react-native-gesture-handler';

const AlertSetting = () => {
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
      id: 1,
      days: 'Sunday',
    },
    {
      id: 2,
      days: 'Monday',
    },
    {
      id: 3,
      days: 'Tuesday',
    },
    {
      id: 4,
      days: 'Wednesday',
    },
    {
      id: 5,
      days: 'Thursday',
    },
    {
      id: 6,
      days: 'Friday',
    },
    {
      id: 7,
      days: 'Saturday',
    },
  ];
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
              <View key={el.id} style={styles.alertSettingContainer}>
                <Text style={styles.FooterText}>{el.name}</Text>
                <CheckBox
                  checkBoxColor="skyblue"
                  isChecked={false}
                  onClick={e => console.log(e)}
                />
              </View>
            );
          })}
        </View>
        <View style={styles.bodyheading}>
          <Text style={styles.bodyHeadingText}>{__('Weekday')}</Text>
        </View>
        <View style={{marginTop: 5}}>
          {WeekDays.map(el => {
            return (
              <View key={el.id} style={styles.alertSettingContainer}>
                <Text style={styles.FooterText}>{el.days}</Text>
                <CheckBox
                  checkBoxColor="skyblue"
                  isChecked={false}
                  onClick={e => console.log(e)}
                />
              </View>
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
        <LinearGradient
          colors={[colors.largeBtn1, colors.largeBtn2]}
          style={styles.loginButton}>
          <Text style={styles.loginButtonText}>{__('Login')}</Text>
        </LinearGradient>
      </ScrollView>
    </>
  );
};
export default AlertSetting;
