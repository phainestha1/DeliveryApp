import React, {useEffect} from 'react';
import StackNavigation from './StackNavigation';
import TabNavigation from './TabNavigation';
import {RootState} from '../store/reducer';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import useSocket from '../hooks/useSocket';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import userSlice from '../slices/user';
import {Alert} from 'react-native';
import axios, {AxiosError} from 'axios';
import {useAppDispatch} from '../store';
import orderSlice from '../slices/order';

export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: {orderId: string};
};

const Root = () => {
  // Usage of "!!" ?
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  const dispatch = useAppDispatch();
  const [socket, disconnect] = useSocket();

  useEffect(() => {
    axios.interceptors.response.use(
      res => {
        return res;
      },
      async error => {
        const {
          config,
          response: {status},
        } = error;
        if (status === 419) {
          if (error.response.data.code == 'expired') {
            const originalRequest = config;
            // 토큰 재발급 진행
            const refreshToken = await EncryptedStorage.getItem('refreshToken');
            const response = await axios.post(
              `${Config.API_URL}/refreshToken`,
              {},
              {
                headers: {
                  authorization: `Bearer ${refreshToken}`,
                },
              },
            );
            // 새로운 토큰 저장
            dispatch(
              userSlice.actions.setAccessToken(response.data.data.accessToken),
            );
            originalRequest.headers.authorization = `Bearer ${response.data.data.accessToken}`;
            return axios(originalRequest);
          }
        }
        return Promise.reject(error);
      },
    );
  }, []);

  useEffect(() => {
    const callback = (data: any) => {
      dispatch(orderSlice.actions.addOrder(data));
    };

    if (socket && isLoggedIn) {
      socket.emit('acceptOrder', 'hello');
      socket.on('order', callback);
    }
    return () => {
      if (socket) {
        socket.off('order', callback);
      }
    };
  }, [isLoggedIn, socket]);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log('!isLoggedIn', !isLoggedIn);
      disconnect();
    }
  }, [isLoggedIn, disconnect, dispatch]);

  useEffect(() => {
    const getTokenAndRefresh = async () => {
      try {
        const token = await EncryptedStorage.getItem('refreshToken');
        if (!token) {
          return;
        }
        const response = await axios.post(
          `${Config.API_URL}/refreshToken`,
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );
        dispatch(
          userSlice.actions.setUser({
            name: response.data.data.name,
            email: response.data.data.email,
            accessToken: response.data.data.accessToken,
          }),
        );
      } catch (error) {
        console.error(error);
        if ((error as AxiosError).response?.data.code === 'expired') {
          Alert.alert('알림', '다시 로그인 해주세요.');
        }
      } finally {
        // TODO: 스플래시 스크린 없애기
      }
    };
    getTokenAndRefresh();
  }, [dispatch]);

  return (
    <NavigationContainer>
      {isLoggedIn ? <TabNavigation /> : <StackNavigation />}
    </NavigationContainer>
  );
};

export default Root;
