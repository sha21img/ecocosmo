import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {image} from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import {__} from '../../../Utils/Translation/translation';
import {VictoryPie, VictoryLegend} from 'victory-native';
import moment from 'moment';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;

function DriverBehaviour(props) {
  const {details} = props.route.params;
  console.log(
    'detaaaaaaaaails',
    parseFloat(details.speed0_to_20Counter),
    parseFloat(details.speed20_to_40Counter),
    parseFloat(details.speed40_to_60Counter),
    parseFloat(details.speed60_to_80Counter),
    parseFloat(details.speed80_to_100Counter),
    parseFloat(details.speed100plusCounter),
  );

  const date = parseFloat(details.validPacketTimeStamp) + 19800;
  const filterDate = moment.unix(date).format('DD-MM-YYYY');
  const filterTime = moment.unix(date).format('hh:mm:ss');

  const calcu = perc => {
    const TotalCounter =
      parseFloat(details.speed0_to_20Counter) +
      parseFloat(details.speed20_to_40Counter) +
      parseFloat(details.speed40_to_60Counter) +
      parseFloat(details.speed60_to_80Counter) +
      parseFloat(details.speed80_to_100Counter) +
      parseFloat(details.speed100plusCounter);
    if (perc == 0) {
      console.log('zero');
      return 0;
    } else {
      let percentage = (perc / TotalCounter) * 100;
      return `${percentage.toFixed(1)}`;
    }
  };

  const getTime = secs => {
    var minutes = Math.floor(secs / 60);
    var hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    let time = `${hours.toString().length == 1 ? '0' + hours : hours}hr ${
      minutes.toString().length == 1 ? '0' + minutes : minutes
    }min`;
    return time;
  };

  const driverBehaviourData = [
    calcu(details?.speed0_to_20Counter) == 0
      ? {x: null, y: null}
      : {
          x: `${calcu(details?.speed0_to_20Counter)}`,
          y: `${calcu(details?.speed0_to_20Counter)}`,
        },
    calcu(details?.speed20_to_40Counter) == 0
      ? {x: null, y: null}
      : {
          x: `${calcu(details?.speed20_to_40Counter)}`,
          y: `${calcu(details?.speed20_to_40Counter)}`,
        },
    calcu(details?.speed40_to_60Counter) == 0
      ? {x: null, y: null}
      : {
          x: `${calcu(details?.speed40_to_60Counter)}`,
          y: `${calcu(details?.speed40_to_60Counter)}`,
        },
    calcu(details?.speed60_to_80Counter) == 0
      ? {x: null, y: null}
      : {
          x: `${calcu(details?.speed60_to_80Counter)}`,
          y: `${calcu(details?.speed60_to_80Counter)}`,
        },
    calcu(details?.speed80_to_100Counter) == 0
      ? {x: null, y: null}
      : {
          x: `${calcu(details?.speed80_to_100Counter)}`,
          y: `${calcu(details?.speed80_to_100Counter)}`,
        },
    calcu(details?.speed100plusCounter) == 0
      ? {x: null, y: null}
      : {
          x: `${calcu(details?.speed100plusCounter)}`,
          y: `${calcu(details?.speed100plusCounter)}`,
        },
  ];
  return (
    <>
      <LinearGradient
        colors={['#16BCD4', '#395DBF']}
        style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.headerDashboard}>
            <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
              <Image source={image.drawer} style={{height: 20, width: 23}} />
            </TouchableOpacity>
            <TextInput
              style={styles.dashboardText}
              editable={false}
              value={details.deviceId}
            />
          </View>
          <View style={styles.alertContainer}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Notifications')}>
              <Image
                source={image.Notification1}
                style={{height: 30, width: 30, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={image.search} style={styles.searchIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <LinearGradient
            colors={['#BCE2FF', '#FFFFFF']}
            style={styles.card2Container}>
            <View style={styles.cardDetailBox}>
              <View style={styles.driverDetails}>
                <View>
                  <Text style={styles.driverCarSpeed}>
                    {details.statusMessage}
                  </Text>
                  <Text style={styles.driverCarNumber}>{details.deviceId}</Text>
                </View>
              </View>
              <View style={styles.driverCarDetailsBox}>
                <View style={styles.driverCarDetails}>
                  <Image
                    source={image.clock}
                    style={styles.driverCarDetailsImage}
                  />
                  <Text style={styles.driverCarDetailsText}>{filterDate}</Text>
                  <Text style={styles.driverCarDetailsText}>{filterTime}</Text>
                  <Text style={styles.driverCarDetailsText1}>
                    {__('CHECK IN DATE & TIME')}
                  </Text>
                </View>
                <View style={styles.driverCarDetails}>
                  <Image
                    source={image.speed}
                    style={styles.driverCarDetailsImage}
                  />
                  <Text style={styles.driverCarDetailsText}>
                    {Math.floor(details.speed)} {__('KM/H')}
                  </Text>
                  <Text style={styles.driverCarDetailsText1}>
                    {__('SPEED')}
                  </Text>
                </View>
                <View style={styles.driverCarDetails}>
                  <Image
                    source={image.distance}
                    style={styles.driverCarDetailsImage1}
                  />
                  <Text style={styles.driverCarDetailsText}>
                    {Math.floor(details.todaysODO)}
                  </Text>
                  <Text style={styles.driverCarDetailsText1}>
                    {__("TODAY'S ODO")}
                  </Text>
                </View>
                <View style={styles.driverCarBox}>
                  <Image
                    source={{uri: details.equipmentIcon}}
                    style={styles.driverCar}
                  />
                </View>
              </View>
            </View>
            <LinearGradient
              colors={['#3C6A74', '#5AB8B5']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              style={{
                backgroundColor: 'red',
                position: 'absolute',
                padding: 10,
                borderTopLeftRadius: 7,
                borderTopRightRadius: 7,
                bottom: -20,
                left: 20,
                minWidth: 175,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={image.chargePinOff}
                  style={{height: 20, width: 10}}
                />
                <Text style={{paddingLeft: 7, fontSize: 12, color: 'white'}}>
                  {__('Ignition Off')}: {getTime(details.todaysIdleTimeSeconds)}
                </Text>
              </View>
            </LinearGradient>
            <LinearGradient
              colors={['#3C6A74', '#5AB8B5']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              style={{
                backgroundColor: 'red',
                position: 'absolute',
                padding: 10,
                borderBottomLeftRadius: 7,
                borderBottomRightRadius: 7,
                bottom: -60,
                minWidth: 175,
                left: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={image.chargePin}
                  style={{height: 20, width: 10}}
                />
                <Text style={{paddingLeft: 7, fontSize: 12, color: 'white'}}>
                  {__('Ignition On')}:{' '}
                  {getTime(details.todaysIgnitionOnTimeSeconds)}
                </Text>
              </View>
            </LinearGradient>
          </LinearGradient>
          <Text
            style={{
              alignSelf: 'center',
              color: 'white',
              marginTop: 60,
              fontSize: 20,
              fontWeight: 'bold',
              paddingVertical: 10,
            }}>
            Speed Limit
          </Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                justifyContent: 'center',
                paddingHorizontal: 10,
                alignItems: 'center',
              }}>
              <LinearGradient
                colors={['#E6BB0D', '#D97400']}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                }}></LinearGradient>
              <Text
                style={{
                  fontSize: 16,
                  color: 'white',
                  alignSelf: 'center',
                }}>
                0-20
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',

                paddingHorizontal: 10,
              }}>
              <LinearGradient
                colors={['#FF5050', '#FF5050']}
                style={{
                  width: 20,
                  borderRadius: 4,
                  height: 20,
                }}></LinearGradient>
              <Text style={{fontSize: 16, color: 'white'}}>20-40</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
              }}>
              <LinearGradient
                colors={['#68B9FB', '#68B9FB']}
                style={{
                  width: 20,
                  borderRadius: 4,
                  height: 20,
                }}></LinearGradient>
              <Text style={{fontSize: 16, color: 'white'}}>40-60</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
              }}>
              <LinearGradient
                colors={['#FF50DC', '#3B63E2']}
                style={{
                  width: 20,
                  borderRadius: 4,
                  height: 20,
                }}></LinearGradient>
              <Text style={{fontSize: 16, color: 'white'}}>60-80</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
              }}>
              <LinearGradient
                colors={['pink', 'pink']}
                style={{
                  width: 20,
                  borderRadius: 4,
                  height: 20,
                }}></LinearGradient>
              <Text style={{fontSize: 16, color: 'white'}}>80-100</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
              }}>
              <LinearGradient
                colors={['green', 'green']}
                style={{
                  width: 20,
                  borderRadius: 4,
                  height: 20,
                }}></LinearGradient>
              <Text style={{fontSize: 16, color: 'white'}}>100 +</Text>
            </View>
          </View>
          <View>
            <VictoryPie
              animate={{
                duration: 1000,
                easing: 'bounce',
              }}
              data={driverBehaviourData}
              colorScale={[
                '#16BCD4',
                '#E6BB0D',
                '#FF5050',
                '#E653DD',
                'pink',
                'green',
              ]}
              labelRadius={({innerRadius}) => innerRadius + 20}
              radius={({datum}) => 80 + datum.y / 3}
              innerRadius={65}
              height={450}
              style={{
                labels: {
                  fill: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                },
              }}
            />
            <View
              style={{
                position: 'absolute',
                height: 130,
                width: 130,
                bottom: screen.height / 5,
                left: screen.width / 3,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
                backgroundColor: 'white',
                borderRadius: 100,
                elevation: 5,
                zIndex: 10,
              }}>
              <Text
                style={{color: '#434343', fontSize: 14, fontWeight: 'bold'}}>
                {__('Vehicle Speed')}
              </Text>
              <Text
                style={{color: '#434343', fontSize: 14, fontWeight: 'bold'}}>
                (%)
              </Text>
            </View>
          </View>
          {/*
           */}
          <LinearGradient
            colors={['#395DBF', '#16BCD4']}
            style={{
              paddingHorizontal: 20,
              marginHorizontal: 40,
              marginVertical: 20,
              paddingVertical: 20,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#16BCD4',
            }}>
            <TouchableOpacity>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                {__('Live Tracking')}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
      </LinearGradient>
    </>
  );
}

export default DriverBehaviour;
