import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import InputField from '../Components/InputField';
import {isSmallScreen} from '../theme';

const DetailScreen = ({route}) => {
  const {item} = route.params;

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Phone must be exactly 10 digits')
      .required('Phone is required'),
  });

  const handleSubmit = async values => {
    try {
      const data = new FormData();
      const response = await axios.get(item.xt_image, {
        responseType: 'blob',
      });
      const getUploadedImage = response.data;

      data.append('first_name', values.firstName);
      data.append('last_name', values.lastName);
      data.append('email', values.email);
      data.append('phone', values.phone);
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
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}>
      {({values, handleChange, handleSubmit, errors, touched}) => (
        <ScrollView style={styles.container}>
          <Image source={{uri: item.xt_image}} style={styles.image} />
          <InputField
            fieldName={'First Name:'}
            value={values.firstName}
            onChangeText={handleChange('firstName')}
            error={errors.firstName}
            touched={touched.firstName}
          />
          {touched.firstName && errors.firstName && (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          )}
          <InputField
            fieldName={'Last Name:'}
            value={values.lastName}
            onChangeText={handleChange('lastName')}
            error={errors.lastName}
            touched={touched.lastName}
          />
          {touched.lastName && errors.lastName && (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          )}
          <InputField
            fieldName={'Email:'}
            value={values.email}
            onChangeText={handleChange('email')}
            error={errors.email}
            touched={touched.email}
          />
          {touched.email && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
          <InputField
            fieldName={'Phone:'}
            value={values.phone}
            onChangeText={handleChange('phone')}
            error={errors.phone}
            touched={touched.phone}
          />
          {touched.phone && errors.phone && (
            <Text style={styles.errorText}>{errors.phone}</Text>
          )}
          <View style={styles.buttonMainContainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleSubmit}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
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
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    width: '30%',
  },
  errorText: {
    marginLeft: isSmallScreen ? 122 : 140,
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: 'red',
  },
});
