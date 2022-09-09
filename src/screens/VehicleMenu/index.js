import React, {useEffect, useState} from 'react';
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
import AddDriver from '../AddDriver';

const VehicleMenu = props => {
  const navigation = useNavigation();
  const [visibles, setVisibles] = useState(false);
  const [modal, setModal] = useState(false);
  const [loginDetails, setLoginDetails] = useState();

  const {details, visible, calling, mobileNumber} = props;
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
      routeTo: 'Reports',
    },
    {
      id: 3,
      image: image.tower,
      data: 'GRAPHICAL REPORTS',
      routeTo: 'GraphicalReports',
    },

    // {
    //   id: 5,
    //   image: image.P,
    //   data: 'PARKING MODE',
    //   routeTo: '',
    // },
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
      routeTo: 'DRIVERDETAILS',
    },
    {
      id: 9,
      image: image.modalNav,
      data: 'URL TRACKING',
      routeTo: 'UrlTracking',
    },
    {id: 10, image: image.modalmap, data: 'MAP HISTORY', routeTo: 'MapHistory'},
  ];
  const navigatorFrom = async data => {
    console.log('5555', data);
    const loginDetail = await Storage.getLoginDetail('login_detail');
    let username = loginDetail.accountId;
    let password = loginDetail.password;
    props.setVisible(false);
    if (data === 'EngineStopPopup') {
      setModal(!modal);
    } else if (data === 'DRIVERDETAILS') {
      setVisibles(!visibles);
    } else {
      // console.log('pppppppppppppppppppppplkm ',details)
      navigation.navigate(data, {details: details});
    }
  };
  const getUserDetails = async () => {
    console.log('vicky');
    const succcess = await Storage.getLoginDetail('login_detail');
    setLoginDetails(succcess);
  };
  useEffect(() => {
    visible && getUserDetails();
  }, [visible]);
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
            {loginDetails?.accountName == 'demo101' ? (
              <View style={styles.disablebutton}>
                <Image
                  source={image.callimg}
                  style={{height: 15, width: 15, marginRight: 7}}
                />
                <Text style={styles.buttonText}>{__('Call')}</Text>
              </View>
            ) : mobileNumber?.mobilenumber !== '' ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => calling(details)}>
                <Image source={image.callimg} style={{height: 11, width: 11}} />
                <Text style={styles.buttonText}> {__('Call Driver')}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.disablebutton}>
                <Image source={image.callimg} style={{height: 11, width: 11}} />
                <Text style={styles.buttonText}> {__('Call Driver')}</Text>
              </TouchableOpacity>
            )}
            <View>
              <View style={styles.modalContentContainer}>
                {data.map(el => {
                  return (
                    <TouchableOpacity
                      key={Math.random()}
                      onPress={() => {
                        navigatorFrom(el.routeTo, {
                          imei: props.details.imei,
                          details: props.details,
                        });
                      }}>
                      <View key={el.id} style={styles.modalCardBody}>
                        {/* {props}props.details */}
                        <Image
                          source={el.image}
                          style={styles.modalCardImage}
                        />
                        <Text style={styles.modalCardText}>{__(el.data)}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </LinearGradient>
        </View>
      </Modal>
      <EngineStopPopup
        visible={modal}
        details={details}
        setVisible={setModal}
      />

      <AddDriver
        visible={visibles}
        setVisible={setVisibles}
        details={details}
      />
    </>
  );
};

export default VehicleMenu;
