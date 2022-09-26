import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {image} from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import ModalSelector from 'react-native-modal-selector';
import styles from './style';
import Dashboard1 from './Dashboard1';
import Dashboard2 from './Dashboard2';
import {__} from '../../../Utils/Translation/translation';
import colors from '../../../assets/Colors';
import {axiosGetData} from '../../../Utils/ApiController';
import Storage from '../../../Utils/Storage';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

function MainHome(props) {
  const {details, driverDetails, type, setIsShow} = props.route.params;
  const navigation = useNavigation();
  // console.log('jijijijijijjijijiijijijiijiji');
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [dashBoardType, setDashBoardType] = useState('Dashboard 1');
  // const [details, setDetails] = useState([]);
  const [newFilterDetails, setNewFilterDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  // const [isShow, setIsShow] = useState(true);
  const [search, setSearch] = useState(true);
  // const [type, setType] = useState('All');
  // const [driverDetails, setDriverDetails] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  let index = 0;

  const data = [
    {key: index++, label: 'Dashboard 1'},
    {key: index++, label: 'Dashboard 2'},
  ];
  const changeDasboardType = dashBoardType => {
    return __(dashBoardType);
  };
  useEffect(() => {
    setDashBoardType('Dashboard 1');
    setNewFilterDetails(details);
    setFilteredDetails(details);
    // messaging().onMessage(async remoteMessage => {
    //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });
  }, [props]);

  const searchFunction = text => {
    // let filteredData = filterDetails.filter(item => {
    //   return item.deviceId.includes(text);
    // });
    // setFilteredDetails(filteredData);
    // console.log('this is searched text', filteredData);
    // console.log('text', text);
    if (text !== null && text !== undefined && text !== '') {
      var newArr = [];
      newArr = filteredDetails.filter(item => {
        return item.deviceId.toLowerCase().includes(text.toLowerCase());
      });
      // console.log('filteredDetails', filteredDetails);
      newArr !== null && newArr !== undefined && newArr.length > 0
        ? setNewFilterDetails(newArr)
        : setNewFilterDetails([]);
    } else {
      setNewFilterDetails(filteredDetails);
    }
  };

  const onRefreshPage = React.useCallback((data, details) => {
    console.log('hihihds');
    // setIsRefreshing(true);
    // setIsShow(true);
    // console.log('typeptprprp', data);
    // if (data === 'All') {
    // getDetails('refresh');
    // } else {
    //   getRunningData(data, details);
    // }

    // setTimeout(() => setIsShow(false), 2000);
  }, []);
  return (
    <>
      <LinearGradient
        colors={['#395DBF', '#16BCD4']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}>
        <View style={styles.headerContainer}>
          <View style={styles.headerDashboard}>
            <TouchableOpacity
              style={{paddingVertical: 10}}
              onPress={() => navigation.openDrawer()}>
              <Image source={image.drawer} style={{height: 20, width: 23}} />
            </TouchableOpacity>
            <View style={{marginLeft: 15}}>
              <ModalSelector
                initValue="Select tickets"
                accessible={true}
                data={data}
                scrollViewAccessibilityLabel={'Scrollable options'}
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
                  <Image
                    source={image.arrowDown}
                    style={styles.dashboardArrow}
                  />
                </TouchableOpacity>
              </ModalSelector>
            </View>
          </View>
          <View style={styles.alertContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notifications')}>
              <Image
                source={image.Notification1}
                style={{height: 30, width: 30, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
            {search ? (
              <TouchableOpacity onPress={() => setSearch(false)}>
                <Image source={image.search} style={styles.searchIcon} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setSearch(true), setNewFilterDetails(filteredDetails);
                }}>
                <Entypo
                  style={{
                    color: colors.white,
                    fontSize: 24,
                    marginLeft: 10,
                    paddingVertical: 5,
                  }}
                  name={'cross'}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {!search ? (
          <View
            style={{
              width: '100%',
              marginBottom: 20,
              marginTop: 10,
              borderRadius: 7,
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Select vehicle number"
              style={{
                backgroundColor: colors.white,
                borderRadius: 7,
                width: '90%',
                paddingHorizontal: 10,
              }}
              onChangeText={searchFunction}
            />
          </View>
        ) : null}
      </LinearGradient>

      <View style={styles.carDetailCard}>
        {dashBoardType === 'Dashboard 1' && (
          <Dashboard1
            details={newFilterDetails}
            // isShow={isShow}
            driverDetails={driverDetails}
            // onRefreshPage={onRefreshPage}
            // type={type}
            // isShow={isShow}
            // setIsShow={setIsShow}
          />
        )}
        {dashBoardType === 'Dashboard 2' && (
          <Dashboard2
            details={newFilterDetails}
            // isShow={isShow}
            driverDetails={driverDetails}
            // onRefreshPage={onRefreshPage}
            // type={type}
            // isShow={isShow}
            // setIsShow={setIsShow}
          />
        )}
      </View>
    </>
  );
}

export default MainHome;
