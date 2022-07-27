import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {image} from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import {__} from '../../../Utils/Translation/translation';
import styles from './DashStyle1';
import MapView, {
  AnimatedRegion,
  Animated,
  MarkerAnimated,
} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import colors from '../../../assets/Colors';
function Dashboard1({details, isShow}) {
  console.log("-0987654321",isShow)
  const [coordinate, setCoordinate] = useState({
    latitude: 26.57966,
    longitude: 75.32111,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      setCoordinate({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);
  const [marginBottom, setMarginBottom] = useState(1);
  const renderItem = ({item}) => {
    // console.log(item);

    return (
      <>
        <View style={styles.card1Container}>
          <Image source={image.car} />
          <View style={{paddingHorizontal: 10}}>
            <Text style={styles.driverCarNumber}>
              {item.deviceId}
              {/* MH12 RN 0790 */}
            </Text>
            <View style={styles.driverCarSpeedBox}>
              <Text style={{fontSize: 10, color: '#46BE30'}}>{'\u2B24'}</Text>
              <Text style={styles.driverCarSpeed}>
                {/* {__('Running')} 14m 38km/h */}
                {item.statusMessage}
              </Text>
            </View>
          </View>
        </View>

        <View style={{backgroundColor: 'lightgreen', height: 150}}>
          <Animated
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}
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

        <LinearGradient
          colors={['#45E384', '#02D958']}
          style={styles.driverCarDetailBox}>
          <View style={styles.imageContainer}>
            <Image source={image.location} style={styles.images} />
            <Image source={image.battery} style={styles.images} />
            <Image source={image.charge} style={styles.images} />
            <Image source={image.shokker} style={styles.images} />
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={styles.driverDetailBox}>
              <Text style={styles.driverDetailText1}>
                {__('CHECK IN TIME')}
              </Text>
              <Text style={styles.driverDetailText2}>17:57:45</Text>
            </View>
            <View style={styles.driverDetailBox}>
              <Text style={styles.driverDetailText1}>{__('TODAYS ODO')}</Text>
              <Text style={styles.driverDetailText2}>
                {/* 5790456 {__('KM')} */}
                {Math.floor(item.todaysODO)}{" "}{__('KM')}
                {/* {Number(item.todaysODO).toFixed()} {__('KM')} */}
              </Text>
            </View>
            <View style={styles.driverDetailBox}>
              <Text style={styles.driverDetailText1}>{__('SPEED')}</Text>
              <Text style={styles.driverDetailText2}>
                {/* {item.speed} */}
                {Math.floor(item.speed)}{" "}

                {__('KM/H')}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.button}>
            <Image
              source={image.callimg}
              style={{height: 11, width: 11, marginRight: 5}}
            />
            <Text style={styles.buttonText}> {__('Call')}</Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          colors={['#395DBF', '#16BCD4']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={styles.driverAddressBox}>
          <Text style={styles.driverAddressText}>
            {/* {__(
                  '177 New Apollo Mogra Lane Andheri,Mumbai, Bharuch,400069,India',
                )} */}
            {item.address}
          </Text>
        </LinearGradient>
      </>
    );
  };

  return (
    <>
      {!isShow ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator  />
        </View>
      ) : (
        <FlatList
          data={details}
          contentContainerStyle={{paddingBottom: 100}}
          keyExtractor={({item, index}) => index}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      )}
    </>
  );
}

export default Dashboard1;
