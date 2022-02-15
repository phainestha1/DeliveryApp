import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './src/navigations/TabNavigation';
import StackNavigation from './src/navigations/StackNavigation';

export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: {orderId: string};
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? <TabNavigation /> : <StackNavigation />}
    </NavigationContainer>
  );
};

export default App;
