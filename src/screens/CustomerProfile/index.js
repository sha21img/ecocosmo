import axios from 'axios';
import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
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

const CustomerProfile = () => {
  const [AcountId, SetaccountId] = useState('rrenterprises');
  const [email, Setemail] = useState('sales@ecocosmogps.com');
  const [primaryMobile, SetprimaryMobile] = useState('7875551271');
  const [secMobile, SetsecMobile] = useState('9766918883');
  const [Address, SetAddress] = useState('XYZ');

  const handleSave = async () => {
    const response = await axiosGetData(
      `updateprofile?accountid=${AcountId}&password=b4e82dac5f70e501df1fde474d8c3aa6&acname=rrenterprises&description=${Address}&mobile=${primaryMobile}&email=${email}&secondaryMobile=${secMobile}`,
    );
    console.log('**************', response.data);
  };

  return (
    <>
      <LinearGradient
        colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
        style={{flex: 1}}>
        <ImageBackground source={image.LoginBackground} style={[styles.head]}>
          <View style={styles.headContainer}>
            <View style={[styles.headContainer, styles.headsubContainerWidth]}>
              <Image source={image.drawer} style={{height: 20, width: 22}} />
              <Text style={styles.headerText}>{__('My Account')}</Text>
            </View>
            <TouchableOpacity style={styles.editContainer}>
              <Text style={styles.editText}>{__('🖊 Edit')}</Text>
            </TouchableOpacity>
          </View>
          <LinearGradient
            style={styles.FormContainer}
            colors={[colors.Modalcolor1, colors.white]}>
            <Image source={image.taxtDriver} style={styles.userImage} />
            <Text style={styles.subHead}>{__('Fleet Projects PVT. Ltd.')}</Text>
            <TouchableOpacity style={styles.subButton}>
              <Image source={image.callWhite} />
              <Text style={styles.subButtonText}>{__('+91 - 123456789')}</Text>
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
                    placeholder="Account ID"
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
                    placeholder="Email ID"
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
                    placeholder="Primary Mobile Number"
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
                    placeholder="Secondary Mobile Number"
                    defaultValue={secMobile}
                    onChangeText={newText => SetsecMobile(newText)}
                  />
                </View>
                <Text style={styles.textFieldHeading}>{__('Address *')}</Text>
                <View style={styles.TextFieldSubContainer}>
                  <Image
                    source={image.madalImage1}
                    style={{width: 15, height: 15}}
                  />
                  <TextInput
                    style={styles.textField}
                    placeholder="Address"
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
                    <Text style={styles.loginButtonText}>{__('Save')}</Text>
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
