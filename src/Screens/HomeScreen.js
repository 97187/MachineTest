import React, {useState, useEffect, useCallback} from 'react';
import {
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import FormData from 'form-data';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append('user_id', '108');
      data.append('offset', String(offset));
      data.append('type', 'popular');

      const response = await axios.post(
        'https://dev3.xicom.us/xttest/getdata.php',
        data,
      );
      const result = response.data;
      if (result.status === 'success') {
        const uniqueImages = result.images.filter(newImage => {
          return !images.some(prevImage => prevImage.id === newImage.id);
        });

        setImages(prevImages => [...prevImages, ...uniqueImages]);
        setOffset(offset + 1);
      } else {
        console.error('Error fetching images');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailScreen', {item: item})}>
        <Image source={{uri: item.xt_image}} style={styles.image} />
      </TouchableOpacity>
    );
  };

  const handleLoadMore = () => {
    fetchData();
  };

  console.log(images, 'kkkl');

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id.toString() + index.toString()}
        // onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
      {loading && (
        <ActivityIndicator size="large" color="blue" style={styles.loader} />
      )}
      {!loading && (
        <TouchableOpacity
          style={styles.loadMoreButton}
          onPress={handleLoadMore}>
          <Text style={styles.loadMoreButtonText}>Click here to load more</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  loadMoreButton: {
    padding: 10,
    backgroundColor: 'blue',
    alignItems: 'center',
  },
  loadMoreButtonText: {
    color: 'white',
  },
  loader: {
    marginTop: 10,
  },
});

export default HomeScreen;
