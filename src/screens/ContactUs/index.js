import React, {useEffect, useState} from 'react';
import {Image, Text, ActivityIndicator, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {image} from '../../../assets/images';
import {axiosGetData} from '../../../Utils/ApiController';
import {__} from '../../../Utils/Translation/translation';
import {styles} from './style';

const ContactUs = props => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState();

  const contactUsDetails = async () => {
    const response = await axiosGetData(`loginScreenCompanyDetails`);
    setDetails(response.data);
    // if (response.data.apiResult === 'error') {
    //   // Toast.show(__(`${response.data.message}`));
    // }
  };

  useEffect(() => {
    contactUsDetails();
  }, []);

  return (
    <>
      {/* <ActivityIndicator color={colors.white} /> */}
      <LinearGradient
        colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
        style={styles.main}
        locations={[0, 0.9]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
            <Image source={image.drawer} style={{height: 23, width: 23}} />
          </TouchableOpacity>
          <Text style={styles.headerContentText}>{__('Contact Us')}</Text>
        </View>
        <View style={styles.BodyContent}>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              alignItems: 'center',
            }}>
            <View style={{width: 45}}>
              <Image source={image.EmailOpen} style={{height: 41, width: 45}} />
            </View>
            <View style={{marginLeft: 13}}>
              <Text style={styles.BodyContentText}>{__('Email Address')}</Text>
              <Text style={styles.BodyContentSubText}>
                sales@ecocosmogps.com
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.BodyContent}>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              alignItems: 'center',
            }}>
            <View style={{width: 45}}>
              <Image source={image.world} style={{height: 37, width: 37}} />
            </View>
            <View style={{marginLeft: 13}}>
              <Text style={styles.BodyContentText}>{__('Website')}</Text>
              <Text style={styles.BodyContentSubText}>www.ecocosmogps.com</Text>
            </View>
          </View>
        </View>
        <View style={styles.BodyContent}>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              alignItems: 'center',
            }}>
            <View style={{width: 45}}>
              <Image source={image.telephone} style={{height: 37, width: 37}} />
            </View>
            <View style={{marginLeft: 13}}>
              <Text style={styles.BodyContentText}>
                {__('Technical support')}
              </Text>
              <Text style={styles.BodyContentSubText}>(+91) 7719932222</Text>
            </View>
          </View>
        </View>
        <View style={styles.BodyContent}>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              alignItems: 'center',
            }}>
            <View style={{width: 45}}>
              <Image
                source={image.incomingCall}
                style={{height: 38, width: 37}}
              />
            </View>
            <View style={{marginLeft: 13}}>
              <Text style={styles.BodyContentText}>{__('Sales')}</Text>
              <Text style={styles.BodyContentSubText}>(+91) 9130062233</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

export default ContactUs;
