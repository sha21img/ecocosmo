import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {image} from '../../../assets/images';
import {styles} from './style';
import { __ } from '../../../Utils/Translation/translation';


const VehicleMenu = () => {
  const data = [
    {
      id: 1,
      image: image.madalImage1,
      data: 'LIVE TRACKING',
    },
    {
      id: 2,
      image: image.singleBook,
      data: 'REPORTS',
    },
    {
      id: 3,
      image: image.tower,
      data: 'GRAPHICAL REPORTS',
    },
    {
      id: 4,
      image: image.doubleBook,
      data: 'GROUP REPORTS',
    },
    {
      id: 5,
      image: image.P,
      data: 'PARKING MODE',
    },
    {
      id: 6,
      image: image.modalImage5,
      data: 'DRIVER BEHAVIOR',
    },
    {
      id: 7,
      image: image.modalfrontcar,
      data: 'IMMOBILIZER',
    },
    {
      id: 8,
      image: image.modalImage7,
      data: 'DRIVER DETAILS',
    },
    {
      id: 9,
      image: image.modalNav,
      data: 'URL TRACKING',
    },
    {id: 10, image: image.modalmap, data: 'MAP HISTORY'},
  ];
  return (
    <>
      <View style={styles.mainContainer}>
        <LinearGradient
          colors={[colors.Modalcolor1, colors.white]}
          style={styles.modalBody}>
          <Image source={image.carUp} style={styles.modaldrager} />
          <Text style={styles.modalSubheading}>{__("RUNNING 14M 38KM/H")}</Text>
          <Text style={styles.modalHead}>{__("MH12 RN 0790")}</Text>

          <TouchableOpacity style={styles.button}>
            <Image source={image.call} style={{height: 15, width: 15}} />
            <Text style={styles.buttonText}> {__("Call Driver")}</Text>
          </TouchableOpacity>

          <View >
           <View style={styles.modalContentContainer}>
           {data.map(el => {
              return (
                <>
                  <View key={el.id} style={styles.modalCardBody}>
                    <Image source={el.image} style={styles.modalCardImage} />
                    <Text style={styles.modalCardText}>{el.data}</Text>
                  </View>
                </>
              );
            })}
           </View>
          </View>
        </LinearGradient>
      </View>
    </>
  );
};

export default VehicleMenu;
