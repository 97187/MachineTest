import React from 'react';
import StackNavigation from './src/Navigation/stackNavigation';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <>
      <StackNavigation />
      <Toast />
    </>
  );
};

export default App;
