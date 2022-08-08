import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {image} from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import {__} from '../../../Utils/Translation/translation';
import styles from './DashStyle2';
import colors from '../../../assets/Colors';
import VehicleMenu from '../VehicleMenu';
import {axiosGetData} from '../../../Utils/ApiController';
import Storage from '../../../Utils/Storage';

function Dashboard2({details, isShow}) {
  const [isData, isSetData] = useState({});
  const [visible, setVisible] = useState(false);

  const calling = async data => {
    const succcess = await Storage.getLoginDetail('login_detail');
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    const response = await axiosGetData(
      `getDriverDetails/${username}/${encodedPassWord}`,
    );
    const driverDetails = response.data.driverDetails;
    const filterData = driverDetails.filter(item => {
      return item.deviceId === data.deviceId;
    });
    const phoneNumber = filterData[0].mobilenumber;
    console.log(filterData[0]);
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const renderItem = ({item}) => {
    const date = parseFloat(item.validPacketTimeStamp) + 19800;
    const newDate = new Date(date);
    const filterTime = newDate.toLocaleTimeString('en-US');
    let month = newDate.getMonth() + 1;
    if (String(Math.abs(month)).length == 1) {
      month = '0' + month;
    }
    const filterDate = `${newDate.getDate()}-${month}-${newDate.getFullYear()}`;
    return (
      <TouchableOpacity
        onPress={() => {
          isSetData(item), setVisible(true);
        }}>
      
        <LinearGradient
          colors={['#BCE2FF', '#FFFFFF']}
          style={styles.card2Container}>
          <View style={styles.cardDetailBox}>
            <View style={styles.driverDetails}>
              <View>
                <Text style={styles.driverCarSpeed}>
                  {/* {__('RUNNING')} 14M 38KM/H */}
                  {item.statusMessage}
                </Text>
                <Text style={styles.driverCarNumber}>
                  {item.deviceId}
                  {/* MH12 RN 0790 */}
                </Text>
              </View>
              <View style={styles.driverCarDetailsBox}>
                <View style={styles.driverCarDetails}>
                  <Image
                    source={image.clock}
                    style={styles.driverCarDetailsImage}
                  />
                  <Text style={styles.driverCarDetailsText}>{filterDate}</Text>
                  <Text style={styles.driverCarDetailsText}>{filterTime}</Text>
                  <Text style={styles.driverCarDetailsText1}>
                    {__('CHECK IN DATE & TIME')}
                  </Text>
                </View>
                <View style={styles.driverCarDetails}>
                  <Image
                    source={image.speed}
                    style={styles.driverCarDetailsImage}
                  />
                  <Text style={styles.driverCarDetailsText}>
                    {Math.floor(item.speed)} {__('KM/H')}
                    {/* {__('KM/H')} */}
                  </Text>
                  <Text style={styles.driverCarDetailsText1}>
                    {__('SPEED')}
                  </Text>
                </View>
                <View style={styles.driverCarDetails}>
                  <Image
                    source={image.distance}
                    style={styles.driverCarDetailsImage1}
                  />
                  <Text style={styles.driverCarDetailsText}>
                    {Math.floor(item.todaysODO)}
                    {/* 5790456 */}
                  </Text>
                  <Text style={styles.driverCarDetailsText1}>
                    {__("TODAY'S ODO")}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.driverCarBox}>
            {/* <Image source={image.carUp} style={styles.driverCar} /> */}

              <Image source={{uri:item.equipmentIcon}} style={styles.driverCar} />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <LinearGradient
              colors={['#5AB8B5', '#3C6A74']}
              start={{x: 1, y: 0.5}}
              end={{x: 0, y: 0.5}}
              style={{
                flexDirection: 'row',
                maxWidth: '65%',
                justifyContent: 'space-around',
                marginHorizontal: 10,
                paddingHorizontal: 5,
                borderRadius: 6,
              }}>
              {parseFloat(item.validPacketTimeStamp) -
                parseFloat(item.lastPowerCutTime) >
              300 ? (
                <>
                  <View
                    style={{
                      paddingHorizontal: 18,
                      paddingVertical: 6,
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={image.batteryWhite}
                      style={{width: 20, height: 15}}
                    />
                  </View>
                  <LinearGradient
                    colors={['#D4D4D4', 'transparent', 'transparent']}
                    style={{padding: 0.5}}></LinearGradient>
                </>
              ) : (
                <>
                  <View
                    style={{
                      paddingHorizontal: 18,
                      paddingVertical: 6,
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={image.batteryWhiteOff}
                      style={{width: 20, height: 15}}
                    />
                  </View>
                  <LinearGradient
                    colors={['#D4D4D4', 'transparent', 'transparent']}
                    style={{padding: 0.5}}></LinearGradient>
                </>
              )}
              {parseFloat(item.validPacketTimeStamp) -
                parseFloat(item.lastLowBatteryTime) >
              21600 ? (
                <>
                  <View
                    style={{
                      paddingHorizontal: 18,
                      paddingVertical: 6,
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={image.chargeWhite}
                      style={{width: 10, height: 20}}
                    />
                  </View>
                  <LinearGradient
                    colors={['#D4D4D4', 'transparent', 'transparent']}
                    style={{padding: 0.5}}></LinearGradient>
                </>
              ) : (
                <>
                  <View
                    style={{
                      paddingHorizontal: 18,
                      paddingVertical: 6,
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={image.chargeWhiteOff}
                      style={{width: 10, height: 20}}
                    />
                  </View>
                  <LinearGradient
                    colors={['#D4D4D4', 'transparent', 'transparent']}
                    style={{padding: 0.5}}></LinearGradient>
                </>
              )}
              {parseFloat(item.lastNoGpsSignalTime) >
              parseFloat(item.validPacketTimeStamp) ? (
                <>
                  <View
                    style={{
                      paddingHorizontal: 18,
                      paddingVertical: 6,
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={image.locationWhite}
                      style={{width: 13, height: 18}}
                    />
                  </View>
                  <LinearGradient
                    colors={['#D4D4D4', 'transparent', 'transparent']}
                    style={{padding: 0.5}}></LinearGradient>
                </>
              ) : (
                <>
                  <View
                    style={{
                      paddingHorizontal: 18,
                      paddingVertical: 6,
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={image.locationWhiteOff}
                      style={{width: 13, height: 18}}
                    />
                  </View>
                  <LinearGradient
                    colors={['#D4D4D4', 'transparent', 'transparent']}
                    style={{padding: 0.5}}></LinearGradient>
                </>
              )}
              {parseFloat(item.statusTermInfo & 2) == 2 ? (
                <>
                  <View
                    style={{
                      paddingHorizontal: 18,
                      paddingVertical: 6,
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={image.chargePin}
                      style={{width: 10, height: 18}}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View
                    style={{
                      paddingHorizontal: 18,
                      paddingVertical: 6,
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={image.chargePinOff}
                      style={{width: 10, height: 18}}
                    />
                  </View>
                </>
              )}
            </LinearGradient>
            <View
              style={{
                flexDirection: 'row',
                width: '30%',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  isSetData(item), calling(item);
                }}>
                <Image source={image.call} style={{padding: 10}} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={['#395DBF', '#16BCD4']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={styles.driverAddressBox}>
          <Text style={styles.driverAddress}>
            {item.address}
            {/* {__('177 New Apollo Mogra Lane Andheri,Mumbai, Bharuch,400069,India')} */}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  return (
    <>
      {isShow ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={details}
          contentContainerStyle={{paddingBottom: 100}}
          keyExtractor={({item, index}) => index}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      )}
      <VehicleMenu
        visible={visible}
        calling={calling}
        setVisible={setVisible}
        details={isData}
      />
    </>
  );
}

export default Dashboard2;
