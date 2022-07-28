import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
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
import {axiosGetData} from '../../../Utils/ApiController';

function Home(props) {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [dashBoardType, setDashBoardType] = useState('Dashboard 1');
  const [details, setDetails] = useState([]);
  const [filterDetails, setFilterDetails] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [type, setType] = useState('All');

  let index = 0;

  const data = [
    {key: index++, label: 'Dashboard 1'},
    {key: index++, label: 'Dashboard 2'},
  ];
  const changeDasboardType = dashBoardType => {
    return __(dashBoardType);
  };
  let username = 'Globalcars';
  let encodedPassWord = '62d959fc42e70781bd2a5bb242d4d7c6';
  let id = '0';
  const [countObj, setCountObj] = useState({
    Running: 0,
    Waiting: 0,
    Idle: 0,
    'In-Active': 0,
    'No GPS': 0,
  });
  const getDetails = async () => {
    const response = await axiosGetData(
      `vehicles/${username}/${encodedPassWord}/${id}`,
    );
    const detail = response.data.vehicles;
    setDetails(detail);
    setFilterDetails(detail);
    const detailsLength = detail.forEach(element => {
      setCountObj(prev => {
        return {...prev, [element.status]: prev[element.status] + 1};
      });
    });
    setIsShow(!isShow);
  };
  useEffect(() => {
    getDetails();
  }, []);
  const getRunningData = data => {
    setType(data);
    const filterDetails = details.filter(item => {
      return item.status == data;
    });
    setFilterDetails(filterDetails);
  };
  return (
    <>
      <LinearGradient
        colors={['#395DBF', '#16BCD4']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.headerContainer}>
        <View style={styles.headerDashboard}>
          <TouchableOpacity
            style={{paddingVertical: 10}}
            onPress={() => props.navigation.openDrawer()}>
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
                setDashBoardType(option.label);
              }}>
              <TouchableOpacity style={styles.dashboardContainer}>
                <TextInput
                  style={styles.dashboardText}
                  editable={false}
                  value={changeDasboardType(dashBoardType)}
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
      {isShow ? (
        <View style={styles.catagoryBox}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              onPress={() => {
                getDetails(), setType('All');
              }}>
              <Text
                style={[
                  styles.catagoryTextActive,
                  {
                    backgroundColor:
                      type == 'All' ? colors.mainThemeColor1 : '#D8D8D8',
                    color:
                      type == 'All' ? colors.white : colors.inputPlaceholdr,
                  },
                ]}>
                {__('All')} {details.length}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => getRunningData('Running')}>
              <Text
                style={[
                  styles.catagoryTextActive,
                  {
                    backgroundColor:
                      type == 'Running' ? colors.mainThemeColor1 : '#D8D8D8',
                    color:
                      type == 'Running' ? colors.white : colors.inputPlaceholdr,
                  },
                ]}>
                {__('Running')}
                {countObj.Running}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => getRunningData('Idle')}>
              <Text
                style={[
                  styles.catagoryTextActive,
                  {
                    backgroundColor:
                      type == 'Idle' ? colors.mainThemeColor1 : '#D8D8D8',
                    color:
                      type == 'Idle' ? colors.white : colors.inputPlaceholdr,
                  },
                ]}>
                {__('Stop')}
                {countObj.Idle}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => getRunningData('In-Active')}>
              <Text
                style={[
                  styles.catagoryTextActive,
                  {
                    backgroundColor:
                      type == 'In-Active' ? colors.mainThemeColor1 : '#D8D8D8',
                    color:
                      type == 'In-Active'
                        ? colors.white
                        : colors.inputPlaceholdr,
                  },
                ]}>
                {__('In-Active')}
                {countObj['In-Active']}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => getRunningData('No GPS')}>
              <Text
                style={[
                  styles.catagoryTextActive,
                  {
                    backgroundColor:
                      type == 'No GPS' ? colors.mainThemeColor1 : '#D8D8D8',
                    color:
                      type == 'No GPS' ? colors.white : colors.inputPlaceholdr,
                  },
                ]}>
                {__('No GPS')}
                {countObj['No GPS']}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => getRunningData('Waiting')}>
              <Text
                style={[
                  styles.catagoryTextActive,
                  {
                    backgroundColor:
                      type == 'Waiting' ? colors.mainThemeColor1 : '#D8D8D8',
                    color:
                      type == 'Waiting' ? colors.white : colors.inputPlaceholdr,
                  },
                ]}>
                {__('Waiting')}
                {countObj.Waiting}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      ) : null}

      {/* <ScrollView style={{backgroundColor: colors.white}}> */}
      <View style={styles.carDetailCard}>
        {dashBoardType === 'Dashboard 1' ? (
          <Dashboard1 details={filterDetails} isShow={isShow} />
        ) : null}

        {dashBoardType === 'Dashboard 2' ? (
          <Dashboard2 details={filterDetails} isShow={isShow} />
        ) : null}
      </View>
      {/* </ScrollView> */}
    </>
  );
}

export default Home;
