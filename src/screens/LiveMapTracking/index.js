import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import style from './style';
import MapView, {
  AnimatedRegion,
  Animated,
  MarkerAnimated,
} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {image} from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {__} from '../../../Utils/Translation/translation';
import Icon from 'react-native-vector-icons/Ionicons';
function LiveMapTracking() {
  const [activeImg, setActiveImg] = useState(false);
  const [isActiveImg, setIsActiveImg] = useState(false);
  const [coordinate, setCoordinate] = useState({
    latitude: 28.57966,
    longitude: 77.32111,
  });
  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      setCoordinate({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);
  //   console.log("coordinate",coordinate)
  const [marginBottom, setMarginBottom] = useState(1);
  const data = [
    {imgUrl: image.vehicleon},
    {imgUrl: image.parking2},
    {imgUrl: image.trafficlight},
    {imgUrl: image.map},
    {imgUrl: image.share},
    {imgUrl: image.earth},
    {imgUrl: image.keep},
    {imgUrl: image.graph},
    {imgUrl: image.alllocation},
  ];
  const data1 = [{imgUrl: image.mapPaper}, {imgUrl: image.mapPaper}];
  return (
    <View style={style.container}>
      <View style={style.map_container}>
        <Animated
          style={style.map}
          initialRegion={{
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          followsUserLocation={true}
          showsMyLocationButton={true}
          showsUserLocation={true}
          onPress={e => {
            setCoordinate(e.nativeEvent.coordinate);
          }}
          onRegionChangeComplete={region => setCoordinate(region)}
          onRegionChange={region => setCoordinate(region)}
          onMapReady={() => setMarginBottom(0)}>
          <MarkerAnimated
            coordinate={{
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
            }}
            title={'JavaTpoint'}
            description={'Java Training Institute'}
          />
        </Animated>
      </View>

      <View style={style.top_container}>
        <View style={{width: '10%'}}>
          <Image
            source={image.leftArrowblack}
            style={{width: 35, height: 18}}
          />
        </View>
        <LinearGradient
          colors={[colors.mainThemeColor3, colors.mainThemeColor4]}
          start={{x: 1.3, y: 0}}
          end={{x: 0, y: 0}}
          locations={[0, 0.9]}
          style={style.firstbox}>
          <Image source={image.carUp} style={{width: 50, height: 50}} />
          <View
            style={{
              marginLeft: 15,
              width: '80%',
            }}>
            <Text style={style.firstboxtext1}>MH12 RN 0790'</Text>
            <Text style={style.firstboxtext2}>
              {__(
                '177 New Apollo Indl Estate Mogra Lane Andheri Mumbai,Bharuch,400069,India',
              )}
            </Text>
          </View>
        </LinearGradient>
        <TouchableOpacity
          style={style.dashimgbox}
          onPress={() => setActiveImg(!activeImg)}>
          <Image
            source={image.dashboardcolor}
            style={{width: 44, height: 44}}
          />
        </TouchableOpacity>
      </View>

      <View style={style.bottombox}>
        <LinearGradient
          colors={[colors.mainThemeColor2, colors.mainThemeColor1]}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}
          style={style.secondbox}>
          <View style={style.secondboxtextbox1}>
            <Image source={image.speed} style={style.speedimg} />
            <Text style={style.secondboxtext1}>16 {__('KM/H')}</Text>
            <Text style={style.secondboxtext11}>{__('SPEED')}</Text>
          </View>
          <View style={style.secondboxtextbox1}>
            <Image source={image.distance} style={style.locimg} />
            <Text style={{fontSize: 12, marginTop: 8, color: '#fff'}}>
              5790456
            </Text>
            <Text style={style.secondboxtext11}>{__("TODAY'S ODO")}</Text>
          </View>

          <View style={{width: '50%'}}>
            <LinearGradient
              colors={[colors.mainThemeColor4, colors.mainThemeColor3]}
              start={{x: 0.9, y: 0}}
              end={{x: 0, y: 1.9}}
              locations={[0, 1.9]}
              style={style.box3}>
              <View>
                <Image source={image.taxtDriver} style={style.taxiimg} />
              </View>
              <View>
                <Text style={style.text3}>{__('ADD DRIVER')}</Text>
              </View>
            </LinearGradient>
          </View>
        </LinearGradient>
      </View>

      {activeImg
        ? data.map((item, index) => {
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
                <View
                  style={{
                    width: '15%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image source={item.imgUrl} style={{width: 65, height: 65}} />
                </View>
              </View>
            );
          })
        : null}

      <TouchableOpacity
        style={{position: 'absolute', bottom: 200}}
        onPress={() => setIsActiveImg(!isActiveImg)}>
        <Image source={image.mapPaper} style={style.mapPaper} />
      </TouchableOpacity>

      {isActiveImg
        ? data1.map((item, index) => {
            return (
              <View
                style={{
                  position: 'absolute',
                  bottom: 260 + 60 * index,
                }}>
                <Image source={item.imgUrl} style={style.mapPaper} />
              </View>
            );
          })
        : null}

      {/* modal2 */}
      {/* <View
        style={{
          position: 'absolute',
          top: 18,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View style={{width: '10%'}}>
          <Image
            source={image.leftArrowblack}
            style={{width: 35, height: 18}}
          />
        </View>
        <LinearGradient
          colors={[colors.mainThemeColor3, colors.mainThemeColor4]}
          start={{x: 1.3, y: 0}}
          end={{x: 0, y: 0}}
          locations={[0, 0.9]}
          style={{
            borderRadius: 15,
            width: '65%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 15,
              paddingVertical: 8,
              width: '100%',
            }}>
            <View style={{width: '10%'}}>
              <Image source={image.carUp} style={{width: 20, height: 50}} />
            </View>
            <View
              style={{
                marginLeft: 15,
                width: '70%',
              }}>
              <Text style={style.firstboxtext1}>{__('MH12 RN 0790')}</Text>
              <Text style={style.firstboxtext2}>
                {__(
                  '177 New Apollo Indl Estate Mogra Lane Andheri Mumbai,Bharuch,400069,India',
                )}
              </Text>
              <View
                style={{
                  backgroundColor: '#24A520',
                  padding: 9,
                  flexDirection: 'row',
                  maxWidth: '70%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: 6,
                }}>
                <Icon name="call" />
                <Text style={{color: '#fff'}}>Call Driver</Text>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <Image source={image.refresh} style={{width: 25, height: 25}} />
            </View>
          </View>
        </LinearGradient>
        <TouchableOpacity
          style={style.dashimgbox}
          onPress={() => setActiveImg(!activeImg)}>
          <Image
            source={image.dashboardcolor}
            style={{width: 44, height: 44}}
          />
        </TouchableOpacity>
      </View> */}

      {/*  */}
    </View>
  );
}
export default LiveMapTracking;
