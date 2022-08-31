import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {image} from '../../../assets/images';
import {styles} from './style';
import {__} from '../../../Utils/Translation/translation';
import Toast from 'react-native-simple-toast';
import {Size} from '../../../assets/fonts/Fonts';
import {axiosGetData} from '../../../Utils/ApiController';
import Storage from '../../../Utils/Storage';
import {useNavigation} from '@react-navigation/native';

const AddDriver = props => {
  console.log('this is props', props.details);
  const IMEI = props?.details?.imei;
  const navigation = useNavigation();
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const saveNumber = () => {
    if (number != '' && number.length == 10 && name.length > 2) {
      getDriver();
    } else {
      Toast.show('All field are mandatory and number should be 10 degit');
    }
  };
  const getDriver = async () => {
    const succcess = await Storage.getLoginDetail('login_detail');
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    const response = await axiosGetData(
      `getDriverDetails/${username}/${encodedPassWord}`,
    );
    const driverDetails = response.data.driverDetails;
    const filterData = driverDetails.filter(item => {
      return item.mobilenumber == number;
    });
    if (filterData.length > 0) {
      Toast.show('The Driver name and mobile number are already existing.');
    } else {
      postNumber();
    }
  };
  const postNumber = async () => {
    const succcess = await Storage.getLoginDetail('login_detail');
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    const response = await axiosGetData(
      `setDriverDetails/${username}/${encodedPassWord}/${IMEI}/${name}/${number}/adhar/10/12`,
    );
    console.log('response', response.data);
    if (response.data.apiResult == 'success') {
      Toast.show(response.data.msg);
      navigation.navigate('HomeStack');
      props.setVisible(false);
      setNumber('');
      setName('');
      console.log(navigation, 'navigation');
    }
  };

  const getDetail = async () => {
    const succcess = await Storage.getLoginDetail('login_detail');
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    const response = await axiosGetData(
      `getDriverDetails/${username}/${encodedPassWord}`,
    );
    const driverDetails = response.data.driverDetails;
    const data = driverDetails.filter((el)=>{
      return (el.imei == IMEI)
    })
    setName(data[0]?.driverName)
    setNumber(data[0]?.mobilenumber)
    console.log('..........>>>>>', data)
}
useEffect(()=>{getDetail()},[props])

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => props.setVisible(false)}>
        <View style={styles.mainContainer}>
          <LinearGradient
            colors={[colors.Modalcolor1, colors.white]}
            style={styles.modalBody}>
            <Image source={image.bigtastdriver} style={styles.modaldrager} />
            <View
              style={{
                heigth: 66,
                backgroundColor: colors.white,
                marginTop: 108,
                width: '92%',
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 15,
              }}>
              <Image
                source={image.taxtDriver}
                style={{height: 17, width: 17, marginRight: 12}}
              />
              <TextInput
                placeholder="Driver name"
                style={{height: 66, width: '90%', fontSize: Size.large}}
                value={name}
                onChangeText={newText => setName(newText)}
              />
            </View>
            <View
              style={{
                heigth: 66,
                backgroundColor: colors.white,
                marginTop: 10,
                width: '92%',
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 15,
              }}>
              <Image source={image.greyCall} style={{height: 17, width: 17}} />
              {/* <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: colors.black, fontSize: Size.large}}>
                  +91
                </Text>
                <Image source={image.Down} style={{height: 7, width: 12}} />
              </TouchableOpacity> */}
              <TextInput
                style={{
                  height: 66,
                  width: '72%',
                  fontSize: Size.large,
                  marginLeft: 10,
                }}
                placeholder={__('Mobile Number')}
                keyboardType="numeric"
                value={number}
                onChangeText={newText => setNumber(newText)}
              />
            </View>
            <TouchableOpacity
              onPress={() => saveNumber()}
              style={{width: '100%'}}>
              <LinearGradient
                colors={[colors.largeBtn1, colors.largeBtn2]}
                style={styles.loginButton}>
                <Text style={styles.loginButtonText}>{__('Save')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>
    </>
  );
};

export default AddDriver;
