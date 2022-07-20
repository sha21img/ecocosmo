import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {image} from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import { __ } from '../../../Utils/Translation/translation';


function Dashboard1() {
  return (
    <>
      <View style={{paddingVertical: 10}}>
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 10,
            elevation: 1,
          }}>
          <Image source={image.car} />

          <View style={{paddingHorizontal: 10}}>
            <Text style={{fontSize: 20, color: '#474747'}}>MH12 RN 0790</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 10, color: '#46BE30'}}>{'\u2B24'}</Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#46BE30',
                  paddingHorizontal: 5,
                }}>
                {__("Running 14m 38km/h")}
              </Text>
            </View>
          </View>
        </View>
        {/*  */}
        <View style={{backgroundColor: 'lightgreen', height: 150}}></View>
        {/*  */}
        <LinearGradient
          colors={['#45E384', '#02D958']}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 15,
            paddingTop: 20,
            paddingHorizontal: 10,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            backgroundColor: '#00D957',
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{paddingHorizontal: 7}}>
              <Text style={{fontSize: 10, color: '#616161'}}>
              {__("CHECK IN TIME")}
              </Text>
              <Text style={{fontSize: 12, color: '#313131'}}>{__("17:57:45")}</Text>
            </View>
            <View style={{paddingHorizontal: 7}}>
              <Text style={{fontSize: 10, color: '#616161'}}>{__("TODAYS ODO")}</Text>
              <Text style={{fontSize: 12, color: '#313131'}}>{__("5790456 KM")}</Text>
            </View>
            <View style={{paddingHorizontal: 7}}>
              <Text style={{fontSize: 10, color: '#616161'}}>{__("SPEED")}</Text>
              <Text style={{fontSize: 12, color: '#313131'}}>{__("16KM./H")}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Image source={image.call} />
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          colors={['#395DBF', '#16BCD4']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={{
            marginHorizontal: 16,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 10,
              color: 'white',
              paddingHorizontal: 5,
              textAlign: 'center',
            }}>
            {__("177 New Apollo Mogra Lane Andheri,Mumbai, Bharuch,400069,India")}
            
          </Text>
        </LinearGradient>
        <View
          style={{
            position: 'absolute',
            bottom: 89,
            right: 0,
            zIndex: 100,
            flexDirection: 'row',
          }}>
          <Image source={image.location} style={{width: 45, height: 45}} />
          <Image source={image.battery} style={{width: 45, height: 45}} />
          <Image source={image.charge} style={{width: 45, height: 45}} />
          <Image source={image.shokker} style={{width: 45, height: 45}} />
        </View>
      </View>
    </>
  );
}

export default Dashboard1;
