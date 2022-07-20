import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {image} from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import ModalSelector from 'react-native-modal-selector';
import Dashboard1 from './Dashboard1';
import Dashboard2 from './Dashboard2';
import { __ } from '../../../Utils/Translation/translation';
import Icon from 'react-native-vector-icons/FontAwesome';

function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <>
      <LinearGradient
        colors={['#395DBF', '#16BCD4']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingTop: 20,
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {/* <View style={{height: 30, width: 30}}> */}
          <Image source={image.drawer} style={{height: 20, width: 23}} />
          {/* </View> */}
          <View style={{marginLeft: 15}}>
            <ModalSelector
              // data={eventCategory}
              initValue="Select tickets"
              // supportedOrientations={['landscape']}
              accessible={true}
              scrollViewAccessibilityLabel={'Scrollable options'}
              cancelButtonAccessibilityLabel={'Cancel Button'}
              // onChange={option => {
              //   console.log('option', option);
              //   setTextInputValue(option.label);
              //   setSelectedCategory(option.label);
              // }}
              style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TextInput
                  style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}
                  editable={false}
                  value="Dashboard 1"
                />
                <Image
                  source={image.arrowDown}
                  style={{height: 6, width: 10, marginHorizontal: 5}}
                />
              </TouchableOpacity>
            </ModalSelector>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '50%',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Image source={image.Alert} style={{marginHorizontal: 5}} />
          <Image
            source={image.search}
            style={{height: 15, width: 15, marginHorizontal: 5}}
          />
        </View>
      </LinearGradient>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}>
        <ScrollView horizontal={true}>
          <Text
            style={{
              minWidth: 80,
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: '#395DBF',
              borderRadius: 50,
              textAlign: 'center',
              marginRight: 10,
              color: 'white',
            }}>
            {__("All (10)")}
          </Text>
          <Text
            style={{
              minWidth: 80,
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: '#D8D8D8',
              borderRadius: 50,
              textAlign: 'center',
              marginRight: 10,
              color: '#ACACAC',
            }}>
            {__("Running(5)")}
          </Text>
        </ScrollView>
      </View>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 15,
            paddingBottom: 50,
          }}>
          {/* <Dashboard2 /> */}
          {[0, 0, 0].map(() => {
            return <Dashboard1 />;
          })}
        </View>
      </ScrollView>
    </>
  );
}

export default Home;
