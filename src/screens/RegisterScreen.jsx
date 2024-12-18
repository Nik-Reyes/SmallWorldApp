import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { fireAuth } from '../services/firebaseConfig'
import { Link, useNavigation } from '@react-navigation/native'



const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSubmit = async ()=> {
      if (!email.includes('@') && !email.includes('.')) {
        return Alert.alert('please input a valid email')
      }
        try {
       
          const newUser = await createUserWithEmailAndPassword(fireAuth,email, password);
          // console.log(newUser.user)
          if (newUser.user?.uid) {
            navigation.navigate('PostsScreen')
          }
        } catch (error) {
          console.log(error)
        }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create An Account</Text>
      <View style={styles.formContainer}>
        <TextInput
        style={styles.input}
        placeholder='Email'
        onChangeText={(text)=>setEmail(text)}
        value={email}
        
        />
        <TextInput 
         style={styles.input}
         placeholder='Password'
         onChangeText={(text)=>setPassword(text)}
         value={password}
         secureTextEntry/>
        <Button title='Submit' onPress={handleSubmit}/>
        <Link to='/PostsScreen'>PostsScreen</Link>
      </View>
    </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
  },
  formContainer: {
    width:'90%',
    padding:20,
  },
  input : {
    borderWidth:1,
    borderColor: 'grey',
    marginBottom:10,
    padding: 10,
    borderRadius:10,
    fontSize:16
  },
  title :{
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'semibold'
  },
})