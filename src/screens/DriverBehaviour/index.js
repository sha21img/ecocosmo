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
import ModalSelector from 'react-native-modal-selector';
import styles from './style';
import {__} from '../../../Utils/Translation/translation';

function DriverBehaviour() {
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
              value="MH12 RN 0790"
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
                  {__('RUNNING')} 14M 38KM/H
                </Text>
                <Text style={styles.driverCarNumber}>{__('MH12 RN 0790')}</Text>
              </View>
              <View style={styles.driverCarDetailsBox}>
                <View style={styles.driverCarDetails}>
                  <Image
                    source={image.clock}
                    style={styles.driverCarDetailsImage}
                  />
                  <Text style={styles.driverCarDetailsText}>
                    17:57:45
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
                  16{__(' KM/H')}
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
                    5790456
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
        </LinearGradient>

        {/*
         */}

        {/*
         */}
        <LinearGradient
          colors={['#395DBF', '#16BCD4']}
          style={{
            paddingHorizontal: 20,
            marginHorizontal: 20,
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
      </LinearGradient>
    </>
  );
}

export default DriverBehaviour;
