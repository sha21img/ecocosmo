import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Dashboard2 from './Dashboard2';
import styles from './style';
import colors from '../../../assets/Colors';
import {__} from '../../../Utils/Translation/translation';

const SecondaryDashboard = ({
  secondaryFilterDetails,
  secondaryDriverDetails,
  countObj,
  filteredDetails,
  onRefreshPage,
  isShow,
  setIsShow,
}) => {
  console.log('filteredDetails', filteredDetails.length);
  const [newsecondaryFilterDetails, setNewSecondaryFilterDetails] = useState(
    [],
  );
  const [newSecondaryDriverDetails, setNewSecondaryDriverDetails] = useState(
    [],
  );
  const [type, setType] = useState('All');
  useEffect(() => {
    setNewSecondaryFilterDetails(secondaryFilterDetails);
    setNewSecondaryDriverDetails(secondaryDriverDetails);
  }, [secondaryFilterDetails]);
  const getRunningData = (data, details) => {
    console.log('data', data);
    setType(data);
    const filterDetails = details.filter(item => {
      return item.status == data;
    });
    console.log('filehugiyufjgkhlj;', filterDetails.length);
    setNewSecondaryFilterDetails(filterDetails);
    // setIsShow(false);
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          enabled={true}
          refreshing={isShow}
          onRefresh={() =>
            onRefreshPage(type, secondaryFilterDetails, setIsShow)
          }
        />
      }>
      <View style={styles.catagoryBox}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => {
              setNewSecondaryFilterDetails(secondaryFilterDetails);
              // getDetails(),
              setType('All');
            }}>
            <Text
              style={[
                styles.catagoryTextActive,
                {
                  backgroundColor:
                    type == 'All' ? colors.mainThemeColor1 : '#D8D8D8',
                  color: type == 'All' ? colors.white : colors.inputPlaceholdr,
                },
              ]}>
              {__('All')} ({filteredDetails?.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // setIsShow(true),
              getRunningData('Running', secondaryFilterDetails);
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
          <TouchableOpacity
            onPress={() => getRunningData('Idle', secondaryFilterDetails)}>
            <Text
              style={[
                styles.catagoryTextActive,
                {
                  backgroundColor:
                    type == 'Idle' ? colors.mainThemeColor1 : '#D8D8D8',
                  color: type == 'Idle' ? colors.white : colors.inputPlaceholdr,
                },
              ]}>
              {__('Stop')}({countObj.Idle})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => getRunningData('In-Active', secondaryFilterDetails)}>
            <Text
              style={[
                styles.catagoryTextActive,
                {
                  backgroundColor:
                    type == 'In-Active' ? colors.mainThemeColor1 : '#D8D8D8',
                  color:
                    type == 'In-Active' ? colors.white : colors.inputPlaceholdr,
                },
              ]}>
              {__('In-Active')}({countObj['In-Active']})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => getRunningData('No GPS', secondaryFilterDetails)}>
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
          <TouchableOpacity
            onPress={() => getRunningData('Waiting', secondaryFilterDetails)}>
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

      <Dashboard2
        details={newsecondaryFilterDetails}
        driverDetails={newSecondaryDriverDetails}
      />
    </ScrollView>
  );
};
export default SecondaryDashboard;
