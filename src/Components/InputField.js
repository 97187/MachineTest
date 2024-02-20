import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const InputField = ({value, onChangeText, fieldName}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{fieldName}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Enter your first name"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    marginRight: 8,
    fontSize: 16,
  },
  input: {
    height: 40,
    width: '70%',
    borderColor: '#000000',
    borderWidth: 2,
    paddingLeft: 8,
  },
});

export default InputField;
