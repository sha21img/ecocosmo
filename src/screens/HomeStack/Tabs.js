import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {image} from '../../../assets/images';

function Tabs({tab, onPress, icon, isSelected, index}) {
  console.log('isSelected', isSelected);
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(tab.name, index);
      }}
      style={{
        alignItems: 'center',
      }}>
      <Image
        source={
          tab.name == isSelected
            ? image[icon]
            : tab.name == 'Home'
            ? image.homeUnselected
            : tab.name == 'Chat'
            ? image.home2unselected
            : tab.name == 'Notifications'
            ? image.notifyUnSelected
            : tab.name == 'CustomerProfile'
            ? image.customerprofileUnSelect
            : tab.name == 'Setting'
            ? image.settingUnSelect
            : null
        }
        resizeMode="contain"
        style={{
          width: 40,
          height: 40,
        }}
      />
      <Text style={{color: 'white', marginTop: 5}}>
        {tab.name == 'CustomerProfile' ? 'Profile' : tab.name}
      </Text>
    </TouchableOpacity>
  );
}

export default Tabs;
