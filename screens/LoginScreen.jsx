import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../components/Login'

const LoginScreen = () => {
    const Stack = createNativeStackNavigator()
  return (
    
<Stack.Navigator>
  <Stack.Screen
    name = 'Login'
    component={Login}
      options={{headerShown: false}}
  />
</Stack.Navigator>

  )
}

export default LoginScreen

const styles = StyleSheet.create({})