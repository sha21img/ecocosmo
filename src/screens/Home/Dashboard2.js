import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {image} from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import {__} from '../../../Utils/Translation/translation';
import styles from './DashStyle2';

function Dashboard2() {
  return (
    <>
      <LinearGradient
        colors={['#BCE2FF', '#FFFFFF']}
        style={styles.card2Container}>
        <View style={styles.cardDetailBox}>
          <View style={styles.driverDetails}>
            <View>
              <Text style={styles.driverCarSpeed}>
                {__('RUNNING')} 14M 38KM/H
              </Text>
              <Text style={styles.driverCarNumber}>MH12 RN 0790</Text>
            </View>
            <View style={styles.driverCarDetailsBox}>
              <View style={styles.driverCarDetails}>
                <Image
                  source={image.clock}
                  style={styles.driverCarDetailsImage}
                />
                <Text style={styles.driverCarDetailsText}>17:57:45</Text>
                <Text style={styles.driverCarDetailsText1}>
                  {__('CHECK-IN TIME')}
                </Text>
              </View>
              <View style={styles.driverCarDetails}>
                <Image
                  source={image.speed}
                  style={styles.driverCarDetailsImage}
                />
                <Text style={styles.driverCarDetailsText}>16 {__('KM/H')}</Text>
                <Text style={styles.driverCarDetailsText1}>{__('SPEED')}</Text>
              </View>
              <View style={styles.driverCarDetails}>
                <Image
                  source={image.distance}
                  style={styles.driverCarDetailsImage1}
                />
                <Text style={styles.driverCarDetailsText}>5790456</Text>
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
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
          }}>
          <LinearGradient
            colors={['#5AB8B5', '#3C6A74']}
            start={{x: 1, y: 0.5}}
            end={{x: 0, y: 0.5}}
            style={{
              flexDirection: 'row',
              width: '65%',
              justifyContent: 'space-around',
              marginHorizontal: 10,
              paddingHorizontal: 5,
              borderRadius: 6,
            }}>
            <View
              style={{
                paddingHorizontal: 18,
                paddingVertical: 6,
                justifyContent: 'center',
              }}>
              <Image
                source={image.locationWhite}
                style={{width: 13, height: 18}}
              />
            </View>
            <LinearGradient
              colors={['#D4D4D4', 'transparent', 'transparent']}
              style={{padding: 0.5}}></LinearGradient>
            <View
              style={{
                paddingHorizontal: 18,
                paddingVertical: 6,
                justifyContent: 'center',
              }}>
              <Image
                source={image.batteryWhite}
                style={{width: 20, height: 15}}
              />
            </View>
            <LinearGradient
              colors={['#D4D4D4', 'transparent', 'transparent']}
              style={{padding: 0.5}}></LinearGradient>
            <View
              style={{
                paddingHorizontal: 18,
                paddingVertical: 6,
                justifyContent: 'center',
              }}>
              <Image
                source={image.cahrgeWhite}
                style={{width: 10, height: 20}}
              />
            </View>
            <LinearGradient
              colors={['#D4D4D4', 'transparent', 'transparent']}
              style={{padding: 0.5}}></LinearGradient>
            <View
              style={{
                paddingHorizontal: 18,
                paddingVertical: 6,
                justifyContent: 'center',
              }}>
              <Image source={image.chargePin} style={{width: 10, height: 18}} />
            </View>
          </LinearGradient>
          <View
            style={{
              flexDirection: 'row',
              width: '30%',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: 10,
            }}>
            <Image source={image.call} style={{padding: 10}} />
          </View>
        </View>
      </LinearGradient>
      <LinearGradient
        colors={['#395DBF', '#16BCD4']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.driverAddressBox}>
        <Text style={styles.driverAddress}>
          {__('177 New Apollo Mogra Lane Andheri,Mumbai, Bharuch,400069,India')}
        </Text>
      </LinearGradient>
    </>
  );
}

export default Dashboard2;
