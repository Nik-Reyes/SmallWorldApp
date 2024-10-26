import { SafeAreaView, Text, View } from "react-native";
import { signInStyles } from "../styles/signInStyles";
import { useState } from 'react'
import { Button, Checkbox, Icon, TextInput } from "react-native-paper";
import { Link } from "@react-navigation/native";
import KeyboardAvoidingContainer from "../components/KeyboardAvoidingContainer";
import { setPersistence, signInWithEmailAndPassword, browserLocalPersistence } from "firebase/auth";
import { fbAuth } from "../firebaseConfig";

export default function SignIn() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    const validateInputs = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(email || password || !emailRegex.test(email)) {
            return true
        } else {
            return false
        }
    }

    const handleSubmit = async () => {
        const validInputs = validateInputs()
        if(validInputs) {
        
            signInWithEmailAndPassword(fbAuth, email, password)
            .then((userCredential) => {
                alert('You are now signed in')
            })
            .catch((error) => {
                alert('Error Signing in')
            })
            
        } else {
            alert('Invalid Inputs')
        }
    }

    return (
        <KeyboardAvoidingContainer>
                
            <Text style={signInStyles.signInText}>Sign-In Here.</Text>
            <Text style={signInStyles.secondaryText}>Enter your email address and password to use the app</Text>
            
            <View style={signInStyles.form}>

                <View style={signInStyles.InputContainer}>
                    <Text style={signInStyles.primaryText}>Email</Text>
                    <TextInput
                        mode="outlined"
                        placeholder="Enter Email"
                        value={email}
                        onChangeText={email => setEmail(email)}
                        activeOutlineColor="#48AC54"
                    />
                </View>

                <View style={signInStyles.InputContainer}>
                    <Text style={signInStyles.primaryText}>Password</Text>
                    <TextInput
                        mode="outlined"
                        placeholder="Enter Password"
                        value={password}
                        onChangeText={password => setPassword(password)}
                        activeOutlineColor="#48AC54"
                    />
                </View>
                
            </View>

            <View style={signInStyles.supportTools}>

                <View style={signInStyles.rememberMe}>
                    <Checkbox
                        status={rememberMe ? 'checked' : 'unchecked'}
                        onPress={() => setRememberMe(!rememberMe)}
                        color="#48AC54"
                    /><Text style={signInStyles.primaryText}>Remember Me</Text>
                </View>

                <View style={signInStyles.forgotPassword}>
                    <Link style={signInStyles.primaryText}
                        to={{screen: 'Forgot Password'}}>Forgot Password?</Link>
                </View>
                
            </View>

            <Button style={signInStyles.submitButton} 
                mode="contained"
                onPress={handleSubmit}
            >
                Submit
            </Button>

            
            <View style={signInStyles.footer}>
                <Text style={signInStyles.secondaryText}>
                    Don't have an Account? </Text>
                <Link style={signInStyles.primaryText}
                    to={{screen : 'Register'}}>
                    Register Now
                </Link>
            </View>

        </KeyboardAvoidingContainer>
    );
}