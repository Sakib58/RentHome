import React from 'react';
import {View,Text} from 'react-native';

import * as firebase from 'firebase';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Homepage from './src/Homepage';
import HomeDetails from './src/HomeDetails';
import Profile from './src/Profile';
import SignIn from './src/SignIn';
import SignUp from './src/SignUp';
import {AuthContext,AuthProvider} from './provider/AuthProvider';
import SearchHome from './src/SearchHome';
import AddHome from './src/AddHome';



const HomeStack=createStackNavigator();
const AppDrawer=createDrawerNavigator();
const ProfileSignInStack=createStackNavigator();
const AuthStack=createStackNavigator();
const BottomTab=createMaterialBottomTabNavigator();

var firebaseConfig = {
  apiKey: "AIzaSyBUFJNWAZTK4kd2NTV9vvlv5_GfoL6MHy8",
  authDomain: "renthome-b9b50.firebaseapp.com",
  projectId: "renthome-b9b50",
  storageBucket: "renthome-b9b50.appspot.com",
  messagingSenderId: "546794948154",
  appId: "1:546794948154:web:dc65b5422a8809134c1703"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

const BottomTabScreen=()=>{
  return(
    <BottomTab.Navigator initialRouteName="Home">
      <BottomTab.Screen name="Home" component={HomeStackScreen}/>
      <BottomTab.Screen name="Search Home" component={SearchHome}/>
    </BottomTab.Navigator>
  );
}

const AuthStackScreen=()=>{
  return(
    <AuthStack.Navigator initialRouteName="SignIn">
      <AuthStack.Screen name="SignIn" component={SignIn}/>
      <AuthStack.Screen name="SignUp" component={SignUp}/>
    </AuthStack.Navigator>
  );
}

const HomeStackScreen=()=>{
  return (
      <HomeStack.Navigator initialRouteName="Home">
        <HomeStack.Screen name="Home" component={Homepage}/>
        <HomeStack.Screen name="Details" component={HomeDetails}/>
      </HomeStack.Navigator>
  );
}

const DrawerScreen=()=>{
  return(
    <AppDrawer.Navigator>
      <AppDrawer.Screen name="Home" component={BottomTabScreen}/>
      <AppDrawer.Screen name="Profile" component={ProfileSignInStackScreen}/>
      <AppDrawer.Screen name="SignOut" component={SignIn}/>
    </AppDrawer.Navigator>    
  );
}

const ProfileSignInStackScreen=()=>{
  return(
    <ProfileSignInStack.Navigator>
      <ProfileSignInStack.Screen name="Profile" component={Profile}/>
      <ProfileSignInStack.Screen name="SignIn" component={SignIn}/>
      <ProfileSignInStack.Screen name="AddHome" component={AddHome}/>
    </ProfileSignInStack.Navigator>
  );
}

function App(props) {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>
            {auth.IsLoggedIn ? <DrawerScreen />: <AuthStackScreen />}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;