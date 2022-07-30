import React from 'react';
import {Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';
import {image} from '../../../assets/images';
import { baseUrl } from '../../../Utils/ApiController';
import {__} from '../../../Utils/Translation/translation';
import {styles} from './style';

const AboutUs = props => {
  return (
    <>
      <LinearGradient
        colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
        style={styles.main}
        locations={[0, 0.9]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
            <Image source={image.drawer} style={{height: 23, width: 23}} />
          </TouchableOpacity>
          <Text style={styles.headerContentText}>{__('About Us')}</Text>
        </View>
        <LinearGradient
          colors={[colors.Modalcolor1, colors.white]}
          style={styles.ContentBody}>
          <View style={styles.ContentSubBody}>
            <Image
              source={{uri: `${baseUrl}/download/appOwnerLogo`}}
              style={{width: '80%', height: 150, resizeMode: 'contain'}}
            />
            <Text style={styles.ContentBodyhead}>{__('SERVICE PARTNER')}</Text>
            <Text style={styles.ContentBodyhead2}>
              {__('Fleet Projects PVT. Ltd.')}
            </Text>
            <Text style={styles.ContentBodyhead3}>
              {__('Version FP-v7.0.03')}
            </Text>
          </View>
          <View style={{height: '5%', alignSelf: 'center'}}>
            <Text style={styles.footer}>
              {__('Copyright 2022. All Rights Reserved')}
            </Text>
          </View>
        </LinearGradient>
      </LinearGradient>
    </>
  );
};
export default AboutUs;
