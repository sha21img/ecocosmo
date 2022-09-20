import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../Storage';
import {axiosGetData} from '../ApiController';
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';

export const logout = async setToken => {
    await Storage.clearToken();
    setToken(null);
    await AsyncStorage.removeItem('fcmtoken');
  deRegister();
};

const deRegister = async () => {
  const get = await AsyncStorage.getItem('fcmtoken');
  const loginDetail = await Storage.getLoginDetail('login_detail');
  var newUniqueId;
  await DeviceInfo.getUniqueId().then(uniqueId => {
    console.log('uniqueId', uniqueId);
    newUniqueId = uniqueId;
  });
  console.log('get, -=-=-=', newUniqueId);
  const data = {
    key: 'db12a172330ef8f0d881c4caea225ef4',
    notification_regid: get,
    gps_accountId: loginDetail.accountId,
    gcm_inserted_id: 0,
    phone_deviceId: newUniqueId,
    phoneType: Platform.OS === 'android' ? 1 : 2,
    isUpdate: 0,
  };
  console.log('datadatadatadata', data);
  const checkNoti = await axiosGetData(`deregisterUser`, data);
  console.log('this is a checkNoti checkNoti -=-', checkNoti.data);
};
