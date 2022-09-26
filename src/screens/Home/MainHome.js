import {View, Image, Linking, Text} from 'react-native';
import React from 'react';
import {image} from '../../../assets/images';

export default function MainHome() {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          paddingHorizontal: 25,
          alignItems: 'center',
          marginVertical: 15,
        }}>
        <Image
          source={image.whatsApp}
          style={{height: 34, width: 34, marginHorizontal: 20}}
        />
        <Text style={{width: '70%', fontSize: 20}}>
          thi tja slkd dedd dd d d d d dd
        </Text>
      </View>
      <View
        style={{
          borderRadius: 10,
          borderWidth: 2,
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
          alignSelf: 'center',
          width: '80%',
          marginVertical: 5,
          padding: 15,
        }}>
        <View>
          <Image
            source={image.whatsApp}
            style={{height: 34, width: 34, marginHorizontal: 20}}
          />
        </View>
        <View
          style={{
            width: '50%',
            // justifyContent: 'center',
            // alignContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              //   color: 'white',
            }}>
            All
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              //   color: 'white',
            }}>
            6
          </Text>
          <Text style={{textAlign: 'center', fontSize: 18}}>Available</Text>
        </View>
      </View>

      <View
        style={{
          paddingVertical: 20,
          justifyContent: 'center',
          flexWrap: 'wrap',
          flexDirection: 'row',
          backgroundColor: 'lightgreen',
        }}>
        {['Running', 'Idle', 'Waiting', 'Inactive', 'Renew', 'No GPS'].map(
          item => {
            return (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'red',
                  padding: 15,
                  margin: 10,
                  backgroundColor: 'lightpink',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                    //   color: 'white',
                  }}>
                  {item}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                    //   color: 'white',
                  }}>
                  6
                </Text>
                <Text style={{textAlign: 'center', fontSize: 18}}>
                  Available
                </Text>
                <Image
                  source={image.whatsApp}
                  style={{
                    height: 34,
                    width: 34,
                    marginTop: 10,
                    alignSelf: 'center',
                  }}
                />
              </View>
            );
          },
        )}
      </View>
    </View>
  );
}
