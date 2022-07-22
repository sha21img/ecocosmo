import React, {useState} from 'react';
import {Image, ScrollView, Text, TextInput, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';
import {image} from '../../../assets/images';
import ToggleSwitch from 'toggle-switch-react-native';
import {__} from '../../../Utils/Translation/translation';
import {styles} from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {axiosGetData} from '../../../Utils/ApiController';

const Alerts = props => {
  const [Ison, setIson] = useState(false);
  const [alertDataResponse, setalertResponse] = useState([]);

  const accountid = 'rrenterprises';
  const password = 'b4e82dac5f70e501df1fde474d8c3aa6';
  const imei = '459710040353691';

  const AlertData = async () => {
    const response = await axiosGetData(
      `getAlertDetails?accountid=${accountid}&password=${password}&imei=${imei}`,
    );
    if (response?.data) {
      setalertResponse(response?.data?.alert_details);
    }
    console.log('response', response.data);
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
          style={{height: 161, paddingHorizontal: 16}}>
          <View style={styles.navcontainer}>
            <View style={styles.navbox}>
              <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                <Image source={image.drawer} style={styles.dashimg} />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: Size.large,
                  color: colors.white,
                }}>
                {__('Alerts')}
              </Text>
            </View>
            <Image source={image.search} />
          </View>
          <View style={styles.textinputbox}>
            <TextInput
              placeholder="Select vehicle number"
              style={styles.textinput}
            />
            <Text>‸</Text>
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
        <ScrollView style={{marginVertical: 26}}>
          {alertDataResponse.map(el => {
            console.log(el);
            return (
              <View key={el.id} style={styles.box2}>
                <Text style={{fontSize: Size.large, color: colors.textcolor}}>
                  {el?.displayName}
                </Text>
                <Image source={image.selected} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};
export default Alerts;
