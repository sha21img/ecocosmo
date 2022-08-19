import React from 'react';
import {__} from '../../../Utils/Translation/translation';
import {Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';
import {image} from '../../../assets/images';
import {styles} from './style';

const renewalData = [
  {
    name: 'MH12 RN 0790',
    expiryDate: '3-07-2022',
    amount: 40.0,
    image: image.whiteCar,
  },
  {
    name: 'MH12 RN 0790',
    expiryDate: '3-07-2022',
    amount: 40.0,
    image: image.whiteCar,
  },
  {
    name: 'MH12 RN 0790',
    expiryDate: '3-07-2022',
    amount: 40.0,
    image: image.whiteCar,
  },
  {
    name: 'MH12 RN 0790',
    expiryDate: '3-07-2022',
    amount: 40.0,
    image: image.whiteCar,
  },
  {
    name: 'MH12 RN 0790',
    expiryDate: '3-07-2022',
    amount: 40.0,
    image: image.whiteCar,
  },
];

const Renewal = props => {
  return (
    <>
      <LinearGradient
        colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.header}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={{paddingVertical: 10}}
            onPress={() => props.navigation.goBack()}>
            <Image source={image.backArrow} style={{height: 12, width: 23}} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: Size.large,
              color: colors.white,
            }}>
            {__('Renewals')}
          </Text>
        </View>
      </LinearGradient>
      <LinearGradient
        style={{height: '100%', paddingHorizontal: 16, paddingVertical: 15}}
        colors={[colors.Modalcolor1, colors.white]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {renewalData.map(el => {
            return (
              <View key={Math.random()} style={styles.Card}>
                <Image source={el.image} style={{height: 44, width: 19}} />
                <View style={{width: '80%'}}>
                  <Text
                    style={{
                      fontSize: Size.extraLarge,
                      color: colors.black,
                      marginBottom: 3,
                    }}>
                    {el.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: Size.small,
                      color: colors.greym,
                      marginBottom: 3,
                    }}>
                    {__('Expiry Date')}: {el.expiryDate}
                  </Text>
                  <Text
                    style={{
                      fontSize: Size.small,
                      color: colors.grey,
                      marginBottom: 3,
                    }}>
                    {__('Amount')}:
                    <Text style={{color: colors.black}}>${el.amount}</Text>
                  </Text>
                </View>
                <Image source={image.selected} />
              </View>
            );
          })}
          <LinearGradient
            colors={[colors.largeBtn1, colors.largeBtn2]}
            style={styles.loginButton}>
            <Text style={styles.loginButtonText}>{__('Submit')}</Text>
          </LinearGradient>
        </ScrollView>
      </LinearGradient>
    </>
  );
};
export default Renewal;
