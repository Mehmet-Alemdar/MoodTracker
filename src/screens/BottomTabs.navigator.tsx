import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from './Home.screen';
import { History } from './History.screen';
import { Analytics } from './Analytics.screen';
import { IconHome, IconHistory, IconAnalytics } from '../components/Icons';
import { theme } from '../theme';

const BottomTabs = createBottomTabNavigator()

export const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: theme.colorBlue,
        tabBarInactiveTintColor: theme.colorGrey,
        tabBarShowLabel: false,
        headerTitleStyle: {
          fontFamily: theme.fontFamilyRegular
        },
        tabBarIcon: ({color, size}) => {
          if(route.name === 'Home') {
            return <IconHome color={color} size={size}/>
          }
          if(route.name === 'History') {
            return <IconHistory color={color} size={size}/>
          }
          if(route.name === 'Analytics') {
            return <IconAnalytics color={color} size={size}/>
          }

          return null
        }
      })}
    >
      <BottomTabs.Screen name="Home" component={Home} options={{title: 'Today\'s Mood'}}/>
      <BottomTabs.Screen name="History" component={History} options={{title: 'Past Moods'}}/>
      <BottomTabs.Screen name="Analytics" component={Analytics} options={{title: 'Fancy Charts'}} />
    </BottomTabs.Navigator>
  )
}