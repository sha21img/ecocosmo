import React, {useEffect} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {image} from '../../../assets/images';
import {styles} from './style';
import {__} from '../../../Utils/Translation/translation';
import axios from 'axios';

const NearbyPlaces = props => {
  const places = [
    {
      id: 1,
      img: image.petrolPump,
      name: 'PETROL PUMP',
      data: 'petrolpump',
    },
    {
      id: 2,
      img: image.cng,
      name: 'CNG STATION',
      data: 'cng',
    },
    {
      id: 3,
      img: image.charging,
      name: 'CHARGING STATION',
      data: 'charge',
    },
    {
      id: 4,
      img: image.atm,
      name: 'ATM',
      data: 'atm',
    },
    {
      id: 5,
      img: image.parking,
      name: 'PARKING',
      data: 'parking',
    },
    {
      id: 6,
      img: image.policestation,
      name: 'POLICE STATION',
      data: 'police',
    },
    {
      id: 7,
      img: image.Hospital,
      name: 'HOSPITAL',
      data: 'hospital',
    },
    {
      id: 8,
      img: image.chemist,
      name: 'CHEMISTS',
      data: 'chemist',
    },
    {
      id: 9,
      img: image.hotel,
      name: 'HOTEL',
      data: 'hotel',
    },
    {
      id: 10,
      img: image.nightShelter,
      name: 'NIGHT SHELTERS',
      data: 'night',
    },
  ];

  return (
    <>
      <LinearGradient
        colors={[colors.mainThemeColor2, colors.mainThemeColor1]}
        start={{x: 1.5, y: 0}}
        style={styles.main}>
        <View style={styles.header}>
          <View style={styles.headerContent1}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{paddingVertical: 7}}>
              <Image source={image.backArrow} style={{height: 12, width: 23}} />
            </TouchableOpacity>
            <Text style={styles.headerContentText}>{__('Nearby Places')}</Text>
          </View>
          <Image source={image.search} />
        </View>
        <View style={styles.contentContainer}>
          {places.map(element => {
            return (
              <LinearGradient
                colors={[colors.Modalcolor1, colors.white]}
                key={element.id}
                style={styles.content}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('Nearby', {data: element.data})
                  }
                  style={styles.placeItem}>
                  <Image source={element.img} />
                  <Text style={styles.contentText}>{element.name}</Text>
                </TouchableOpacity>
              </LinearGradient>
            );
          })}
        </View>
      </LinearGradient>
    </>
  );
};
export default NearbyPlaces;
