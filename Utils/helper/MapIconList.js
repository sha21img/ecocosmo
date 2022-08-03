import React from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import {image} from '../../assets/images';

function MapIconList({handlePress}) {
  const data = [
    {imgUrl: image.vehicleon, route: ''},
    {imgUrl: image.parking2, route: ''},
    {imgUrl: image.trafficlight, route: ''},
    {imgUrl: image.map, route: 'MapHistory'},
    {imgUrl: image.alllocation, route: 'GroupMapTracking'},
    {imgUrl: image.share, route: ''},
    {imgUrl: image.keep, route: 'Reports'},
    {imgUrl: image.graph, route: 'GraphicalReports'},
    {imgUrl: image.earth, route: 'NearbyPlaces'},
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
          onPress={() => handlePress(item.route)}
          style={{
            width: '15%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={item.imgUrl} style={{width: 65, height: 65}} />
        </TouchableOpacity>
      </View>
    );
  });
}

export default MapIconList;
