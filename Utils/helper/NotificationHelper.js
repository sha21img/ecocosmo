import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:222222222222222222', authStatus);
    getFCMToken();
  }
}
async function getFCMToken() {
  let fcmtoken = await AsyncStorage.getItem('fcmtoken');
  console.log(fcmtoken, 'oldtoken');
  if (!fcmtoken) {
    try {
      const fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        console.log(fcmtoken, 'newtoken');
        await AsyncStorage.setItem('fcmtoken', fcmtoken);
      }
    } catch (error) {
      console.log(error, 'errorinfcmtoken');
    }
  }
}

export const notificationListeners = () => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    PushNotification.localNotification({
      message: remoteMessage.notification.body,
      title: remoteMessage.notification.title,
      bigPictureUrl: remoteMessage.notification.android.imageUrl,
      smallIcon: remoteMessage.notification.android.imageUrl,
    });
  });
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Open from background', remoteMessage.notification);
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('APP are in quit', remoteMessage.notification);
      }
    });
  messaging().onMessage(async remoteMessage => {
    console.log('App open h', remoteMessage);
  });
};
