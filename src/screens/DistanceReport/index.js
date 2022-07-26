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

function DistanceReport() {
  return (
    <>
      <LinearGradient
        colors={['#16BCD4', '#395DBF']}
        style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.headerDashboard}>
            <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
              <Image source={image.backArrow} />
            </TouchableOpacity>
            <TextInput
              style={styles.dashboardText}
              editable={false}
              value="Distance Reports"
            />
          </View>
          <View style={styles.alertContainer}>
            <Image source={image.search} style={styles.searchIcon} />
            <Image source={image.search} style={styles.searchIcon} />
          </View>
        </View>
      </LinearGradient> 
    </>
  );
}

export default DistanceReport;
