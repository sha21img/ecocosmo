import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

function Picker(props) {
  const {data = [], isVisible, onPress, clicked} = props;
  return (
    <>
      {isVisible ? (
        <View
          style={{
            backgroundColor: 'blue',
            width: '100%',
            // flex:3,
            height: '100%',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'red',
            }}>
            {data.map((item, index) => {
              return (
                <TouchableOpacity
                  style={{padding: 10}}
                  onPress={() =>{ clicked(item, index),onPress()}}>
                  <Text key={index}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity onPress={() => onPress()}>
            <Text>olihni</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
}

export default Picker;
