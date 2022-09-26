import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  ActivityIndicator,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';
import {image} from '../../../assets/images';
import ToggleSwitch from 'toggle-switch-react-native';
import {__} from '../../../Utils/Translation/translation';
import {styles} from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {axiosGetData} from '../../../Utils/ApiController';
import Storage from '../../../Utils/Storage';
import SelectDropdown from 'react-native-select-dropdown';
import {useIsFocused} from '@react-navigation/native';
const Alerts = props => {
  const [selected, setSelected] = useState('All Vehicle');
  const [Ison, setIson] = useState(false);
  const [alertDataResponse, setalertResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState([]);
  const [filter, setFilter] = useState([]);
  const [imei, setImei] = useState('');
  const [isActive, setIsActive] = useState({});
  const [loginDetails, setLoginDetails] = useState();
  React.useEffect(() => {
    getImei();
  }, []);

  const getImei = async () => {
    const data = await Storage.getVehicleDetail('vehicle_detail');
    setdata(data);
    const succcess = await Storage.getLoginDetail('login_detail');
    setLoginDetails(succcess);
    Select(data[0].deviceId, data[0].imei);
  };
  const focus = useIsFocused();
  useEffect(() => {
    console.log('inininintititiallllresp', imei);
    if (focus == true && imei !== '') {
      getInitialResponse();
    }
  }, [focus]);
  const getInitialResponse = async () => {
    console.log('getInitialResponse');
    const succcess = await Storage.getLoginDetail('login_detail');
    let username = succcess.accountId;
    let password = succcess.password;
    const params = {
      accountid: username,
      password: password,
      imei: imei,
    };
    const response = await axiosGetData(`getAlertDetails`, params);
    if (response) {
      setalertResponse(response?.data?.alert_details);
    }
  };

  const Select = async (data, imei) => {
    setIson(false);
    setSelected(data);
    setLoading(true);
    const succcess = await Storage.getLoginDetail('login_detail');
    let username = succcess.accountId;
    let password = succcess.password;
    const params = {
      accountid: username,
      password: password,
      imei: imei,
    };
    const response = await axiosGetData(`getAlertDetails`, params);
    // <<<<<<<<< Temporary merge branch 1
    // =========
    //     console.log('alertData', response.data.alert_details[1]);
    // >>>>>>>>> Temporary merge branch 2
    if (response?.data) {
      console.log('selecting for imei', response.data.alert_details);
      setalertResponse(response?.data?.alert_details);
      setLoading(false);
      setIson(true);
      setImei(imei);
    }
    setLoading(false);
  };
  return (
    <>
      <View style={{height: '100%'}}>
        <LinearGradient
          colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={{paddingHorizontal: 16}}>
          <View style={styles.navcontainer}>
            <View style={styles.navbox}>
              <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                <Image source={image.drawer} style={styles.dashimg} />
              </TouchableOpacity>
              <Text style={styles.alertText}>{__('Alerts')}</Text>
            </View>
            <View style={styles.shareText}>
              <Entypo
                style={{
                  color: colors.white,
                  fontSize: 20,
                }}
                name={'share'}
              />
              <Image
                source={image.search}
                style={{height: 18, width: 18, marginLeft: 15}}
              />
            </View>
          </View>
          <View style={styles.textinputbox}>
            <SelectDropdown
              buttonStyle={{
                width: '100%',
                borderRadius: 7,
                backgroundColor:
                  loginDetails?.accountName == 'demo101' ? 'grey' : 'white',
              }}
              disabled={loginDetails?.accountName == 'demo101' ? true : false}
              data={data}
              defaultButtonText={selected}
              onSelect={(selectedItem, index) => {
                setSelected(selectedItem.deviceId);
                Select(selectedItem.deviceId, selectedItem.imei);
                console.log(selectedItem.deviceId, index);
              }}
              buttonTextAfterSelection={selectedItem => {
                return selectedItem.deviceId;
              }}
              rowTextForSelection={item => {
                return item.deviceId;
              }}
              renderDropdownIcon={() => {
                return (
                  <MaterialIcons
                    style={{
                      color: '#3D3D3D',
                      fontSize: 20,
                    }}
                    name={'keyboard-arrow-down'}
                  />
                );
              }}
            />
          </View>
        </LinearGradient>
        <View
          style={
            loginDetails?.accountName == 'demo101' ? styles.box11 : styles.box1
          }>
          <Text style={styles.box1text}>{__('Alert Setting')}</Text>
          <ToggleSwitch
            isOn={Ison}
            disabled={loginDetails?.accountName == 'demo101' ? true : false}
            onColor={colors.toggleColoron}
            offColor={colors.toggleColorOff}
            size="large"
            onToggle={() => setIson(!Ison)}
          />
        </View>
        {alertDataResponse?.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {loading ? (
              <ActivityIndicator color={colors.black} />
            ) : (
              <>
                {Ison
                  ? alertDataResponse.map(el => {
                      return (
                        <>
                          <TouchableOpacity
                            // loginDetails?.accountName == 'demo101' ? 'grey' : 'white',
                            disabled={
                              loginDetails?.accountName == 'demo101'
                                ? true
                                : false
                            }
                            onPress={() =>
                              props.navigation.navigate('AlertSetting', {
                                details: el,
                              })
                            }
                            key={el.id}
                            style={
                              loginDetails?.accountName == 'demo101'
                                ? styles.box22
                                : styles.box2
                            }>
                            <Text
                              style={{
                                fontSize: Size.large,
                                color: colors.textcolor,
                              }}>
                              {el?.displayName}
                            </Text>
                            <AntDesign
                              style={{
                                color:
                                  el.isActive === 'Yes' ? '#395dbf' : '#d9d9d9',
                                fontSize: 26,
                              }}
                              name={'checkcircle'}
                            />
                          </TouchableOpacity>
                        </>
                      );
                    })
                  : null}
              </>
            )}
          </ScrollView>
        ) : (
          <View
            style={{
              height: '100%',
              backgroundColor: colors.white,
            }}>
            <View
              style={{
                height: '70%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>Please select Vehicle</Text>
            </View>
          </View>
        )}
      </View>
    </>
  );
};
export default Alerts;

// <MapView
//                 // minZoomLevel={15}
//                 pitchEnabled={false}
//                 style={{
//                   width: Dimensions.get('window').width,
//                   height: Dimensions.get('window').height,
//                 }}
//                 ref={mapRef}
//                 caheEnabled
//                 region={{
//                   latitude: parseFloat(data[0]?.lat),
//                   longitude: parseFloat(data[0]?.lng),
//                   latitudeDelta: LATITUDE_DELTA,
//                   longitudeDelta: LONGITUDE_DELTA,
//                 }}>
//                 {data
//                   ?.filter(item => {
//                     console.log('5555555555555555555555555555555555555', item);
//                     item.stoppage;
//                   })
//                   .map((coordinate, index) => {
//                     console.log(
//                       'ppppppppppppppppppppppppppppppppppppp',
//                       coordinate,
//                     );
//                     return (
//                       <>
//                         <MarkerAnimated
//                           key={index}
//                           coordinate={{
//                             latitude: parseFloat(coordinate.lat),
//                             longitude: parseFloat(coordinate.lng),
//                           }}>
//                           <Image
//                             resizeMode="contain"
//                             source={image.parkingPoint}
//                             style={{
//                               height: 50,
//                               width: 50,
//                             }}
//                           />
//                           <Callout tooltip>
//                             <LinearGradient
//                               colors={[
//                                 colors.mainThemeColor3,
//                                 colors.mainThemeColor4,
//                               ]}
//                               start={{x: 1.3, y: 0}}
//                               end={{x: 0, y: 0}}
//                               locations={[0, 0.9]}
//                               style={style.firstbox}>
//                               <View style={{paddingBottom: 5}}>
//                                 <Text style={style.firstboxtext1}>
//                                   Address : {coordinate.stoppage.address}
//                                 </Text>
//                                 <Text style={style.firstboxtext1}>
//                                   Stop Duration :{' '}
//                                   {coordinate.stoppage.stopDuration}
//                                 </Text>
//                                 <Text style={style.firstboxtext1}>
//                                   From : {coordinate.stoppage.stopTime1}
//                                 </Text>
//                                 <Text style={style.firstboxtext1}>
//                                   To : {coordinate.stoppage.stopTime2}
//                                 </Text>
//                               </View>
//                             </LinearGradient>
//                           </Callout>
//                         </MarkerAnimated>
//                       </>
//                     );
//                   })}

//                 <MarkerAnimated
//                   ref={marker => {
//                     // console.log('marker', marker);
//                     setMyMarker(marker);
//                   }}
//                   style={{
//                     transform: [
//                       {
//                         rotate: degree === null ? '0deg' : `${degree}deg`,
//                       },
//                     ],
//                   }}
//                   // key={index.toString()}
//                   coordinate={{
//                     latitude: parseFloat(data[0]?.lat),
//                     longitude: parseFloat(data[0]?.lng),
//                   }}>
//                   {animate == 'stop' ? (
//                     <Image
//                       resizeMode="contain"
//                       source={image.carGreenUp}
//                       style={{
//                         height: 30,
//                         width: 30,
//                       }}
//                     />
//                   ) : animate == 'start' ? (
//                     <Image
//                       resizeMode="contain"
//                       source={image.carGreenUp}
//                       style={{
//                         height: 0,
//                         width: 0,
//                       }}
//                     />
//                   ) : null}
//                 </MarkerAnimated>
//                 <Polyline
//                   strokeWidth={2}
//                   strokeColor="red"
//                   coordinates={[
//                     ...data.map((value, index) => {
//                       return {
//                         latitude: parseFloat(value.lat),
//                         longitude: parseFloat(value.lng),
//                       };
//                     }),
//                   ]}
//                 />
//               </MapView>
