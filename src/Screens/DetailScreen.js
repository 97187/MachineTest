import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import InputField from '../Components/InputField';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const DetailScreen = ({route}) => {
  const {item} = route.params;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const onHandleFirstName = text => {
    setFirstName(text);
  };
  const onHandleLastName = text => {
    setLastName(text);
  };
  const onHandleEmail = text => {
    setEmail(text);
  };
  const onHandlePhone = text => {
    setPhone(text);
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      const response = await axios.get(item.xt_image, {
        responseType: 'blob',
      });
      const getUploadedImage = response.data;
      console.log(getUploadedImage);
      data.append('first_name', firstName);
      data.append('last_name', lastName);
      data.append('email', email);
      data.append('phone', phone);
      data.append('user_image', {
        uri: item.xt_image,
        type: getUploadedImage.data.type,
        name: getUploadedImage.data.name,
      });
      const res = await axios.post(
        'http://dev3.xicom.us/xttest/savedata.php',
        data,
      );
      if (res.data.status === 'success') {
        Toast.show({
          type: 'success',
          text1: 'Upload Successful',
          visibilityTime: 3000,
          autoHide: true,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Upload Unsuccessful',
          visibilityTime: 3000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Toast.show({
        type: 'error',
        text1: 'Upload Failed',
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: item.xt_image}} style={styles.image} />
      <InputField
        fieldName={'First Name:'}
        value={firstName}
        onChangeText={onHandleFirstName}
      />
      <InputField
        fieldName={'Last Name:'}
        value={lastName}
        onChangeText={onHandleLastName}
      />
      <InputField
        fieldName={'Email:'}
        value={email}
        onChangeText={onHandleEmail}
      />
      <InputField
        fieldName={'Phone:'}
        value={phone}
        onChangeText={onHandlePhone}
      />
      <View style={styles.buttonMainContainer}>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  buttonMainContainer: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'flex-end',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    width: '30%',
  },
});
