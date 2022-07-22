import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';
import {image} from '../../../assets/images';
import {__} from '../../../Utils/Translation/translation';
import {styles} from './style';
import ToggleSwitch from 'toggle-switch-react-native';

function Setting() {
  const [Ison, setIson] = useState(true);
  return (
    <LinearGradient
      colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
      style={styles.header}>
      <View style={styles.headerContainer}>
        <View style={styles.headerImageCont}>
          <Image source={image.drawer} style={{height: 20, width: 23}} />
          <Text
            style={{
              fontSize: Size.large,
              color: colors.white,
            }}>
            {__('Settings')}
          </Text>
        </View>
      </View>
      <View style={styles.BodyContent}>
        <View
          style={{
            flexDirection: 'row',
            width: '60%',
          }}>
          <View style={{width: 24}}>
            <Image
              source={image.colouredLock}
              style={{width: 13, height: 18}}
            />
          </View>
          <Text style={styles.BodyContentText}>{__('Change Password')}</Text>
        </View>
        <Image source={image.right} />
      </View>
      <View style={styles.BodyContent}>
        <View
          style={{
            flexDirection: 'row',
            width: '60%',
          }}>
          <View style={{width: 24}}>
            <Image source={image.fileRefresh} />
          </View>
          <Text style={styles.BodyContentText}>{__('Renewal Details')}</Text>
        </View>
        <Image source={image.right} />
      </View>
      <View style={styles.BodyContent}>
        <View
          style={{
            flexDirection: 'row',
            width: '60%',
          }}>
          <View style={{width: 24}}>
            <Image source={image.Petrol} style={{width: 13, height: 18}} />
          </View>
          <Text style={styles.BodyContentText}>{__('Notification')}</Text>
        </View>
        <ToggleSwitch
          isOn={Ison}
          onColor={colors.toggleColoron}
          offColor={colors.toggleColorOff}
          size="large"
          onToggle={() => setIson(!Ison)}
        />
      </View>
      <LinearGradient
        colors={[colors.subGradientcolour1, colors.subGradientcolour2]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        locations={[0.5, 1.5]}
        style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>{__('Logout')}</Text>
      </LinearGradient>
    </LinearGradient>
  );
}

export default Setting;