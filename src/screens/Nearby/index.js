import React from 'react';
import {View, Text} from 'react-native';
import MapView, {
  AnimatedRegion,
  Animated,
  MarkerAnimated,
  Callout,
  CalloutSubview,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import GoogleMap from '../../../Utils/helper/GoogleMap';
function index() {
  return (
    <View style={{flex: 1}}>
      <GoogleMap>
        {/* <Marker></Marker> */}
      </GoogleMap>
    </View>
  );
}

export default index;
