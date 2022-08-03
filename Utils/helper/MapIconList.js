import React from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import {image} from '../../assets/images';

function MapIconList() {
  const data = [
    {imgUrl: image.vehicleon},
    {imgUrl: image.parking2},
    {imgUrl: image.trafficlight},
    {imgUrl: image.map},
    {imgUrl: image.alllocation},
    {imgUrl: image.share},
    {imgUrl: image.keep},
    {imgUrl: image.graph},
    {imgUrl: image.earth},
  ];
  return data.map((item, index) => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 75 + 50 * index,
          right: 0,
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
        }}>
        <View style={{width: '10%'}}></View>
        <View style={{width: '65%'}}></View>
        <TouchableOpacity
          style={{
            width: '15%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'red',
          }}>
          <Image source={item.imgUrl} style={{width: 65, height: 65}} />
        </TouchableOpacity>
      </View>
    );
  });
}

export default MapIconList;
