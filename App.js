import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from './components/Login'

const App = () => {
  const Stack = createNativeStackNavigator()
  return (
   <SafeAreaProvider>
<NavigationContainer>
<Stack.Navigator>
  <Stack.Screen
    name = 'HomeScreen'
    component={HomeScreen}
      options={{headerShown: false}}
  />
</Stack.Navigator>
</NavigationContainer>
   </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})