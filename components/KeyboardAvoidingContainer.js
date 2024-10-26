import { 
    SafeAreaView, 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView,
    StatusBar,
    StyleSheet
 } from "react-native";

const KeyboardAvoidingContainer = ({ children, style, backgroundColor }) => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: backgroundColor || 'white'}}>
            <KeyboardAvoidingView style={{flex: 1}}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    contentContainerStyle={[styles.contentContainer, style]}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom:"5%",
        paddingTop: Platform.OS === 'android' ?
            StatusBar.currentHeight: 50,
        
    }
})

export default KeyboardAvoidingContainer;