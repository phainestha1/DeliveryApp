import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Orders from '../pages/Orders';
import Delivery from '../pages/Delivery';
import Settings from '../pages/Settings';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{title: '오더 목록'}}
      />
      <Tab.Screen
        name="Delivery"
        component={Delivery}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{title: '내 정보'}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
