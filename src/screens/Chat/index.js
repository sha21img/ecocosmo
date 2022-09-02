import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';
import {image} from '../../../assets/images';
import {__} from '../../../Utils/Translation/translation';
import styles from './style';

const Chat = props => {
  return (
    <>
      <LinearGradient
        colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.header}>
        <View style={styles.headerContainer}>
          <View style={styles.headerImageCont}>
            <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
              <Image
                source={image.drawer}
                style={{height: 20, width: 23, marginVertical: 5}}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: Size.large,
                color: colors.white,
                paddingHorizontal: 10,
              }}>
              {__('Chat')}
            </Text>
          </View>
          <TouchableOpacity style={{flexDirection: 'row'}}>
            <Image source={image.search} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <LinearGradient colors={['#BCE2FF', '#FFFFFF']} style={{flex: 1}}>
        {[0, 0, 0, 0, 0, 0].map(() => {
          return (
            <TouchableOpacity
              style={{
                padding: 10,
                flexDirection: 'row',
                width: '100%',
                backgroundColor: 'white',
                marginBottom: 1.5,
              }}>
              <TouchableOpacity style={{width: '15%'}}>
                <Image
                  source={image.customerprofile}
                  style={{width: 55, height: 55}}
                />
              </TouchableOpacity>
              <View
                style={{
                  paddingLeft: 10,
                  width: '84%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      marginTop: 5,
                      fontWeight: 'bold',
                      fontSize: 18,
                      width: '70%',
                    }}>
                    James Robinson
                  </Text>
                  <Text style={{fontSize: 16}}>10:34 AM</Text>
                </View>
                <Text
                  numberOfLines={1}
                  style={{
                    paddingVertical: 5,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Please Track the Location & send me the exact...
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </LinearGradient>
    </>
  );
};

export default Chat;
