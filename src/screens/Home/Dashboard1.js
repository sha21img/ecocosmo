import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {image} from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import {__} from '../../../Utils/Translation/translation';
import styles from './DashStyle1';

function Dashboard1() {
  return (
    <>
      <View style={styles.card1Container}>
        <Image source={image.car} />
        <View style={{paddingHorizontal: 10}}>
          <Text style={styles.driverCarNumber}>{__('MH12 RN 0790')}</Text>
          <View style={styles.driverCarSpeedBox}>
            <Text style={{fontSize: 10, color: '#46BE30'}}>{'\u2B24'}</Text>
            <Text style={styles.driverCarSpeed}>
              {__('Running 14m 38km/h')}
            </Text>
          </View>
        </View>
      </View>
      {/*  */}
      <View style={{backgroundColor: 'lightgreen', height: 150}}></View>
      {/*  */}
      <LinearGradient
        colors={['#45E384', '#02D958']}
        style={styles.driverCarDetailBox}>
        <View style={styles.imageContainer}>
          <Image source={image.location} style={styles.images} />
          <Image source={image.battery} style={styles.images} />
          <Image source={image.charge} style={styles.images} />
          <Image source={image.shokker} style={styles.images} />
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={styles.driverDetailBox}>
            <Text style={styles.driverDetailText1}>{__('CHECK IN TIME')}</Text>
            <Text style={styles.driverDetailText2}>{__('17:57:45')}</Text>
          </View>
          <View style={styles.driverDetailBox}>
            <Text style={styles.driverDetailText1}>{__('TODAYS ODO')}</Text>
            <Text style={styles.driverDetailText2}>{__('5790456 KM')}</Text>
          </View>
          <View style={styles.driverDetailBox}>
            <Text style={styles.driverDetailText1}>{__('SPEED')}</Text>
            <Text style={styles.driverDetailText2}>{__('16KM./H')}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Image source={image.call} />
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
        colors={['#395DBF', '#16BCD4']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.driverAddressBox}>
        <Text style={styles.driverAddressText}>
          {__('177 New Apollo Mogra Lane Andheri,Mumbai, Bharuch,400069,India')}
        </Text>
      </LinearGradient>
    </>
  );
}

export default Dashboard1;
