import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AuthContext from '../services/authContext'
import SignIn from './SignIn';


const Stack = createNativeStackNavigator()
const ProtectedScreen = ({ children }) => {
  const { user } = useContext(AuthContext)

  return user ? children : (
    <Stack.Navigator>
      <Stack.Screen name='Sign-In' component={SignIn} />
    </Stack.Navigator>
  )
}

export default ProtectedScreen;

const styles = StyleSheet.create({})