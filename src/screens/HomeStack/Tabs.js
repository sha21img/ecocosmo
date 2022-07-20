import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {image} from '../../../assets/images';

function Tabs({color, tab, onPress, icon, selected, index}) {
  console.log('selected', selected);
  // const icons=icon
  console.log('tab', tab);
  return (
    <TouchableOpacity
      onPress={() => onPress(tab.name, index)}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
      }}>
      <Image
        source={image[icon]}
        resizeMode="contain"
        style={{
          width: 40,
          height: 40,
        }}
      />
    </TouchableOpacity>
  );
}

export default Tabs;
