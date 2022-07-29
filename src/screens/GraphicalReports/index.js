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
import styles from './style';
import {__} from '../../../Utils/Translation/translation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Picker from '../common/Picker';
import {VictoryBar, VictoryChart} from 'victory-native';
import ModalSelector from 'react-native-modal-selector';
import {color} from 'react-native-reanimated';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';

function GraphicalReports(props) {
  const [vehicleNumber, setVehicleNumber] = useState('Select vehicle number');

  let index = 0;
  const data = [
    {key: index++, label: '87768'},
    {key: index++, label: '8785875'},
  ];
  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <LinearGradient
          colors={['#16BCD4', '#395DBF']}
          style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.headerDashboard}>
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Image source={image.backArrow} />
              </TouchableOpacity>
              <TextInput
                style={styles.dashboardText}
                editable={false}
                value="Distance Reports"
              />
            </View>
            <View style={styles.alertContainer}>
              <Image
                source={image.reportIcon}
                style={{height: 24, width: 24}}
              />
              <Image source={image.search} style={styles.searchIcon} />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 15,
              paddingHorizontal: 20,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '60%',
              }}>
              <ModalSelector
                initValue="Select tickets"
                accessible={true}
                data={data}
                scrollViewAccessibilityLabel={'Scrollable options'}
                // cancelButtonAccessibilityLabel={'Cancel Button'}
                onChange={option => {
                  setVehicleNumber(option.label);
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.white,
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                    borderRadius: 7,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TextInput
                    style={{
                      color: colors.black,
                      fontSize: Size.medium,
                    }}
                    editable={false}
                    value={vehicleNumber}
                  />
                  <MaterialIcons
                    style={{
                      color: '#3D3D3D',
                      fontSize: 16,
                    }}
                    name={'keyboard-arrow-down'}
                  />
                </TouchableOpacity>
              </ModalSelector>
            </View>

            {/* <TouchableOpacity
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                paddingHorizontal: 15,
                paddingVertical: 12,
                width: '60%',
                borderRadius: 7,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 14}}>Select vehicle number</Text>
              <MaterialIcons
                style={{
                  color: '#3D3D3D',
                  fontSize: 16,
                }}
                name={'keyboard-arrow-down'}
              />
            </TouchableOpacity> */}
            <TouchableOpacity style={{width: '35%'}}>
              <LinearGradient
                colors={['#00D957', '#2ACBA1', '#5EB9FF']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  paddingVertical: 12,
                  // width: '35%',
                  borderRadius: 7,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 14, color: 'white'}}>Yesterday</Text>
                <MaterialIcons
                  style={{
                    color: '#3D3D3D',
                    fontSize: 16,
                  }}
                  name={'keyboard-arrow-down'}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}>
          {/* <View style={{flexDirection: 'row'}}> */}
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: '#D9D9D9',
              flexDirection: 'row',
              paddingHorizontal: 15,
              paddingVertical: 12,
              width: '47%',
              borderRadius: 7,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 14}}>From Date</Text>
            <MaterialIcons
              style={{
                color: '#3D3D3D',
                fontSize: 16,
              }}
              name={'keyboard-arrow-down'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor: '#D9D9D9',
              borderWidth: 1,
              flexDirection: 'row',
              paddingHorizontal: 15,
              paddingVertical: 12,
              width: '47%',
              borderRadius: 7,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 14}}>From Date</Text>
            <MaterialIcons
              style={{
                color: '#3D3D3D',
                fontSize: 16,
              }}
              name={'keyboard-arrow-down'}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={{height: '100%'}}>
          {[1, 1, 1, 1].map(() => {
            return (
              <>
                <LinearGradient
                  colors={['#BCE2FF', '#FFFFFF']}
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 0}}
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    elevation: 20,
                  }}>
                  <View style={{width: '50%', padding: 20}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                      Odometer Total km
                    </Text>
                    <TouchableOpacity style={{paddingVertical: 10}}>
                      <Image
                        source={image.shareDark}
                        style={{width: 22, height: 22}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: 200,
                      height: 170,
                      justifyContent: 'flex-end',
                    }}>
                    <VictoryChart
                      width={230}
                      height={200}
                      domainPadding={{x: 10}}>
                      <VictoryBar
                        style={{
                          data: {fill: '#5EB9FF'},
                        }}
                        alignment="end"
                        data={[
                          {x: '0', y: 2},
                          {x: '5', y: 5},
                          {x: '10', y: 3},
                          {x: '15', y: 7},
                          {x: '20', y: 1},
                          {x: '25', y: 4},
                        ]}
                        animate={{
                          duration: 2000,
                          onLoad: {duration: 1000},
                        }}
                        barRatio={0.7}
                      />
                    </VictoryChart>
                  </View>
                </LinearGradient>
              </>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
}

export default GraphicalReports;

// <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
// <Text>oiyhhlu</Text>
// </TouchableOpacity>
// <Picker data={data} isVisible={isVisible} onPress={onHandle} />
