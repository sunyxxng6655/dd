import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import CommunityScreen from '../screens/CommunityScreen';
import JobsScreen from '../screens/JobsScreen';
import ChatsScreen from '../screens/ChatsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#FF4B6E',
          tabBarInactiveTintColor: '#aaa',
          tabBarStyle: {
            borderTopColor: '#eee',
            height: 60,
            paddingBottom: 8,
          },
          tabBarIcon: ({ focused, color, size }) => {
            const icons: Record<string, [string, string]> = {
              커뮤니티: ['people', 'people-outline'],
              구인글: ['briefcase', 'briefcase-outline'],
              채팅: ['chatbubbles', 'chatbubbles-outline'],
              프로필: ['person', 'person-outline'],
            };
            const [active, inactive] = icons[route.name];
            return <Ionicons name={(focused ? active : inactive) as any} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="커뮤니티" component={CommunityScreen} />
        <Tab.Screen name="구인글" component={JobsScreen} />
        <Tab.Screen name="채팅" component={ChatsScreen} />
        <Tab.Screen name="프로필" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
