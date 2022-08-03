import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Share,
} from 'react-native';
import {image} from '../../assets/images';
import EngineStopPopup from '../../src/screens/EngineStopPopup';
import {axiosGetData} from '../ApiController';
import Storage from '../Storage';

function MapIconList({details}) {
  // const [details, setDetails] = useState();
  const [modal, setModal] = useState(false);

function MapIconList({handlePress}) {
  const data = [
    {imgUrl: image.vehicleon, route: ''},
    {imgUrl: image.parking2, route: ''},
    {imgUrl: image.trafficlight, route: ''},
    {imgUrl: image.map, route: 'MapHistory'},
    {imgUrl: image.alllocation, route: 'GroupMapTracking'},
    {imgUrl: image.share, route: ''},
    {imgUrl: image.keep, route: 'Reports'},
    {imgUrl: image.graph, route: 'GraphicalReports'},
    {imgUrl: image.earth, route: 'NearbyPlaces'},
  ];

  const shrethis = async () => {
    const loginDetail = await Storage.getLoginDetail('login_detail');
    let username = loginDetail.accountName;
    let password = loginDetail.password;
    const response = await axiosGetData(
      `gettrackurl/${username}/${password}/${details.imei}/ecvalidate/24`,
    );

    if (response.data.gettrackurl == 'success') {
      let msg = response.data.message;
      Share.share(
        {
          message: msg,
          title: 'hello',
          subject: 'hello',
        },
        {
          // Android only:
          dialogTitle: 'hello',
          // iOS only:
          excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
        },
      );
    }
  };
  return data.map((item, index) => {
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
        <TouchableOpacity
          onPress={() => handlePress(item.route)}
          style={{
            width: '15%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={item.imgUrl} style={{width: 65, height: 65}} />
        </TouchableOpacity>
        <EngineStopPopup
          visible={modal}
          setVisible={setModal}
          details={details}
        />
      </View>
    );
  });
}

export default MapIconList;
