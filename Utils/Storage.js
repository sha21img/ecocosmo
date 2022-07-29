import AsyncStorage from '@react-native-async-storage/async-storage';
class Storage {
  static async saveToken(data) {
    try {
      await AsyncStorage.setItem('language',data);
      return data;
    } catch (error) {
      return false;
    }
  }
  static async SetLogin(data) {
    try {
      await AsyncStorage.setItem('login',data);
      return data;
    } catch (error) {
      return error;
    }
  }
  static async SetLoginDetail(data) {
    try {
       await AsyncStorage.setItem('login_detail',JSON.stringify(data));
      return data
    } catch (error) {
      return error;
    }
  }
  static async getLoginDetail() {
    // let item = {};
    try {
     const item = await AsyncStorage.getItem('login_detail');
      const userProfile = JSON.parse(item);
      return userProfile;
    } catch (error) {
      console.warn(error.message);
      return null;
    }
  }
  static async getLogin() {
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
    let item = {};
    try {
      item = await AsyncStorage.removeItem('login');
      const userProfile = item;
      return userProfile;
    } catch (error) {
      console.warn(error.message);
      return null;
    }
  }
  static async setLanguage(data) {
    try {
      await AsyncStorage.setItem('language', data);
      return data;
    } catch (error) {
      return false;
    }
  }
  static async getLanguage() {
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
