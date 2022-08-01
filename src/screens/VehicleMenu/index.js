import React, {useState} from 'react';
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  Share,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {image} from '../../../assets/images';
import {styles} from './style';
import {__} from '../../../Utils/Translation/translation';
import EngineStopPopup from '../EngineStopPopup';
import {useNavigation} from '@react-navigation/native';
import {axiosGetData} from '../../../Utils/ApiController';

import Storage from '../../../Utils/Storage';

const VehicleMenu = props => {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);

  const {details, visible, calling} = props;
  const data = [
    {
      id: 1,
      image: image.madalImage1,
      data: 'LIVE TRACKING',
      routeTo: 'LiveMapTracking',
    },
    {
      id: 2,
      image: image.singleBook,
      data: 'REPORTS',
      routeTo: '',
    },
    {
      id: 3,
      image: image.tower,
      data: 'GRAPHICAL REPORTS',
      routeTo: 'GraphicalReports',
    },
    {
      id: 4,
      image: image.doubleBook,
      data: 'GROUP REPORTS',
      routeTo: 'Reports',
    },
    {
      id: 5,
      image: image.P,
      data: 'PARKING MODE',
      routeTo: '',
    },
    {
      id: 6,
      image: image.modalImage5,
      data: 'DRIVER BEHAVIOR',
      routeTo: 'DriverBehaviour',
    },
    {
      id: 7,
      image: image.modalfrontcar,
      data: 'IMMOBILIZER',
      routeTo: 'EngineStopPopup',
    },
    {
      id: 8,
      image: image.modalImage7,
      data: 'DRIVER DETAILS',
      routeTo: '',
    },
    {
      id: 9,
      image: image.modalNav,
      data: 'URL TRACKING',
      routeTo: 'UrlTracking',
    },
    {id: 10, image: image.modalmap, data: 'MAP HISTORY', routeTo: ''},
  ];
  const navigatorFrom = async data => {
    props.setVisible(false);
    if (data === 'UrlTracking') {
      const response = await axiosGetData(
        `gettrackurl/rrenterprises/25f9e794323b453885f5181f1b624d0b/351608080772390/ecvalidate/24`,
      );
      try {
        const result = await Share.share({
          message: response.data.message,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    } else {
      navigation.navigate(data);
    }
  };
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => props.setVisible(false)}>
        <View style={styles.mainContainer}>
          <LinearGradient
            colors={[colors.Modalcolor1, colors.white]}
            style={styles.modalBody}>
            <Image source={image.carUp} style={styles.modaldrager} />
            <Text style={styles.modalSubheading}>
              {details.statusMessage}
              {/* {__('RUNNING')} 14M 38KM/H */}
            </Text>
            <Text style={styles.modalHead}>{details.deviceId}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => calling(details)}>
              <Image source={image.callimg} style={{height: 11, width: 11}} />
              <Text style={styles.buttonText}> {__('Call Driver')}</Text>
            </TouchableOpacity>

            <View>
              <View style={styles.modalContentContainer}>
                {data.map(el => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigatorFrom(el.routeTo);
                      }}>
                      <View key={el.id} style={styles.modalCardBody}>
                        <Image
                          source={el.image}
                          style={styles.modalCardImage}
                        />
                        <Text style={styles.modalCardText}>{el.data}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </LinearGradient>
        </View>
      </Modal>
      <EngineStopPopup visible={modal} setVisible={setModal} />
    </>
  );
};

export default VehicleMenu;
