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
import styles from './style';
import {__} from '../../../Utils/Translation/translation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Picker from '../common/Picker';
import {VictoryBar, VictoryChart, VictoryTheme} from 'victory-native';

function DistanceReport(props) {
  const [isVisible, setIsVisible] = useState(false);
  const data = [
    {
      name: 'vicky',
    },
    {
      name: 'shashank',
    },
    {
      name: 'asish',
    },
    {
      name: 'pushkar',
    },
  ];
  const onHandle = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      <LinearGradient
        colors={['#16BCD4', '#395DBF']}
        style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.headerDashboard}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Image source={image.backArrow} />
            </TouchableOpacity>
            <TextInput
              style={styles.dashboardText}
              editable={false}
              value="Distance Reports"
            />
          </View>
          <View style={styles.alertContainer}>
            <Image source={image.reportIcon} style={styles.searchIcon} />
            <Image source={image.search} style={styles.searchIcon} />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            paddingVertical: 10,
            // backgroundColor: 'blue',
            paddingHorizontal: 20,
            justifyContent: 'space-between',
          }}>
          {/* <View style={{flexDirection: 'row'}}> */}
          <TouchableOpacity
            // onPress={() => setIsVisible(!isVisible)}
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              paddingHorizontal: 15,
              paddingVertical: 12,
              width: '60%',
              borderRadius: 7,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 14}}>Select vehicle number</Text>
            {/* <Picker data={data} isVisible={isVisible} onPress={onHandle} /> */}
            <MaterialIcons
              style={{
                color: '#3D3D3D',
                fontSize: 16,
              }}
              name={'keyboard-arrow-down'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{width: '35%'}}>
            <LinearGradient
              colors={['#00D957', '#2ACBA1', '#5EB9FF']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              // onPress={() => setIsVisible(!isVisible)}
              style={{
                flexDirection: 'row',
                paddingHorizontal: 15,
                paddingVertical: 12,
                // width: '35%',
                borderRadius: 7,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 14, color: 'white'}}>Yesterday</Text>
              {/* <Picker data={data} isVisible={isVisible} onPress={onHandle} /> */}
              <MaterialIcons
                style={{
                  color: '#3D3D3D',
                  fontSize: 16,
                }}
                name={'keyboard-arrow-down'}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingHorizontal: 20,
          justifyContent: 'space-between',
          paddingVertical: 10,
        }}>
        {/* <View style={{flexDirection: 'row'}}> */}
        <TouchableOpacity
          // onPress={() => setIsVisible(!isVisible)}
          style={{
            borderWidth: 1,
            borderColor: '#D9D9D9',
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingVertical: 12,
            width: '47%',
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 14}}>From Date</Text>
          {/* <Picker data={data} isVisible={isVisible} onPress={onHandle} /> */}
          <MaterialIcons
            style={{
              color: '#3D3D3D',
              fontSize: 16,
            }}
            name={'keyboard-arrow-down'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() => setIsVisible(!isVisible)}
          style={{
            borderColor: '#D9D9D9',
            borderWidth: 1,
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingVertical: 12,
            width: '47%',
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 14}}>From Date</Text>
          {/* <Picker data={data} isVisible={isVisible} onPress={onHandle} /> */}
          <MaterialIcons
            style={{
              color: '#3D3D3D',
              fontSize: 16,
            }}
            name={'keyboard-arrow-down'}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          backgroundColor: 'lightgreen',
        }}>
        <View style={{width: '10%', backgroundColor: 'lightblue', padding: 20}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            Odometer Total km
          </Text>
          <TouchableOpacity style={{paddingVertical: 5}}>
            <Image source={image.shareDark} style={{width: 22, height: 22}} />
          </TouchableOpacity>
        </View>
        <View style={{width: '100%', backgroundColor: 'lightpink'}}>
          <VictoryChart width={350}>
            <VictoryBar
              data={[
                {year: '1900', earnings: 10000},
                {year: '2012', earnings: 16500},
                {year: '2013', earnings: 14250},
                {year: '2014', earnings: 19000},
              ]}
              x="quarter"
              y="earnings"
            />
          </VictoryChart>
        </View>
      </View>
    </>
  );
}

export default DistanceReport;

// <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
// <Text>oiyhhlu</Text>
// </TouchableOpacity>
// <Picker data={data} isVisible={isVisible} onPress={onHandle} />
