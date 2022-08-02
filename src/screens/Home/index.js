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
import colors from '../../../assets/Colors';
import {axiosGetData} from '../../../Utils/ApiController';
import Storage from '../../../Utils/Storage';
import Entypo from 'react-native-vector-icons/Entypo';

function Home(props) {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [dashBoardType, setDashBoardType] = useState('Dashboard 1');
  const [details, setDetails] = useState([]);
  const [newFilterDetails, setNewFilterDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [isShow, setIsShow] = useState(true);
  const [search, setSearch] = useState(true);
  const [type, setType] = useState('All');

  let index = 0;

  const data = [
    {key: index++, label: 'Dashboard 1'},
    {key: index++, label: 'Dashboard 2'},
  ];
  const changeDasboardType = dashBoardType => {
    return __(dashBoardType);
  };

  const [countObj, setCountObj] = useState({
    Running: 0,
    Waiting: 0,
    Idle: 0,
    'In-Active': 0,
    'No GPS': 0,
  });
  const getDetails = async () => {
    setIsShow(true);
    const succcess = await Storage.getLoginDetail('login_detail');
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    let id = succcess.type;

    const response = await axiosGetData(
      `vehicles/${username}/${encodedPassWord}/${id}`,
    );
    const detail = response.data.vehicles;
    setDetails(detail);
    setFilteredDetails(detail);
    setNewFilterDetails(detail);
    const detailsLength = detail.forEach(element => {
      setCountObj(prev => {
        return {...prev, [element.status]: prev[element.status] + 1};
      });
    });
    setIsShow(false);
  };
  useEffect(() => {
    getDetails();
  }, []);
  const searchFunction = text => {
    // let filteredData = filterDetails.filter(item => {
    //   return item.deviceId.includes(text);
    // });
    // setFilteredDetails(filteredData);
    // console.log('this is searched text', filteredData);
    console.log("text",text)
    if (text !== null && text !== undefined && text !== '') {
      var newArr = [];
      newArr = filteredDetails.filter(item => {
        return item.deviceId.includes(text);
      });
      console.log("filteredDetails",filteredDetails)
      newArr !== null && newArr !== undefined && newArr.length > 0
        ? setNewFilterDetails(newArr)
        : setNewFilterDetails([]);
    } else {
      setNewFilterDetails(filteredDetails);
    }
  };
  const getRunningData = data => {
    setType(data);
    const filterDetails = details.filter(item => {
      return item.status == data;
    });
    setNewFilterDetails(filterDetails);
    setIsShow(false);
  };
  0;
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
              onPress={() => props.navigation.openDrawer()}>
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
              onPress={() => props.navigation.navigate('Alerts')}>
              <Image source={image.Alert} />
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
                <Entypo style={styles.crossIcon} name={'cross'} />
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
      {!isShow ? (
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
                {__('All')} ({details.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsShow(true), getRunningData('Running');
              }}>
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
                {__('Running')}({countObj.Running})
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
                {__('Stop')}({countObj.Idle})
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
                {__('In-Active')}({countObj['In-Active']})
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
                {__('No GPS')}({countObj['No GPS']})
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
                {__('Waiting')}({countObj.Waiting})
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      ) : null}
      <View style={styles.carDetailCard}>
        {dashBoardType === 'Dashboard 1' && (
          <Dashboard1 details={newFilterDetails} isShow={isShow} />
        )}
        {dashBoardType === 'Dashboard 2' && (
          <Dashboard2 details={newFilterDetails} isShow={isShow} />
        )}
      </View>
    </>
  );
}

export default Home;
