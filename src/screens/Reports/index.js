import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {image} from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import {__} from '../../../Utils/Translation/translation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalSelector from 'react-native-modal-selector';
import {color} from 'react-native-reanimated';
import colors from '../../../assets/Colors';
import Moment from 'moment';
import {Size} from '../../../assets/fonts/Fonts';
import Storage from '../../../Utils/Storage';
import {axiosGetData} from '../../../Utils/ApiController';

function Reports(props) {
  const [vehicleNumber, setVehicleNumber] = useState('Select vehicle number');
  const [totalOdo, setTotalOdo] = useState('Select vehicle number');
  const [sumIgnitionOn, setSumIgnitionOn] = useState('Select vehicle number');

  useEffect(() => {
    // console.log(' route -=-=   -= ', props.route.params);
    data1();
  }, []);

  const data1 = async () => {
    const succcess = await Storage.getLoginDetail('login_detail');
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    const data = {
      accountid: username,
      password: encodedPassWord,
      imei: '459710040353691',
      startdate: '2016-09-01',
      enddate: '2016-11-22',
      type: 'odo',
    };
    const response = await axiosGetData('reportHistory', data);
    // console.log('response.data', response.data.DeviceHistory);
    const resData = response.data.DeviceHistory;
    const sumOdo = resData.reduce((accumulator, object) => {
      return accumulator + object.todaysODO;
    }, 0);
    setTotalOdo(sumOdo);
    const sumIgnitionOn = resData.reduce((accumulator, object) => {
      return accumulator + object.todaysIgnitionOnTimeSeconds;
    }, 0);
    console.log(sumIgnitionOn);
    setSumIgnitionOn(sumIgnitionOn);
  };

  let index = 0;
  const data = [
    {key: index++, label: '87768'},
    {key: index++, label: '8785875'},
  ];

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View>
          <LinearGradient
            colors={['#16BCD4', '#395DBF']}
            style={styles.mainContainer}>
            <View style={styles.headerContainer}>
              <View style={styles.headerDashboard}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                  <Image source={image.backArrow} />
                </TouchableOpacity>
                <TextInput
                  style={styles.dashboardText}
                  editable={false}
                  value={__('Distance Reports')}
                />
              </View>
              <View style={styles.alertContainer}>
                <Image
                  source={image.reportIcon}
                  style={{height: 24, width: 24}}
                />
                <Image source={image.search} style={styles.searchIcon} />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 15,
                paddingHorizontal: 20,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: '60%',
                }}>
                <ModalSelector
                  initValue="Select tickets"
                  accessible={true}
                  data={data}
                  scrollViewAccessibilityLabel={'Scrollable options'}
                  onChange={option => {
                    setVehicleNumber(option.label);
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.white,
                      flexDirection: 'row',
                      paddingHorizontal: 15,
                      borderRadius: 7,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <TextInput
                      style={{
                        color: colors.black,
                        fontSize: Size.medium,
                      }}
                      editable={false}
                      value={vehicleNumber}
                    />
                    <MaterialIcons
                      style={{
                        color: '#3D3D3D',
                        fontSize: 16,
                      }}
                      name={'keyboard-arrow-down'}
                    />
                  </TouchableOpacity>
                </ModalSelector>
              </View>

              <TouchableOpacity style={{width: '35%'}}>
                <LinearGradient
                  colors={['#00D957', '#2ACBA1', '#5EB9FF']}
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 0}}
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                    paddingVertical: 12,
                    // width: '35%',
                    borderRadius: 7,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontSize: 14, color: 'white'}}>Yesterday</Text>
                  <MaterialIcons
                    style={{
                      color: '#3D3D3D',
                      fontSize: 16,
                    }}
                    name={'keyboard-arrow-down'}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              paddingHorizontal: 20,
              justifyContent: 'space-between',
              paddingVertical: 10,
            }}>
            {/* <View style={{flexDirection: 'row'}}> */}
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: '#D9D9D9',
                flexDirection: 'row',
                paddingHorizontal: 15,
                paddingVertical: 12,
                width: '47%',
                borderRadius: 7,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 14}}>From Date</Text>
              <MaterialIcons
                style={{
                  color: '#3D3D3D',
                  fontSize: 16,
                }}
                name={'keyboard-arrow-down'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderColor: '#D9D9D9',
                borderWidth: 1,
                flexDirection: 'row',
                paddingHorizontal: 15,
                paddingVertical: 12,
                width: '47%',
                borderRadius: 7,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 14}}>From Date</Text>
              <MaterialIcons
                style={{
                  color: '#3D3D3D',
                  fontSize: 16,
                }}
                name={'keyboard-arrow-down'}
              />
            </TouchableOpacity>
          </View>
        </View>

        <LinearGradient
          colors={['#BCE2FF', '#ffffff']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={{padding: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {__('Odometer Total km')}
            </Text>
            <TouchableOpacity>
              <Image source={image.shareDark} style={{width: 24, height: 24}} />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{flexDirection: 'row', paddingTop: 10}}>
            <View style={{paddingRight: 20}}>
              <Text>Date</Text>
              <Text>20-07-2022</Text>
            </View>
            <View style={{paddingRight: 20}}>
              <Text>Kms</Text>
              <Text>{totalOdo}</Text>
            </View>
          </ScrollView>
        </LinearGradient>

        {/*
         */}

        <LinearGradient
          colors={['#BCE2FF', '#ffffff']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={{padding: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {__('Ignition Location On')}
            </Text>
            <TouchableOpacity>
              <Image source={image.shareDark} style={{width: 24, height: 24}} />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{flexDirection: 'row', paddingTop: 10}}>
            <View style={{paddingRight: 20}}>
              <Text>Date</Text>
              <Text>20-07-2022</Text>
            </View>
            <View style={{paddingRight: 20}}>
              <Text>Ignition on</Text>
              {/* <Text>{sumIgnitionOn}</Text> */}
            </View>
            <View style={{paddingRight: 20}}>
              <Text>Ignition off</Text>
              {/* <Text>{sumIgnitionOn}</Text> */}
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </>
  );
}

export default Reports;

// {"DeviceHistory":
// const data = [
//   {
//     deviceId: 'Petrol zeep',
//     0: 'Petrol zeep',
//     todaysODO: 33.34,
//     1: '33.3442',
//     todaysIgnitionOnTimeSeconds: '5216',
//     2: '5216',
//     todaysIdleTimeSeconds: '81184',
//     3: '81184',
//     todaysWaitingIgnitionTime: '1306',
//     4: '1306',
//     cumulativeIgnitionOnTimeSeconds: '993412',
//     5: '993412',
//     timeStamp1: 'Tue 22nd Nov 2016',
//     6: 'Tue 22nd Nov 2016',
//     eventTime: '1479816000',
//     7: '1479816000',
//   },
//   {
//     deviceId: 'Petrol zeep',
//     0: 'Petrol zeep',
//     // todaysODO: 3.85,
//     // 1: '3.84679',
//     // todaysIgnitionOnTimeSeconds: '488',
//     // 2: '488',
//     // todaysIdleTimeSeconds: '85912',
//     // 3: '85912',
//     // todaysWaitingIgnitionTime: '125',
//     // 4: '125',
//     cumulativeIgnitionOnTimeSeconds: '988196',
//     5: '988196',
//     timeStamp1: 'Mon 21st Nov 2016',
//     6: 'Mon 21st Nov 2016',
//     eventTime: '1479729600',
//     7: '1479729600',
//   },
//   {
//     deviceId: 'Petrol zeep',
//     0: 'Petrol zeep',
//     todaysODO: 23.97,
//     1: '23.9698',
//     todaysIgnitionOnTimeSeconds: '3210',
//     2: '3210',
//     todaysIdleTimeSeconds: '83190',
//     3: '83190',
//     todaysWaitingIgnitionTime: '825',
//     4: '825',
//     cumulativeIgnitionOnTimeSeconds: '987708',
//     5: '987708',
//     timeStamp1: 'Wed 9th Nov 2016',
//     6: 'Wed 9th Nov 2016',
//     eventTime: '1478692800',
//     7: '1478692800',
//   },
//   {
//     deviceId: 'Petrol zeep',
//     0: 'Petrol zeep',
//     todaysODO: 73.46,
//     1: '73.4575',
//     todaysIgnitionOnTimeSeconds: '10969',
//     2: '10969',
//     todaysIdleTimeSeconds: '75431',
//     3: '75431',
//     todaysWaitingIgnitionTime: '2305',
//     4: '2305',
//     cumulativeIgnitionOnTimeSeconds: '984498',
//     5: '984498',
//     timeStamp1: 'Tue 8th Nov 2016',
//     6: 'Tue 8th Nov 2016',
//     eventTime: '1478606400',
//     7: '1478606400',
//   },
//   {
//     deviceId: 'Petrol zeep',
//     0: 'Petrol zeep',
//     todaysODO: 30.62,
//     1: '30.6189',
//     todaysIgnitionOnTimeSeconds: '5162',
//     2: '5162',
//     todaysIdleTimeSeconds: '81238',
//     3: '81238',
//     todaysWaitingIgnitionTime: '1718',
//     4: '1718',
//     cumulativeIgnitionOnTimeSeconds: '973529',
//     5: '973529',
//     timeStamp1: 'Mon 7th Nov 2016',
//     6: 'Mon 7th Nov 2016',
//     eventTime: '1478520000',
//     7: '1478520000',
//   },
//   {
//     deviceId: 'Petrol zeep',
//     0: 'Petrol zeep',
//     todaysODO: 19.37,
//     1: '19.3699',
//     todaysIgnitionOnTimeSeconds: '2901',
//     2: '2901',
//     todaysIdleTimeSeconds: '83499',
//     3: '83499',
//     todaysWaitingIgnitionTime: '334',
//     4: '334',
//     cumulativeIgnitionOnTimeSeconds: '968367',
//     5: '968367',
//     timeStamp1: 'Sun 6th Nov 2016',
//     6: 'Sun 6th Nov 2016',
//     eventTime: '1478433600',
//     7: '1478433600',
//   },
//   {
//     deviceId: 'Petrol zeep',
//     0: 'Petrol zeep',
//     todaysODO: 8.98,
//     1: '8.98227',
//     todaysIgnitionOnTimeSeconds: '4763',
//     2: '4763',
//     todaysIdleTimeSeconds: '81637',
//     3: '81637',
//     todaysWaitingIgnitionTime: '2631',
//     4: '2631',
//     cumulativeIgnitionOnTimeSeconds: '965466',
//     5: '965466',
//     timeStamp1: 'Sat 5th Nov 2016',
//     6: 'Sat 5th Nov 2016',
//     eventTime: '1478347200',
//     7: '1478347200',
//   },
// ];
