import { Text, View, StyleSheet } from "react-native";
import { useEffect, useState, useRef, useContext } from 'react'
import { Button, Icon, IconButton, TextInput } from "react-native-paper";
import { Link, useNavigation } from "@react-navigation/native";
import KeyboardAvoidingContainer from "../components/home/KeyboardAvoidingContainer/KeyboardAvoidingContainer";
import { signInWithEmailAndPassword } from "firebase/auth";
import { fbAuth } from "../services/firebaseConfig";
export default function SignIn() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hidePassword, setHidePassword] = useState(true)
    const navigation = useNavigation()

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
            
            try {
                await signInWithEmailAndPassword(fbAuth, email, password)
                navigation.goBack()
            } catch (error) {
                console.error('Error Signing-In: ', error.message)
            }
              
        } else {
            alert('Invalid Inputs')
        }
    }

    return (
        <KeyboardAvoidingContainer>
            
            <IconButton
                icon="chevron-left"
                size={30}
                onPress={() => navigation.goBack()}
            />
            <Text style={signInStyles.signInText}>Sign-In Here.</Text>
            <Text style={signInStyles.secondaryText}>Enter your email address and password to use Small World</Text>
            <View style={signInStyles.centeredContent}>
                <View style={signInStyles.form}>

                    <View style={signInStyles.InputContainer}>
                        <Text style={signInStyles.primaryText}>Email</Text>
                        <View>
                            <TextInput
                                mode="outlined"
                                placeholder="Enter Email"
                                value={email}
                                onChangeText={email => setEmail(email)}
                                activeOutlineColor="#48AC54"
                            />
                        </View>
                        
                    </View>

                    <View style={signInStyles.InputContainer}>
                        <Text style={signInStyles.primaryText}>Password</Text>
                        <View>
                            <TextInput
                                mode="outlined"
                                placeholder="Enter Password"
                                value={password}
                                onChangeText={password => setPassword(password)}
                                activeOutlineColor="#48AC54"
                                secureTextEntry={hidePassword}
                                right={
                                    <TextInput.Icon 
                                        icon="eye" 
                                        onPress={() => setHidePassword(prev => (!prev))}
                                    />
                                }
                            />
                        </View>
                        
                    </View>
            
                </View>

                <Button style={signInStyles.submitButton} 
                    mode="contained"
                    onPress={handleSubmit}
                >
                    Submit
                </Button>
            </View>
            
            <View style={signInStyles.footer}>
                <Text style={[signInStyles.secondaryText, {marginRight: 6}]}>
                    Don't have an Account? 
                </Text>
                <Link style={signInStyles.primaryText} screen="Register">
                    Register Now
                </Link>
            </View>
            
            
            

        </KeyboardAvoidingContainer>
    );
}



export const signInStyles = StyleSheet.create({
    centeredContent: {
        width: '100%', 
    },
    signInOptions : {
        width: '100%',
    },
    hrContainer : {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20
    },
    form : {
        width: '100%',
        marginTop: 10,
    },
    signInText : {
        textAlign: 'left', 
        fontWeight: 'bold',
        fontSize: 36,
        marginBottom: 10,
    },
    primaryText: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold'
    },
    secondaryText : {
        fontSize: 18,
        color: 'gray'
    },
    InputContainer : {
        marginBottom: 10
    },
    textInputIcons: { 
        padding: 10,
    },
    supportTools: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    forgotPassword : {
        display: 'flex',
    },
    forgotPasswordText : {
        fontSize: 18,
        color: '#0066CC',
    },
    submitButton : {
        backgroundColor: '#76B947',
    },
    footer : {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 16,
    },
})