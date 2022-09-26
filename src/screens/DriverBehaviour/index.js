import React, {useRef, useState} from 'react';
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
import {VictoryPie, VictoryLegend, VictoryLabel} from 'victory-native';
import moment from 'moment';
const screen = Dimensions.get('window');
function DriverBehaviour(props) {
  const {details} = props.route.params;
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
      console.log('percentagepercentage-=-=-=-=', percentage);
      return parseFloat(`${percentage.toFixed(1)}`);
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
          x: calcu(details?.speed0_to_20Counter),
          y: calcu(details?.speed0_to_20Counter),
        },
    calcu(details?.speed20_to_40Counter) == 0
      ? {x: null, y: null}
      : {
          x: calcu(details?.speed20_to_40Counter),
          y: calcu(details?.speed20_to_40Counter),
        },
    calcu(details?.speed40_to_60Counter) == 0
      ? {x: null, y: null}
      : {
          x: calcu(details?.speed40_to_60Counter),
          y: calcu(details?.speed40_to_60Counter),
        },
    calcu(details?.speed60_to_80Counter) == 0
      ? {x: null, y: null}
      : {
          x: calcu(details?.speed60_to_80Counter),
          y: calcu(details?.speed60_to_80Counter),
        },
    calcu(details?.speed80_to_100Counter) == 0
      ? {x: null, y: null}
      : {
          x: calcu(details?.speed80_to_100Counter),
          y: calcu(details?.speed80_to_100Counter),
        },
    calcu(details?.speed100plusCounter) == 0
      ? {x: null, y: null}
      : {
          x: calcu(details?.speed100plusCounter),
          y: calcu(details?.speed100plusCounter),
        },
  ];
  const [pieRef, setPieRef] = useState({width: 0, height: 0});

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
              style={styles.ignitionOffCont}>
              <View style={styles.ignitionOffBox}>
                <Image
                  source={image.chargePinOff}
                  style={{height: 20, width: 10}}
                />
                <Text style={styles.ignitionText}>
                  {__('Ignition Off')}: {getTime(details.todaysIdleTimeSeconds)}
                </Text>
              </View>
            </LinearGradient>
            <LinearGradient
              colors={['#3C6A74', '#5AB8B5']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              style={styles.linearGrad}>
              <View style={styles.ignitionOnBox}>
                <Image
                  source={image.chargePin}
                  style={{height: 20, width: 10}}
                />
                <Text style={styles.ignitionText}>
                  {__('Ignition On')}:{' '}
                  {getTime(details.todaysIgnitionOnTimeSeconds)}
                </Text>
              </View>
            </LinearGradient>
          </LinearGradient>
          <Text style={styles.speedTxt}>Speed Limit</Text>
          <View style={styles.startNumCont}>
            <View style={styles.startNumBox}>
              <LinearGradient
                colors={['#E6BB0D', '#D97400']}
                style={styles.startGrad}></LinearGradient>
              <Text style={styles.startTxt}>0-20</Text>
            </View>
            <View style={styles.startNumBox}>
              <LinearGradient
                colors={['#FF5050', '#FF5050']}
                style={styles.startGrad}></LinearGradient>
              <Text style={styles.txt}>20-40</Text>
            </View>
            <View style={styles.startGrad}>
              <LinearGradient
                colors={['#68B9FB', '#68B9FB']}
                style={styles.startGrad}></LinearGradient>
              <Text style={styles.txt}>40-60</Text>
            </View>
            <View style={styles.startNumBox}>
              <LinearGradient
                colors={['#FF50DC', '#3B63E2']}
                style={styles.startGrad}></LinearGradient>
              <Text style={styles.txt}>60-80</Text>
            </View>
            <View style={styles.startNumBox}>
              <LinearGradient
                colors={['pink', 'pink']}
                style={styles.startGrad}></LinearGradient>
              <Text style={styles.txt}>80-100</Text>
            </View>
            <View style={styles.startNumBox}>
              <LinearGradient
                colors={['green', 'green']}
                style={styles.startGrad}></LinearGradient>
              <Text style={styles.txt}>100 +</Text>
            </View>
          </View>
          <View
            onLayout={event => {
              var {x, y, width, height} = event.nativeEvent.layout;
              setPieRef({height, width});
            }}>
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
              // labels={d => d.y}

              labelComponent={<VictoryLabel />}
              // radius={({ datum }) => 50 + datum.y * 20}
              labelRadius={({innerRadius}) => innerRadius + 20}
              radius={({datum}) => 80 + datum.y / 1.2}
              innerRadius={65}
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
                top: pieRef.width / 2 - 65,
                left: pieRef.width / 2 - 65,
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
            style={styles.liveTrackGrad}>
            <TouchableOpacity>
              <Text style={styles.liveTrackTxt}>{__('Live Tracking')}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
      </LinearGradient>
    </>
  );
}

export default DriverBehaviour;
