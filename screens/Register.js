import { View, Text } from "react-native";
import KeyboardAvoidingContainer from "../components/KeyboardAvoidingContainer";
import { registerStyles } from "../styles/registerStyles";
import { TextInput } from "react-native-paper";
import { useState } from 'react'
import { signInStyles } from "../styles/signInStyles";
import { Button, Checkbox } from "react-native-paper";
import { fbFirestore, fbAuth } from "../firebaseConfig";
import { collection, query, setDoc, where, getDocs, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";


// Check username Availability
const checkUsernameAvailability = async (username) => {
    try {
        const usersRef = collection(fbFirestore, 'users'); 
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        
        // If the snapshot has documents, the username is taken
        return !querySnapshot.empty; 
    } catch(error) {
        return false
    }
    
};

// Check Email Availability
const checkEmailAvailability = async(email) => {
    try {
        const usersRef = collection(fbFirestore, 'users')
        const q = query(usersRef, where("email", "==", email))
        const querySnapshot = await getDocs(q)

        return !querySnapshot.empty
    } catch(error) {
        return false
    }
    
}

export default function Register() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [errors, setErrors] = useState({
        username : false,
        email : false,
        confirmEmail : false,
        password : false,
        confirmPassword : false,
    })

    const validateInputs = async() => {
        
        try{
            let errorsExist = false
            // Validate Username
            const usernameIsTaken = await checkUsernameAvailability(username)
            if(!username || usernameIsTaken){
                // Errors
                setErrors(prev => ({...prev, username: true}))
                errorsExist = true
            } else {
                // No Errors
                setErrors(prev => ({...prev, username: false}))
            }

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(emailRegex.test(email)){
                const emailIsTaken = await checkEmailAvailability(email)
                if(!email || emailIsTaken) {
                    setErrors(prev => ({...prev, email: true}))
                    errorsExist = true
                } else {
                    setErrors(prev => ({...prev, email: false}))
                }
            } else {
                setErrors(prev => ({...prev, email: true}))
                errorsExist = true
            }
            
            

            // Validate Confirm Email
            if(email != confirmEmail) {
                setErrors(prev => ({...prev, confirmEmail: true}))
                errorsExist = true
            } else {
                setErrors(prev => ({...prev, confirmEmail: false}))
            }

            // Validate Password
            if(!password) {
                setErrors(prev => ({...prev, password: true}))
                errorsExist = true
            } else {
                setErrors(prev => ({...prev, password: false}))
            }

            // Validate Confirm Password
            if(password != confirmPassword){
                setErrors(prev => ({...prev, confirmPassword: true}))
                errorsExist = true
            } else {
                setErrors(prev => ({...prev, confirmPassword: false}))
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
            try{
                const userCredentials = await createUserWithEmailAndPassword(
                    fbAuth, email, password
                )
                const user = userCredentials.user
                const usersRef = doc(fbFirestore, 'users', user.uid)
                await setDoc(usersRef, {
                    username,
                    email,
                    role : 'player',
                    joined: new Date()
                })
                alert('User has been created')
            } catch(error) {
                alert('Error Creating User: ' + String(error.message))
            }

        } else {
            alert('Invalid Inputs Exist')
        }

    }

    return (
        <KeyboardAvoidingContainer>
            
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
                        <Text style={{color : "red"}}>Invalid Username or is already taken</Text>
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
                        <Text style={{color : "red"}}>Invalid Email or is already being used</Text>
                    }
                </View>
                <View style={registerStyles.InputContainer}>
                    <Text style={registerStyles.primaryText}>Confirm Email</Text>
                    <TextInput
                        mode="outlined"
                        placeholder="Enter Email"
                        value={confirmEmail}
                        onChangeText={confirmEmail => setConfirmEmail(confirmEmail)}
                        activeOutlineColor="#48AC54"
                        error={errors.confirmEmail}
                    />
                    {errors.confirmEmail && 
                        <Text style={{color : "red"}}>Emails do not match</Text>
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
                    />
                    {errors.password && 
                        <Text style={{color : "red"}}>Invalid Password</Text>
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
                    />
                    {errors.confirmPassword && 
                        <Text style={{color : "red"}}>Passwords do not match</Text>
                    }
                </View>
            </View>

            <Button style={registerStyles.submitButton} 
                mode="contained"
                onPress={handleSubmit}
            >
                Submit
            </Button>

        </KeyboardAvoidingContainer>
    );
}