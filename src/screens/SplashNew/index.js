import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, Text, View} from 'react-native';
import {image} from '../../../assets/images';
import {axiosGetData, baseUrl} from '../../../Utils/ApiController';
import Storage from './../../../Utils/Storage';
import {AuthContext} from '../../../App';

const SplashNew = () => {
  const [username, setUsername] = useState('');
  const [encodedPassWord, setEncodedPassWord] = useState('');
  const {setToken, setSplash} = React.useContext(AuthContext);

  const getData = async () => {
    const succcess = await Storage.getLoginDetail('login_detail');
    setUsername(succcess.accountId);
    setEncodedPassWord(succcess.password);
  };
  useEffect(() => {
    getData();
    setTimeout(() => {
      setSplash(false);
    }, 3000);
  }, []);

  return (
    <>
      <ImageBackground
        source={{
          uri: `${baseUrl}/downloadSplash/${username}/${encodedPassWord}/installation`,
        }}
        style={{flex: 1}}
      />
    </>
  );
};
export default SplashNew;
