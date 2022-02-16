import React, {useEffect} from 'react';
import StackNavigation from './StackNavigation';
import TabNavigation from './TabNavigation';
import {RootState} from '../store/reducer';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import useSocket from '../hooks/useSocket';

const Root = () => {
  // Usage of "!!" ?
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  console.log('isLoggedIn', isLoggedIn);

  const [socket, disconnect] = useSocket();

  useEffect(() => {
    const helloCallback = (data: any) => {
      console.log(data);
    };

    if (socket && isLoggedIn) {
      console.log(socket);
      socket.emit('login', 'hello');
      socket.on('hello', helloCallback);
    }
    return () => {
      if (socket) {
        socket.off('hello', helloCallback);
      }
    };
  }, [isLoggedIn, socket]);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log('!isLoggedIn', !isLoggedIn);
      disconnect();
    }
  }, [isLoggedIn, disconnect]);

  return (
    <NavigationContainer>
      {isLoggedIn ? <TabNavigation /> : <StackNavigation />}
    </NavigationContainer>
  );
};

export default Root;
