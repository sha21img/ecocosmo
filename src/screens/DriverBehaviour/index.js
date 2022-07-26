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
import {VictoryPie, VictoryLegend} from 'victory-native';

function DriverBehaviour() {
  return (
    <>
      <LinearGradient
        colors={['#16BCD4', '#395DBF']}
        style={styles.mainContainer}>

        <ScrollView>
          <View style={styles.headerContainer}>
            <View style={styles.headerDashboard}>
              <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                <Image source={image.drawer} style={{height: 20, width: 23}} />
              </TouchableOpacity>
              <TextInput
                style={styles.dashboardText}
                editable={false}
                value="Dashboard 1"
              />
            </View>
            <View style={styles.alertContainer}>
              <Image source={image.Alert} />
              <Image source={image.search} style={styles.searchIcon} />
            </View>
          </View>
          <LinearGradient
            colors={['#BCE2FF', '#FFFFFF']}
            style={styles.card2Container}>
            <View style={styles.cardDetailBox}>
              <View style={styles.driverDetails}>
                <View>
                  <Text style={styles.driverCarSpeed}>
                    {__('RUNNING 14M 38KM/H')}
                  </Text>
                  <Text style={styles.driverCarNumber}>
                    {__('MH12 RN 0790')}
                  </Text>
                </View>

                <View style={styles.driverCarDetailsBox}>
                  <View style={styles.driverCarDetails}>
                    <Image
                      source={image.clock}
                      style={styles.driverCarDetailsImage}
                    />
                    <Text style={styles.driverCarDetailsText}>
                      {__('17:57:45')}
                    </Text>
                    <Text style={styles.driverCarDetailsText1}>
                      {__('CHECK-IN TIME')}
                    </Text>
                  </View>
                  <View style={styles.driverCarDetails}>
                    <Image
                      source={image.speed}
                      style={styles.driverCarDetailsImage}
                    />
                    <Text style={styles.driverCarDetailsText}>
                      {__('16 KM/H')}
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
                      {__('5790456')}
                    </Text>
                    <Text style={styles.driverCarDetailsText1}>
                      {__("TODAY'S ODO")}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.driverCarBox}>
                <Image source={image.carUp} style={styles.driverCar} />
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
                borderRadius: 7,
                bottom: -20,
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
                  Ignition Off : 15hr 8min
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
                borderRadius: 7,
                bottom: -20,
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
                  Ignition On : 15hr 8min
                </Text>
              </View>
            </LinearGradient>
          </LinearGradient>
          {/*
           */}
          <View>
            <VictoryLegend
              x={40}
              y={40}
              symbolSpacer={15}
              title="Speed Limit"
              centerTitle
              orientation="horizontal"
              gutter={30}
              height={100}
              style={{
                labels: {fontSize: 16, fill: 'white'},
                title: {fontSize: 18, fill: 'white', fontFamily: 'bold'},
              }}
              data={[
                {name: '0-20', symbol: {fill: '#E6BB0D'}},
                {name: '20-40', symbol: {fill: '#FF5050'}},
                {name: '40-60', symbol: {fill: '#68B9FB'}},
                {name: '60-80', symbol: {fill: '#FF50DC'}},
              ]}
            />
            <VictoryPie
              animate={{
                duration: 1000,
                easing: 'bounce',
              }}
              data={[
                {y: 20, x: '20%'},
                {y: 100, x: '40%'},
                {y: 60, x: '20%'},
                {y: 80, x: '20%'},
              ]}
              colorScale={['#16BCD4', '#E6BB0D', '#FF5050', '#E653DD']}
              labelRadius={({innerRadius}) => innerRadius + 20}
              radius={({datum}) => 80 + datum.y}
              innerRadius={70}
              height={400}
              style={{
                labels: {
                  fill: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                  backgroundColor: 'red',
                },
              }}
            />
            <View
              style={{
                position: 'absolute',
                height: 140,
                width: 140,
                top: 230,
                left: 135.5,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
                backgroundColor: 'white',
                borderRadius: 100,
                elevation: 5,
              }}>
              <Text
                style={{color: '#434343', fontSize: 14, fontWeight: 'bold'}}>
                Vehicle Speed
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
              marginBottom: 20,
              paddingVertical: 20,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#16BCD4',
            }}>
            <TouchableOpacity>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                Live Tracking
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
      </LinearGradient>
    </>
  );
}

export default DriverBehaviour;
