import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Register from '../components/Register'

const RegisterScreen = () => {
    const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
<Stack.Navigator>
  <Stack.Screen
    name = 'RegisterScreen'
    component={Register}
      options={{headerShown: false}}
  />
</Stack.Navigator>
</NavigationContainer>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})