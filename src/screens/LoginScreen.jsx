import { SafeAreaView, StyleSheet, Text, View,Button, TextInput , TouchableOpacity } from 'react-native'
import React, { useState , useContext, useEffect} from 'react'
import { Link, useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { fireAuth } from '../services/firebaseConfig';
import { AuthContext } from '../context/AuthContext';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('')

  const navigation = useNavigation()

  const {signInWithGoogle, currentUser} =useContext(AuthContext)

  useEffect(() => {
    currentUser ? navigation.navigate('PostsScreen') : {}
  }, [currentUser])
  
  const handleSubmit = async ()=> {
    if (!email.includes('@') && !email.includes('.')) {
      return Alert.alert('please input a valid email')
    }
      try {
     
        const newUser = await signInWithEmailAndPassword(fireAuth,email, password);
        // console.log(newUser.user)
        if (newUser.user?.uid) {
          navigation.navigate('PostsScreen')
        }
      } catch (error) {
        console.log(error)
        setErrorMsg(error?.message)
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
      <Button title='Sign in with Google' onPress={()=>signInWithGoogle()}/>

    </View>
     {errorMsg && <Text style={{color:'red'}}>{errorMsg}</Text>}
  
        <Text>Dont have an account ? </Text>
        {/* <TouchableOpacity onClick > */}
            <Button 
             title='Register Here'
             onPress={()=> navigation.navigate('RegisterScreen')} 
             />  
        {/* </TouchableOpacity> */}
  
  </SafeAreaView>
  )
}

   
export default LoginScreen

const styles = StyleSheet.create({})