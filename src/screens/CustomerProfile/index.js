import axios from 'axios';
import React, {useEffect, useState, useRef} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  ActivityIndicator,
  TextInput,
  View,
  Linking,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
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
  const [AcountId, SetaccountId] = useState('');
  const [email, Setemail] = useState('');
  const [primaryMobile, SetprimaryMobile] = useState('');
  const [secMobile, SetsecMobile] = useState('');
  const [Address, SetAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [customerImage, setCustomerImage] = useState('');

  const [details, setDetails] = useState();

  const contactUsDetails = async () => {
    const succcess = await Storage.getLoginDetail('login_detail');
    console.log('0000', succcess);
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    const response = await axiosGetData(
      `getAccountDetails/${username}/${encodedPassWord}`,
    );
    console.log(
      'response.data.getAccountDetails',
      response.data.getAccountDetails,
    );
    SetaccountId(response.data.getAccountDetails.accountId);
    Setemail(response.data.getAccountDetails.email);
    SetprimaryMobile(response.data.getAccountDetails.mobile);
    SetsecMobile(response.data.getAccountDetails.secondaryMobile);
    SetAddress(response.data.getAccountDetails.address);
  };
  useEffect(() => {
    contactUsDetails();
  }, []);
  const input1 = useRef(null);
  const handleSave = async () => {
    const loginDetail = await Storage.getLoginDetail('login_detail');
    let username = loginDetail.accountId;
    let password = loginDetail.password;
    setLoading(true);
    const response = await axiosGetData(
      `editAccountDetails/${username}/${password}/${AcountId}/${primaryMobile}/${secMobile}/${email}/${Address}`,
    );
    if (response.data.apiResult === 'success') {
      setLoading(false);
    } else {
      Toast.show(response.data.message);
      setLoading(false);
    }
  };
  const calling = () => {
    Linking.openURL(`tel:${primaryMobile}`);
  };

  const focusOn = ref => {
    console.log('balle ballle');
    setTimeout(() => ref?.current?.focus(), 1000);
  };
  // const uploadEventsImages=()=>{
  //   var data = new FormData();
  //   data.append('sendimage', {
  //     uri: imagePath, // your file path string
  //     name: 'my_photo.jpg',
  //     type: 'image/jpg',
  //   });
  // }

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
            <TouchableOpacity
              style={styles.editContainer}
              onPress={() => {
                setIsEditable(true);
                focusOn(input1);
              }}>
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
            <View
              style={{
                resizeMode: 'contain',
                position: 'absolute',
                zIndex: 99,
                top: -50,
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                style={{
                  borderRadius: 50,
                  backgroundColor: 'green',
                }}
                onPress={() => {
                  ImagePicker.openPicker({
                    width: 300,
                    height: 400,
                    cropping: true,
                  }).then(imag => {
                    console.log('sasa', imag);
                    // uploadEventsImages(imag.path);
                    // const newImage = [...image, imag.path];
                    setCustomerImage(imag.path);
                  });
                }}>
                {customerImage != '' ? (
                  <Image
                    source={{uri: customerImage}}
                    style={styles.userImage}
                  />
                ) : (
                  <Image source={image.taxtDriver} style={styles.userImage} />
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.subHead}>{details?.brandName}</Text>
            <TouchableOpacity
              style={styles.subButton}
              onPress={() => calling()}>
              <Image source={image.callWhite} />
              <Text style={styles.subButtonText}>+91 - {primaryMobile}</Text>
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
                    ref={input1}
                    editable={isEditable}
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
                    // editable={isEditable}
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
                    // editable={isEditable}
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
                    // editable={isEditable}
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
                    // editable={isEditable}
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
