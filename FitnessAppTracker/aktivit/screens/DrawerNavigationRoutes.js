import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Import Screens
import DashboardScreen from './Dashboard';
import WorkoutScreen from './Workout';


//Import Components
import NavigationDrawerHeader from '../components/NavigationDrawerHeader';
import CustomSidebarMenu from '../components/CustomSidebarMenu';

//initialize drawers
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

//constucting dashboard navigation stack component
const dashboardScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="DashboardScreen">
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'DashboardScreen', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

//workout navigation component
const workoutScreenStack = ({navigation}) => {
    return (
      <Stack.Navigator
        initialRouteName="WorkoutScreen"
        screenOptions={{
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}>
        <Stack.Screen
          name="WorkoutScreen"
          component={WorkoutScreen}
          options={{
            title: 'Workout', //Set Header Title
          }}
        />
      </Stack.Navigator>
    );
  };

  
  
//constructing drawer for page navigation after login
const DrawerNavigatonRoutes = (props) => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#cee1f2',
        color: '#cee1f2',
        itemStyle: {marginVertical: 5, color: 'white'},
        labelStyle: {
          color: '#d8d8d8',
        },
      }}
      screenOptions={{headerShown: false}}
      drawerContent={CustomSidebarMenu}>
      <Drawer.Screen
        name="dashboardScreenStack"
        options={{drawerLabel: 'Dashboard'}}
        component={dashboardScreenStack}
      />
      <Drawer.Screen
        name="workoutScreenStack"
        options={{drawerLabel: 'Workout'}}
        component={workoutScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatonRoutes;