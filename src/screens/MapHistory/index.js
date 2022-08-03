import React from 'react';
import {Image, TouchableOpacity, Text, View} from 'react-native';
import {image} from '../../../assets/images';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';
import {__} from '../../../Utils/Translation/translation';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView, {
  AnimatedRegion,
  Animated,
  MarkerAnimated,
  Callout,
  CalloutSubview,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
function MapHistory() {
  return (
    <>
        <LinearGradient
          colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={{
            height: '10%',
            justifyContent: 'flex-end',
            paddingHorizontal: 16,
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingVertical: 15,
            }}>
            <Image source={image.backArrow} style={{height: 12, width: 23}} />
            <Text
              style={{
                fontSize: Size.large,
                color: colors.white,
                paddingHorizontal: 15,
              }}>
              {__('Map History')}
            </Text>
          </View>
        </LinearGradient>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            paddingVertical: 10,
            backgroundColor: 'white',
            elevation: 20,
          }}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: '#D9D9D9',
              flexDirection: 'row',
              paddingHorizontal: 15,
              paddingVertical: 12,
              width: '47%',
              borderRadius: 7,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 14}}>From Date</Text>
            <MaterialIcons
              style={{
                color: '#3D3D3D',
                fontSize: 16,
              }}
              name={'keyboard-arrow-down'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor: '#D9D9D9',
              borderWidth: 1,
              flexDirection: 'row',
              paddingHorizontal: 15,
              paddingVertical: 12,
              width: '47%',
              borderRadius: 7,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 14}}>From Date</Text>
            <MaterialIcons
              style={{
                color: '#3D3D3D',
                fontSize: 16,
              }}
              name={'keyboard-arrow-down'}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1,}}>
          <MapView
            style={{
              flex: 1,
            }}
            // zoomEnabled={true}
            trackViewChanges={false}
            // scrollEnabled={false}
            // pointerEvents="none"
            // minZoomLevel={15}
            initialRegion={{
              latitude: 26.3,
              longitude: 75.3,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            provider={PROVIDER_GOOGLE}
            // followsUserLocation={true}
            // showsMyLocationButton={true}
            // showsUserLocation={true}
            // onPress={e => {
            //   setCoordinate(e.nativeEvent.coordinate);
            // }}
            // onRegionChangeComplete={region => onRegionalChange(region)}
            // onRegionChangeComplete={region => setCoordinate(region)}
            // onRegionChange={region => setCoordinate(region)}
            // onMapReady={() => setMarginBottom(0)}
          >
            <Marker
              // ref={markerRef}
              // key={index.toString()}
              coordinate={{
                latitude: 26.3,
                longitude: 75.3,
              }}>
              <Image
                resizeMode="contain"
                // source={{uri: image.car}}
                style={{
                  height: 20,
                  width: 70,
                }}
              />
            </Marker>
          </MapView>
        </View>
    </>
  );
}

export default MapHistory;
