import { View, Text, StyleSheet } from "react-native";
import KeyboardAvoidingContainer from "../components/home/KeyboardAvoidingContainer/KeyboardAvoidingContainer";
import { TextInput, IconButton, ActivityIndicator } from "react-native-paper";
import { useState } from 'react'
import { Button, Checkbox } from "react-native-paper";
import { fbFireStore, fbAuth, fbApp } from "../services/firebaseConfig"; 
import { collection, query, setDoc, where, getDocs, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigation, Link } from "@react-navigation/native";


// Check username Availability
const checkUsernameAvailability = async (username) => {
    try {
        const usersRef = collection(fbFireStore, 'users'); 
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);

        const auth = getAuth(fbApp).get
        // If the snapshot has documents, the username is taken
        return !querySnapshot.empty; 
    } catch(error) {
        return false
    }
    
};

// Check Email Availability
const checkEmailAvailability = async(email) => {
    try {
        const usersRef = collection(fbFireStore, 'users')
        const q = query(usersRef, where("email", "==", email))
        const querySnapshot = await getDocs(q)
        return !querySnapshot.empty
    } catch(error) {
        console.error(error)
        return true
    }
    
}

export default function Register() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [hidePassword, setHidePassword] = useState(true)
    const [showLoading, setShowLoading] = useState(false)
    const navigation = useNavigation()

    const [errors, setErrors] = useState({
        username : "",
        email : "",
        password : "",
        confirmPassword : "",
    })

    const validateInputs = async() => {
        
        try{
            let errorsExist = false
            // Validate Username
            const usernameIsTaken = await checkUsernameAvailability(username)
            if(username.length > 2){
                if(usernameIsTaken) {
                    // Username is taken
                    setErrors(prev => ({...prev, username: "Username is already taken"}))
                    errorsExist = true
                } else {
                    // Username is available
                    setErrors(prev => ({...prev, username: ""}))
                }
            } else {
                setErrors(prev => ({...prev, username: "Username must be at least 3 characters long"}))
                errorsExist = true
            }

            // Validate Email
            const emailRegexTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            if(emailRegexTest){
                const emailIsTaken = await checkEmailAvailability(email)
                if(emailIsTaken) {
                    // 
                    setErrors(prev => ({...prev, email: "Email is already taken"}))
                    errorsExist = true
                } else {
                    setErrors(prev => ({...prev, email: ""}))
                }
            } else {
                setErrors(prev => ({...prev, email: "Invalid Email Form"}))
                errorsExist = true
            }
            

            // Validate Password
            if (password.length >= 6) {
                setErrors(prev => ({...prev, password: ""}))
            } else {
                setErrors(prev => ({...prev, password: "Password must be at least 6 characters long"}))
                errorsExist = true
            }

            // Validate Confirm Password
            if(password === confirmPassword){
                setErrors(prev => ({...prev, confirmPassword: ""}))
            } else {
                setErrors(prev => ({...prev, confirmPassword: "Passwords do not match"}))
                errorsExist = true
            }
            return !errorsExist
        } catch(error) {
            alert('Validation Error: ', error)
            return false
        }
        
    }

    const handleSubmit = async() => {
        
        const validInputs = await validateInputs()
        if(validInputs){
            // No Errors Exist
            setShowLoading(true)
            try{
                const userCredentials = await createUserWithEmailAndPassword(
                    fbAuth, email, password
                )
                const user = userCredentials.user
                const usersRef = doc(fbFireStore, 'users', user.uid)
                const terrariumsRef = doc(fbFireStore, 'terrariums', user.uid)
                await setDoc(usersRef, {
                    username,
                    email,
                    joined: new Date(),
                    terrarium: terrariumsRef.path,
                })
                await setDoc(terrariumsRef, {
                    owner: usersRef.path,
                    totalPlantsFound: 0,
                    foundPlants: []
                })
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Main" }],
                });
                alert('User has been created')
            } catch(error) {
                alert('Error Creating User: ' + String(error.message))
            }

        } else {
            alert('Invalid Inputs Exist')
        }
        setShowLoading(false)
    }

    return (
        <KeyboardAvoidingContainer style={registerStyles.centeredContainer}>
            
            <IconButton
                icon="chevron-left"
                size={30}
                onPress={() => navigation.goBack()}
            />
            <Text style={registerStyles.registerText}>Register.</Text>
            <Text style={registerStyles.secondaryText}>Just a few things to get started</Text>

            <View style={registerStyles.form}>
                <View style={registerStyles.InputContainer}>
                    <Text style={registerStyles.primaryText}>Username</Text>
                    <TextInput
                        mode="outlined"
                        placeholder="Enter Username"
                        value={username}
                        onChangeText={username => setUsername(username)}
                        activeOutlineColor="#48AC54"
                        error={errors.username}
                    />
                    {errors.username &&
                        <Text style={{color : "red"}}>{errors.username}</Text>
                    }
                </View>
                <View style={registerStyles.InputContainer}>
                    <Text style={registerStyles.primaryText}>Email</Text>
                    <TextInput
                        mode="outlined"
                        placeholder="Enter Email"
                        value={email}
                        onChangeText={email => setEmail(email)}
                        activeOutlineColor="#48AC54"
                        error={errors.email}
                    />
                    {errors.email &&
                        <Text style={{color : "red"}}>{errors.email}</Text>
                    }
                </View>
                <View style={registerStyles.InputContainer}>
                    <Text style={registerStyles.primaryText}>Password</Text>
                    <TextInput
                        mode="outlined"
                        placeholder="Enter Password"
                        value={password}
                        onChangeText={password => setPassword(password)}
                        activeOutlineColor="#48AC54"
                        error={errors.password}
                        secureTextEntry={hidePassword}
                        right={
                            <TextInput.Icon 
                                icon="eye" 
                                onPress={() => setHidePassword(prev => (!prev))}
                            />
                        }
                    />
                    {errors.password && 
                        <Text style={{color : "red"}}>{errors.password}</Text>
                    }
                </View>
                <View style={registerStyles.InputContainer}>
                    <Text style={registerStyles.primaryText}>Confirm Password</Text>
                    <TextInput
                        mode="outlined"
                        placeholder="Enter Password"
                        value={confirmPassword}
                        onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                        activeOutlineColor="#48AC54"
                        error={errors.confirmPassword}
                        secureTextEntry={hidePassword}
                        right={
                            <TextInput.Icon 
                                icon="eye" 
                                onPress={() => setHidePassword(prev => (!prev))}
                            />
                        }
                    />
                    {errors.confirmPassword && 
                        <Text style={{color : "red"}}>{errors.confirmPassword}</Text>
                    }
                </View>
            

                <Button style={registerStyles.submitButton} 
                    mode="contained"
                    onPress={handleSubmit}
                >
                    Submit
                </Button>

                
            </View>

            <View style={registerStyles.footer}>
                <Text 
                    style={[registerStyles.secondaryText, {marginRight: 6}]} 
                    numberOfLines={1}
                >
                    Already have an Account? 
                </Text>
                <Text   
                    style={registerStyles.primaryText} 
                    onPress={() => navigation.goBack()}
                >
                    Sign In Here
                </Text>
            </View>

            {showLoading && 
                <ActivityIndicator animating={true} color="#76B947"/>
            }

        </KeyboardAvoidingContainer>
    );
}

const registerStyles = StyleSheet.create({
    centeredContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    registerText : {
        textAlign: 'left', 
        fontWeight: 'bold',
        fontSize: 36,
        marginBottom: 10
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
    container: {
        flex: 1,
        flexGrow: 1,
        display: 'flex',
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom:"5%",
        paddingTop: "5%",
    },
    form : {
        width: '100%',
        marginTop: 10,
    },
    InputContainer : {
        marginBottom: 10
    },
    submitButton : {
        backgroundColor: '#76B947',
        marginVertical: 10
    },
    footer : {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 16,
    },
})