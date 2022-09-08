import React, {useState, useEffect} from 'react';
import {__} from '../../../Utils/Translation/translation';
import {
  Image,
  ActivityIndicator,
  Text,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';
import {image} from '../../../assets/images';
import {styles} from './style';
import Storage from '../../../Utils/Storage';
import {CheckBox} from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import RazorpayCheckout from 'react-native-razorpay';
import {axiosGetData, baseUrl} from '../../../Utils/ApiController';

const Renewal = props => {
  const [renewalData, setRenewalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [multiSelect, setMultiSelect] = useState('');
  const [loginDetails, setLoginDetails] = useState({});

  useEffect(() => {
    getRenewal();
  }, []);
  const getRenewal = async () => {
    setLoading(true);
    const loginDetail = await Storage.getLoginDetail('login_detail');
    let username = loginDetail.accountId;
    let password = loginDetail.password;
    setLoginDetails(loginDetail);
    const response = await axiosGetData(`renewal/${username}/${password}`);
    setRenewalData(response.data.renewal);
    setLoading(false);
  };
  const checking = imei => {
    if (multiSelect != '') {
      if (multiSelect.includes(imei)) {
        const join = multiSelect.split(',');
        const filter = join.filter(item => {
          return item != imei;
        });
        const convert = filter.toString();
        setMultiSelect(convert);
      } else {
        const comma = multiSelect.concat(',', imei.toString());
        setMultiSelect(comma);
      }
    } else {
      setMultiSelect(imei.toString());
    }
  };

  const openRazorpay = async id => {
    let options = {
      description: 'Credits towards consultation',
      currency: 'INR',
      key: 'rzp_test_E4WD45E4lmp4OM', // Your api key
      amount:
        renewalData[0].renewalAmount * 100 +
        (renewalData[0].renewalAmount * 100 * 18) / 100,
      name: 'Eco-cosmo',
      prefill: {
        email: loginDetails.email,
        contact: loginDetails.mobile,
        name: loginDetails.accountName,
      },
      theme: {color: '#004daa'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        console.log('data', data);
        Alert.alert(`Success : ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        if (error.code == '0') {
          Alert.alert(`Error : ${error?.error?.description}`);
        } else {
          Alert.alert(`Error : ${error?.description}`);
        }
        console.log('error', error);
      });
  };
  const makePayment = async () => {
    const response = await axiosGetData(
      `renewalInitiate/${loginDetails.accountId}/${loginDetails.password}/${multiSelect}`,
    );
    if (response.data.renewalInitiate.status == 'success') {
      const id = response.data.renewalInitiate.id;
      openRazorpay(id);
    } else {
      Toast.show(response.data.message);
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
          <TouchableOpacity
            style={{paddingVertical: 10}}
            onPress={() => props.navigation.goBack()}>
            <Image source={image.backArrow} style={{height: 12, width: 23}} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: Size.large,
              color: colors.white,
            }}>
            {__('Renewals')}
          </Text>
        </View>
      </LinearGradient>
      <LinearGradient
        style={{height: '100%', paddingHorizontal: 16, paddingVertical: 15}}
        colors={[colors.Modalcolor1, colors.white]}>
        {loading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator color={colors.black} />
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {renewalData?.map(el => {
              return (
                <View key={Math.random()} style={styles.Card}>
                  <Image
                    source={image.whiteCar}
                    style={{height: 44, width: 19, marginRight: 10}}
                  />
                  <View style={{width: '80%'}}>
                    <Text
                      style={{
                        fontSize: Size.extraLarge,
                        color: colors.black,
                        marginBottom: 3,
                      }}>
                      {el.deviceId}
                    </Text>
                    <Text
                      style={{
                        fontSize: Size.small,
                        color: colors.grey,
                        marginBottom: 3,
                      }}>
                      {__('Expiry Date')}: {el.expiryDate}
                    </Text>
                    <Text
                      style={{
                        fontSize: Size.small,
                        color: colors.grey,
                        marginBottom: 3,
                      }}>
                      {__('Days Remaining')}: {el.daysRemaining}
                    </Text>
                    <Text
                      style={{
                        fontSize: Size.small,
                        color: colors.grey,
                        marginBottom: 3,
                      }}>
                      {__('Amount')}:
                      <Text style={{color: colors.black, fontWeight: 'bold'}}>
                        {' '}
                        ₹{el.renewalAmount}
                      </Text>
                    </Text>
                  </View>
                  <CheckBox
                    uncheckedIcon={
                      <AntDesign
                        style={{
                          color: '#395dbf',
                          fontSize: 26,
                        }}
                        name={'checkcircle'}
                      />
                    }
                    checkedIcon={
                      <AntDesign
                        style={{
                          color: '#d9d9d9',
                          fontSize: 26,
                        }}
                        name={'checkcircle'}
                      />
                    }
                    checked={multiSelect.includes(el.imei) ? false : true}
                    onPress={() => checking(el.imei)}
                  />
                </View>
              );
            })}
            <TouchableOpacity
              onPress={() => {
                if (multiSelect == '') {
                  Toast.show('Please Select Vehicle');
                } else {
                  makePayment();
                }
              }}>
              <LinearGradient
                colors={[colors.largeBtn1, colors.largeBtn2]}
                style={styles.loginButton}>
                <Text style={styles.loginButtonText}>
                  {__('Proceed to Payment')}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        )}
      </LinearGradient>
    </>
  );
};
export default Renewal;
