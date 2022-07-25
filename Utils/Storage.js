import AsyncStorage from '@react-native-async-storage/async-storage';
class Storage {
  static async saveToken(data) {
    // console.log('asdfgf',data)
    try {
      await AsyncStorage.setItem('language',data);
      return data;
    } catch (error) {
      return false;
    }
  }
  static async SetLogin(data) {
    // console.log('asdfgf',data)
    try {
      await AsyncStorage.setItem('login',data);
      return data;
    } catch (error) {
      return error;
    }
  }
  static async getLogin() {
    // console.log("first")
    let item = {};
    try {
      item = await AsyncStorage.getItem('login');
      const userProfile = item;
      return userProfile;
    } catch (error) {
      console.warn(error.message);
      return null;
    }
  }
  static async clearToken() {
    // console.log("first")
    let item = {};
    try {
      item = await AsyncStorage.removeItem('login');
      const userProfile = item;
      // console.log("userProfile",userProfile)
      return userProfile;
    } catch (error) {
      console.warn(error.message);
      return null;
    }
  }
  static async setLanguage(data) {
    try {
      await AsyncStorage.setItem('language', data);
      // console.log(first)
      return data;
    } catch (error) {
      return false;
    }
  }
  static async getLanguage() {
    // console.log("first")
    let item = {};
    try {
      item = await AsyncStorage.getItem('language');
      const userProfile = item;
      return userProfile;
    } catch (error) {
      console.warn(error.message);
      return null;
    }
  }
//   static async productDetails(data) {
//     try {
//       await AsyncStorage.setItem('save_ProductDetails', data);
//       return data;
//     } catch (error) {
//       return false;
//     }
//   }
//   static async getProductDetails() {
//     let item = {};
//     try {
//       item = await AsyncStorage.getItem('save_ProductDetails');
//       const userProfile = item;
//       return userProfile;
//     } catch (error) {
//       return null;
//     }
//   }
//   static async removeProductDetails() {
//     let item = {};
//     try {
//       item = await AsyncStorage.removeItem('save_ProductDetails');
//       const userProfile = item;
//       return userProfile;
//     } catch (error) {
//       return null;
//     }
//   }
//   static async TicketDetails(data) {
//     // console.log('mm');
//     try {
//       await AsyncStorage.setItem('save_TicketDetails', data);
//       return data;
//     } catch (error) {
//       return false;
//     }
//   }
//   static async getTicketDetails() {
//     let item = {};
//     try {
//       item = await AsyncStorage.getItem('save_TicketDetails');
//       const userProfile = item;
//       return userProfile;
//     } catch (error) {
//       return null;
//     }
//   }
//   static async removeTicketDetails() {
//     let item = {};
//     try {
//       item = await AsyncStorage.removeItem('save_ProductDetails');
//       const userProfile = item;
//       return userProfile;
//     } catch (error) {
//       return null;
//     }
//   }
//   static async rememberMe(data) {
//     // console.log(data, 'datadatadatadatadatadatadata');
//     // console.log(newArray, 'newArrrrraayayayy');
//     try {
//       await AsyncStorage.setItem('save_Email_Pass', JSON.stringify(data));
//       return data;
//     } catch (error) {
//       return false;
//     }
//   }
//   static async getUserData() {
//     let item = {};
//     try {
//       item = await AsyncStorage.getItem('save_Email_Pass');
//       const userProfile = JSON.parse(item);
//       return userProfile;
//     } catch (error) {
//       return null;
//     }
//   }
}
export default Storage;
