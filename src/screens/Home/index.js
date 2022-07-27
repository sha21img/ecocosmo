import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {image} from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import ModalSelector from 'react-native-modal-selector';
import styles from './style';
import Dashboard1 from './Dashboard1';
import Dashboard2 from './Dashboard2';
import {__} from '../../../Utils/Translation/translation';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../assets/Colors';

function Home(props) {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [dashBoardType, setDashBoardType] = useState('Dashboard 1');

  let index = 0;

  const data = [
    {key: index++, label: 'Dashboard 1'},
    {key: index++, label: 'Dashboard 2'},
  ];
  const changeDasboardType = dashBoardType => {
    return __(dashBoardType);
  };
  return (
    <>
      <LinearGradient
        colors={['#395DBF', '#16BCD4']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.headerContainer}>
        <View style={styles.headerDashboard}>
          <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
            <Image source={image.drawer} style={{height: 20, width: 23}} />
          </TouchableOpacity>
          <View style={{marginLeft: 15}}>
            <ModalSelector
              initValue="Select tickets"
              accessible={true}
              data={data}
              scrollViewAccessibilityLabel={'Scrollable options'}
              // cancelButtonAccessibilityLabel={'Cancel Button'}
              style={{flexDirection: 'row'}}
              onChange={option => {
                console.log('option', option.label);
                setDashBoardType(option.label);
              }}>
              <TouchableOpacity style={styles.dashboardContainer}>
                <TextInput
                  style={styles.dashboardText}
                  editable={false}
                  value={changeDasboardType(dashBoardType)}

                  // value={__('Dashboard 1')}
                />
                <Image source={image.arrowDown} style={styles.dashboardArrow} />
              </TouchableOpacity>
            </ModalSelector>
          </View>
        </View>
        <View style={styles.alertContainer}>
          <Image source={image.Alert} />
          <Image source={image.search} style={styles.searchIcon} />
        </View>
      </LinearGradient>
      <View style={styles.catagoryBox}>
        <ScrollView horizontal={true}>
          <Text style={styles.catagoryTextActive}>{__('All')} (10)</Text>
          <Text style={styles.catagoryTextInactive}>{__('Running')}(5)</Text>
        </ScrollView>
      </View>
      <ScrollView style={{backgroundColor:colors.white}}>
        <View style={styles.carDetailCard}>
          {/* <Dashboard2 /> */}
          {dashBoardType === 'Dashboard 1' ? <Dashboard1 /> : null}
          {/* {[0, 0, 0].map(() => {
            return <Dashboard1 />;
          })} */}
          {dashBoardType === 'Dashboard 2' ? <Dashboard2 /> : null}
        </View>
      </ScrollView>
    </>
  );
}

export default Home;
