import { Button, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const PostsScreen = () => {
  const {signOutUser} =useContext(AuthContext)
  return (
    <SafeAreaView>
      <Text>PostsScreen</Text>
      <Button title='Logout' onPress={()=> signOutUser()}/>
    </SafeAreaView>
  )
}

export default PostsScreen

const styles = StyleSheet.create({})