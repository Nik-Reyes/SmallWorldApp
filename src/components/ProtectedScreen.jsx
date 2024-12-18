import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LoginScreen from '../screens/LoginScreen'
import { AuthContext } from '../context/AuthContext'

const Stack = createNativeStackNavigator()
const ProtectedScreen = ({children}) => {
    const {currentUser} =useContext(AuthContext)
    
  return currentUser ? children :(
        <Stack.Navigator>
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
        </Stack.Navigator>
  )
}

export default ProtectedScreen;

const styles = StyleSheet.create({})