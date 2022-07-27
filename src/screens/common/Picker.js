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
  const {data = [], isVisible, onPress} = props;
  return (
    <>
      {isVisible ? (
        <View
          style={{
            backgroundColor: 'blue',
            width: '100%',
            height: 770,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'red',
            }}>
            {data.map(item => {
              return <Text>{item.name}</Text>;
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
