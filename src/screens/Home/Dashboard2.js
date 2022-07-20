import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {image} from '../../../assets/images'
import LinearGradient from 'react-native-linear-gradient';
import { __ } from '../../../Utils/Translation/translation';


function Dashboard2() {
  return (
    <>
      <View style={{paddingVertical: 10}}>
        <LinearGradient
          colors={['#BCE2FF', '#FFFFFF']}
          style={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
            }}>
            <View
              style={{
                width: '70%',
                padding: 10,
              }}>
              <View>
                <Text style={{color: '#009824', fontSize: 12}}>
                {__("RUNNING 14M 38KM/H")}
                </Text>
                <Text
                  style={{color: '#434343', fontSize: 18, fontWeight: 'bold'}}>
                  {__("MH12 RN 0790")}
                </Text>
              </View>
              <View style={{flexDirection: 'row', paddingVertical: 15}}>
                <View style={{paddingRight: 10}}>
                  <Image
                    source={image.clock}
                    style={{width: 17, height: 17, marginVertical: 5}}
                  />

                  <Text
                    style={{
                      color: '#434343',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    {__("17:57:45")}
                  </Text>
                  <Text style={{color: '#434343', fontSize: 10}}>
                  {__("CHECK-IN TIME")}
                  </Text>
                </View>
                <View style={{paddingRight: 10}}>
                  <Image
                    source={image.speed}
                    style={{width: 17, height: 17, marginVertical: 5}}
                  />

                  <Text
                    style={{
                      color: '#434343',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    {__("16 KM/H")}
                  </Text>
                  <Text style={{color: '#434343', fontSize: 10}}>{__("SPEED")}</Text>
                </View>
                <View style={{paddingRight: 10}}>
                  <Image
                    source={image.distance}
                    style={{width: 23, height: 17, marginVertical: 5}}
                  />
                  <Text
                    style={{
                      color: '#434343',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    {__("5790456")}
                  </Text>
                  <Text style={{color: '#434343', fontSize: 10}}>
                  {__("TODAY'S ODO")}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: '30%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image source={image.carUp} style={{width: 100, height: 100}} />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
            }}>
            <LinearGradient
              colors={['#5AB8B5', '#3C6A74']}
              start={{x: 1, y: 0.5}}
              end={{x: 0, y: 0.5}}
              style={{
                flexDirection: 'row',
                width: '65%',
                justifyContent: 'space-around',
                marginHorizontal: 10,
                paddingHorizontal: 5,
                borderRadius: 6,
              }}>
              <View
                style={{
                  paddingHorizontal: 18,
                  paddingVertical: 6,
                  justifyContent: 'center',
                }}>
                <Image source={image.locationWhite} style={{width: 13, height: 18}} />
              </View>
              <LinearGradient
                colors={['#D4D4D4', 'transparent', 'transparent']}
                style={{padding: 0.5}}></LinearGradient>
              <View
                style={{
                  paddingHorizontal: 18,
                  paddingVertical: 6,
                  justifyContent: 'center',
                }}>
                <Image source={image.batteryWhite} style={{width: 20, height: 15}} />
              </View>
              <LinearGradient
                colors={['#D4D4D4', 'transparent', 'transparent']}
                style={{padding: 0.5}}></LinearGradient>
              <View
                style={{
                  paddingHorizontal: 18,
                  paddingVertical: 6,
                  justifyContent: 'center',
                }}>
                <Image source={image.cahrgeWhite} style={{width: 10, height: 20}} />
              </View>
              <LinearGradient
                colors={['#D4D4D4', 'transparent', 'transparent']}
                style={{padding: 0.5}}></LinearGradient>
              <View
                style={{
                  paddingHorizontal: 18,
                  paddingVertical: 6,
                  justifyContent: 'center',
                }}>
                <Image source={image.chargePin} style={{width: 10, height: 18}} />
              </View>
            </LinearGradient>
            <View
              style={{
                flexDirection: 'row',
                width: '30%',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: 10,
              }}>
              <Image source={image.call} style={{padding: 10}} />
            </View>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={['#395DBF', '#16BCD4']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={{
            paddingVertical: 12,
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
      </View>
    </>
  );
}

export default Dashboard2;
