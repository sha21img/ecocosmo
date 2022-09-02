import {Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {image} from '../../../assets/images';
import {__} from '../../../Utils/Translation/translation';
import styles from './style';

const Chat = props => {
  return (
    <LinearGradient
      colors={['#16BCD4', '#395DBF']}
      style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.headerDashboard}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image source={image.backArrow} />
          </TouchableOpacity>
          <Text style={styles.dashboardText}> Numerical Report</Text>
          {/* <TextInput editable={false} value={__('Distance Reports')} /> */}
        </View>
        <View style={styles.alertContainer}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('GraphicalReports', {
                newImei: newImei,
              })
            }>
            <Image source={image.graph} style={{height: 35, width: 35}} />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};
export default Chat;
