import React from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {image} from '../../../assets/images';
import {styles} from './style';
import {__} from '../../../Utils/Translation/translation';

const EngineStopPopup = props => {
  const {details} = props;
  //   const data = [
  //     {
  //       id: 1,
  //       image: image.madalImage1,
  //       data: 'LIVE TRACKING',
  //       routeTo: 'LiveMapTracking',
  //     },
  //     {
  //       id: 2,
  //       image: image.singleBook,
  //       data: 'REPORTS',
  //     },
  //     {
  //       id: 3,
  //       image: image.tower,
  //       data: 'GRAPHICAL REPORTS',
  //       routeTo: 'GraphicalReports',
  //     },
  //     {
  //       id: 4,
  //       image: image.doubleBook,
  //       data: 'GROUP REPORTS',
  //       routeTo: 'Reports',
  //     },
  //     {
  //       id: 5,
  //       image: image.P,
  //       data: 'PARKING MODE',
  //     },
  //     {
  //       id: 6,
  //       image: image.modalImage5,
  //       data: 'DRIVER BEHAVIOR',
  //       routeTo: 'DriverBehaviour',
  //     },
  //     {
  //       id: 7,
  //       image: image.modalfrontcar,
  //       data: 'IMMOBILIZER',
  //     },
  //     {
  //       id: 8,
  //       image: image.modalImage7,
  //       data: 'DRIVER DETAILS',
  //     },
  //     {
  //       id: 9,
  //       image: image.modalNav,
  //       data: 'URL TRACKING',
  //     },
  //     {id: 10, image: image.modalmap, data: 'MAP HISTORY'},
  //   ];
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        // visible={true}
        visible={props.visible}
        // onRequestClose={() => props.setVisible(false)}
      >
        <View style={styles.mainContainer}>
          <LinearGradient
            colors={[colors.Modalcolor1, colors.white]}
            style={styles.modalBody}>
            {/* <Image source={image.carUp} style={styles.modaldrager} />
            <Text style={styles.modalSubheading}>
              {details.statusMessage}
            </Text>
            <Text style={styles.modalHead}>{details.deviceId}</Text>

            <TouchableOpacity style={styles.button}>
              <Image source={image.callimg} style={{height: 11, width: 11}} />
              <Text style={styles.buttonText}> {__('Call Driver')}</Text>
            </TouchableOpacity> */}

            {/* <View>
              <View style={styles.modalContentContainer}>
                {data.map(el => {
                  return (
                    <>
                      <View key={el.id} style={styles.modalCardBody}>
                        <Image
                          source={el.image}
                          style={styles.modalCardImage}
                        />
                        <Text style={styles.modalCardText}>{el.data}</Text>
                      </View>
                    </>
                  );
                })}
              </View>
            </View> */}
          </LinearGradient>
        </View>
      </Modal>
    </>
  );
};

export default EngineStopPopup;