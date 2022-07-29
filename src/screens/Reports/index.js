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
import {Size} from '../../../assets/fonts/Fonts';
import {axiosGetData} from '../../../Utils/ApiController';

function Reports(props) {
  const [vehicleNumber, setVehicleNumber] = useState('Select vehicle number');
  const [items, setItems] = useState([]);

  const data1 = async () => {
    const response = await axiosGetData(
      'reportHistory?accountid=rrenterprises&password=25f9e794323b453885f5181f1b624d0b&imei=459710040353691&startdate=2016-09-01&enddate=2016-11-22&type=odo',
    );
    setItems(response.data.DeviceHistory);
  };

  useEffect(() => {
    data1();
  }, []);

  let index = 0;
  const data = [
    {key: index++, label: '87768'},
    {key: index++, label: '8785875'},
  ];

  const renderItem = ({item}) => {
    const date = parseFloat(item.validPacketTimeStamp) + 19800;
    const newDate = new Date(date);
    const filterDate = newDate.toLocaleTimeString('en-US');

    // {{"0": "Petrol zeep", "1": "8.98227", "2": "4763", "3": "81637", "4": "2631", "5": "965466",
    //  "6": "Sat 5th Nov 2016", "7": "1478347200", "cumulativeIgnitionOnTimeSeconds": "965466",
    //  "deviceId": "Petrol zeep", "eventTime": "1478347200", "timeStamp1": "Sat 5th Nov 2016",
    //  "todaysIdleTimeSeconds": "81637", "todaysIgnitionOnTimeSeconds": "4763", "todaysODO": 8.98,
    //   "todaysWaitingIgnitionTime": "2631"}  }

    return (
      <>
        <LinearGradient
          colors={['#BCE2FF', '#FFFFFF']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            elevation: 20,
          }}>
          <View style={{padding: 20}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Odometer Total km
            </Text>
            {/* <Text>{item.}</Text> */}
            <TouchableOpacity style={{paddingVertical: 10}}>
              <Image source={image.shareDark} style={{width: 22, height: 22}} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </>
    );
  };

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
                  value="Distance Reports"
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

        <FlatList
          data={items}
          keyExtractor={({item, index}) => index}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      </View>
    </>
  );
}

export default Reports;
