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

const Alerts = props => {
  const [Ison, setIson] = useState(true);
  const [alertDataResponse, setalertResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  const AlertData = async props => {
    setLoading(true);
    const succcess = await Storage.getLoginDetail('login_detail');
    let username = succcess.accountId;
    let password = succcess.password;
    const params = {
      accountid: username,
      password: password,
      imei: '459710040353691',
    };
    const response = await axiosGetData(`getAlertDetails`, params);
    console.log('alertData', response.data.alert_details);
    if (response?.data) {
      setalertResponse(response?.data?.alert_details);
      setLoading(false);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    AlertData();
  }, []);

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
          <View style={styles.textinputbox}>
            <TextInput
              placeholder={__('Select vehicle number')}
              style={styles.textinput}
            />
            <MaterialIcons
              style={{
                color: '#3D3D3D',
                fontSize: 18,
              }}
              name={'keyboard-arrow-down'}
            />
          </View>
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
        <ScrollView style={{}}>
          {loading ? (
            <ActivityIndicator color={colors.white} />
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
      </View>
    </>
  );
};
export default Alerts;
