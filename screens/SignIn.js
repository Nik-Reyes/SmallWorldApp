import { SafeAreaView, Text, View } from "react-native";
import { signInStyles } from "../styles/signInStyles";
import { useState } from 'react'
import { Button, Checkbox, Icon, TextInput } from "react-native-paper";
import { Link } from "@react-navigation/native";
import KeyboardAvoidingContainer from "../components/KeyboardAvoidingContainer";
export default function SignIn() {

    const [bgGradient, setBgGradient] = useState('white')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)


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
                    onPress={() => alert('Not yet implemented')}
                >
                    Submit
                </Button>

                <View style={signInStyles.hrContainer}>
                    <View style={signInStyles.hr}/>
                    <Text style={signInStyles.secondaryText}>Or with</Text>
                    <View style={signInStyles.hr}/>
                </View>

                <View style={signInStyles.signInOptions}>

                    <Button mode="elevated" 
                        onPress={() => alert('Not implemented yet')}
                        icon="google"
                        textColor="#48AC54"
                    >
                        Sign in with Google
                    </Button>
                    
                </View>
                
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