import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import style from './style';
import MapView, {
  AnimatedRegion,
  Animated,
  MarkerAnimated,
} from 'react-native-maps';
import {image} from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {__} from '../../../Utils/Translation/translation';

function LiveMapTracking() {
  const [coordinate, setCoordinate] = useState({
    latitude: 28.57966,
    longitude: 77.32111,
  });
  //   console.log("coordinate",coordinate)
  const [marginBottom, setMarginBottom] = useState(1);
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
            console.log('ontap event ');
            console.log(e.nativeEvent.coordinate);
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
          <Image source={image.leftArrowblack} style={{width: 40,height:40}} />
        </View>
        <LinearGradient
          colors={[colors.mainThemeColor3, colors.mainThemeColor1]}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}
          style={style.firstbox}>
          <Image source={image.carUp} style={{width: 50, height: 50}} />
          <View
            style={{
              marginLeft: 15,
              width: '80%',
            }}>
            <Text style={style.firstboxtext1}>{__("MH12 RN 0790")}</Text>
            <Text style={style.firstboxtext2}>
            {__("177 New Apollo Indl Estate Mogra Lane Andheri Mumbai,Bharuch,400069,India")}
            </Text>
          </View>
        </LinearGradient>
        <View style={style.dashimgbox}>
          <Image source={image.dashboardcolor} style={{width: 40,height:40}}/>
        </View>
      </View>

      <View style={style.bottombox}>
        <LinearGradient
          colors={[colors.mainThemeColor2, colors.mainThemeColor1]}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}
          style={style.secondbox}>
          <View style={style.secondboxtextbox1}>
            <Image source={image.speed} style={style.speedimg} />
            <Text style={style.secondboxtext1}>{__("16 KM/H")}</Text>
            <Text style={style.secondboxtext11}>{__("SPEED")}</Text>
          </View>
          <View style={style.secondboxtextbox1}>
            <Image source={image.distance} style={style.locimg} />
            <Text style={{fontSize: 12, marginTop: 8, color: '#fff'}}>
            {__("5790456")}
            </Text>
            <Text style={style.secondboxtext11}>{__("TODAY'S ODO")}</Text>
          </View>

          <View style={{width: '50%'}}>
            <LinearGradient
              colors={[colors.mainThemeColor3, colors.mainThemeColor1]}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 1}}
              style={style.box3}>
              <View>
                <Image source={image.taxtDriver} style={style.taxiimg} />
              </View>
              <View>
                <Text style={style.text3}>{__("ADD DRIVER")}</Text>
              </View>
            </LinearGradient>
          </View>
        </LinearGradient>
      </View>

      <View style={{position: 'absolute', bottom: 200}}>
        <Image source={image.mapPaper} style={style.mapPaper} />
      </View>
    </View>
  );
}
export default LiveMapTracking;
