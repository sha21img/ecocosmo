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

const Alerts = props => {
  const [Ison, setIson] = useState(false);
  const alertsData = [
    {
      id: 1,
      name: 'AC Misuse',
    },
    {
      id: 2,
      name: 'Daily Report',
    },
    {
      id: 3,
      name: 'Fuel Tank Full',
    },
    {
      id: 4,
      name: 'Help me',
    },
    {
      id: 5,
      name: 'Hourly Location Update',
    },
    {
      id: 6,
      name: 'Idle Time',
    },
    {
      id: 7,
      name: 'Ignition OFF',
    },
    {
      id: 8,
      name: 'Ignition On',
    },
    {
      id: 9,
      name: 'Last Drive',
    },
    {
      id: 10,
      name: 'Lock Vehicle',
    },
    {
      id: 11,
      name: 'Over Speed',
    },
    {
      id: 12,
      name: 'Power Cut',
    },
    {
      id: 13,
      name: 'Waiting Time',
    },
  ];
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
          {alertsData.map(el => {
            console.log(el);
            return (
              <View key={el.id} style={styles.box2}>
                <Text style={{fontSize: Size.large, color: colors.textcolor}}>
                  {el.name}
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
