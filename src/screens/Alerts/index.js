import React, {useState} from 'react';
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
const Alerts = props => {
  const [selected, setSelected] = useState('All Vehicle');
  const [Ison, setIson] = useState(false);
  const [alertDataResponse, setalertResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState([]);
  const [filter, setFilter] = useState([]);
  React.useEffect(() => {
    getImei();
  }, []);

  const getImei = async () => {
    const data = await Storage.getVehicleDetail('vehicle_detail');
    setdata(data);
  };
  const Select = async (data, imei) => {
    console.log('datadatadatadata', imei);
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
    console.log('alertData', response.data.alert_details);
    if (response?.data) {
      setalertResponse(response?.data?.alert_details);
      setLoading(false);
      setIson(!Ison)
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
              <Text
                style={{
                  fontSize: Size.large,
                  color: colors.white,
                  paddingHorizontal: 10,
                }}>
                {__('Alerts')}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '50%',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
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
          <TouchableOpacity style={styles.textinputbox}>
            <SelectDropdown
              buttonStyle={{
                width: '100%',
                borderRadius: 7,
              }}
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
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.box1}>
          <Text style={styles.box1text}>{__('Alert Setting')}</Text>
          <ToggleSwitch
            isOn={Ison}
            onColor={colors.toggleColoron}
            offColor={colors.toggleColorOff}
            size="large"
            onToggle={() => setIson(!Ison)}
          />
        </View>
        {alertDataResponse.length > 0 ? (
          <ScrollView>
            {loading ? (
              <ActivityIndicator color={colors.black} />
            ) : (
              <>
                {Ison
                  ? alertDataResponse.map(el => {
                      return (
                        <>
                          <TouchableOpacity
                            onPress={() =>
                              props.navigation.navigate('AlertSetting', {
                                details: el,
                              })
                            }
                            key={el.id}
                            style={styles.box2}>
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
