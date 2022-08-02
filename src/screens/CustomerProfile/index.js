import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  ActivityIndicator,
  TextInput,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {image} from '../../../assets/images';
import {axiosGetData} from '../../../Utils/ApiController';
import {__} from '../../../Utils/Translation/translation';
import {styles} from './style';
import Toast from 'react-native-simple-toast';
import Entypo from 'react-native-vector-icons/Entypo';
import Storage from '../../../Utils/Storage';

const CustomerProfile = props => {
  const [AcountId, SetaccountId] = useState('rrenterprises');
  const [email, Setemail] = useState('sales@ecocosmogps.com');
  const [primaryMobile, SetprimaryMobile] = useState('7875551271');
  const [secMobile, SetsecMobile] = useState('9766918883');
  const [Address, SetAddress] = useState(
    '177 New Apollo Indl Estate Mogra Lane Andheri,Mumbai,Bharuch, 400069,India',
  );
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState();

  const contactUsDetails = async () => {
    const succcess = await Storage.getLoginDetail('login_detail');
    console.log('0000', succcess);
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    const response = await axiosGetData(
      `account/${username}/${encodedPassWord}`,
    );

    setDetails(response.data);
    console.log('>>>>>>>', details);
  };

  useEffect(() => {
    contactUsDetails();
  }, []);
  const handleSave = async () => {
    setLoading(true);
    const response = await axiosGetData(
      `updateprofile?accountid=${AcountId}&password=25f9e794323b453885f5181f1b624d0b&acname=rrenterprises&description=${Address}&mobile=${primaryMobile}&email=${email}&secondaryMobile=${secMobile}`,
    );
    if (response.data.apiResult === 'success') {
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
        style={{flex: 1}}>
        <ImageBackground source={image.LoginBackground} style={[styles.head]}>
          <View style={styles.headContainer}>
            <View style={styles.headContainer}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.openDrawer();
                }}>
                <Image source={image.drawer} style={{height: 20, width: 22}} />
              </TouchableOpacity>
              <Text style={styles.headerText}>{__('My Account')}</Text>
            </View>
            <TouchableOpacity style={styles.editContainer}>
              <Entypo
                style={{
                  color: '#fff',
                  fontSize: 10,
                  alignSelf: 'center',
                  marginHorizontal: 2,
                }}
                name={'edit'}
              />
              <Text style={styles.editText}>{__('Edit')}</Text>
            </TouchableOpacity>
          </View>
          <LinearGradient
            style={styles.FormContainer}
            colors={[colors.Modalcolor1, colors.white]}>
            <Image source={image.taxtDriver} style={styles.userImage} />
            <Text style={styles.subHead}>{details?.brandName}</Text>
            <TouchableOpacity style={styles.subButton}>
              <Image source={image.callWhite} />
              <Text style={styles.subButtonText}>+91 - 123456789</Text>
            </TouchableOpacity>
            <ScrollView style={{marginVertical: 16}}>
              <View style={styles.TextFieldContainer}>
                <Text style={styles.textFieldHeading}>{__('Account ID')}</Text>
                <View style={styles.TextFieldSubContainer}>
                  <Image
                    source={image.ColourPerson}
                    style={{width: 15, height: 14}}
                  />
                  <TextInput
                    style={styles.textField}
                    placeholder={__('Account ID')}
                    defaultValue={AcountId}
                    onChangeText={newText => SetaccountId(newText)}
                  />
                </View>
                <Text style={styles.textFieldHeading}>{__('Email ID')}</Text>
                <View style={styles.TextFieldSubContainer}>
                  <Image
                    source={image.ColourPerson}
                    style={{width: 15, height: 14}}
                  />
                  <TextInput
                    style={styles.textField}
                    placeholder={__('Email ID')}
                    defaultValue={email}
                    onChangeText={newText => Setemail(newText)}
                  />
                </View>
                <Text style={styles.textFieldHeading}>
                  {__('Primary Mobile Number *')}
                </Text>
                <View style={styles.TextFieldSubContainer}>
                  <Image source={image.Phone} style={{width: 15, height: 14}} />
                  <TextInput
                    style={styles.textField}
                    placeholder={__('Primary Mobile Number *')}
                    defaultValue={primaryMobile}
                    onChangeText={newText => SetprimaryMobile(newText)}
                  />
                </View>
                <Text style={styles.textFieldHeading}>
                  {__('Secondary Mobile Number *')}
                </Text>
                <View style={styles.TextFieldSubContainer}>
                  <Image source={image.Phone} style={{width: 15, height: 14}} />
                  <TextInput
                    style={styles.textField}
                    placeholder={__('Secondary Mobile Number *')}
                    defaultValue={secMobile}
                    onChangeText={newText => SetsecMobile(newText)}
                  />
                </View>
                <Text style={styles.textFieldHeading}>{__('Address *')}</Text>
                <View style={styles.TextFieldAddress}>
                  <Image
                    source={image.madalImage1}
                    style={{width: 15, height: 15}}
                  />
                  <TextInput
                    style={styles.textFieldAddress}
                    placeholder={__('Address *')}
                    numberOfLines={3}
                    multiline={true}
                    defaultValue={Address}
                    onChangeText={newText => SetAddress(newText)}
                  />
                </View>
                <TouchableOpacity onPress={handleSave}>
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
              </View>
            </ScrollView>
          </LinearGradient>
        </ImageBackground>
        <View style={{flex: 0.15}}></View>
      </LinearGradient>
    </>
  );
};
export default CustomerProfile;
