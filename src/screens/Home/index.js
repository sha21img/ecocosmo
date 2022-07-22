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

function Home(props) {
  const [selectedLanguage, setSelectedLanguage] = useState();
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
              scrollViewAccessibilityLabel={'Scrollable options'}
              cancelButtonAccessibilityLabel={'Cancel Button'}
              style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.dashboardContainer}>
                <TextInput
                  style={styles.dashboardText}
                  editable={false}
                  value="Dashboard 1"
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
          <Text style={styles.catagoryTextActive}>{__('All (10)')}</Text>
          <Text style={styles.catagoryTextInactive}>{__('Running(5)')}</Text>
        </ScrollView>
      </View>
      <ScrollView>
        <View style={styles.carDetailCard}>
          <Dashboard2 />
          <Dashboard1 />
          {/* {[0, 0, 0].map(() => {
            return <Dashboard1 />;
          })} */}
        </View>
      </ScrollView>
    </>
  );
}

export default Home;
