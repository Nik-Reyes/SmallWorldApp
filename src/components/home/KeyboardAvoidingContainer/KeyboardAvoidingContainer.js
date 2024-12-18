import { 
    SafeAreaView, 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView,
    StatusBar,
    StyleSheet
 } from "react-native";
 import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const KeyboardAvoidingContainer = ({ children, style, backgroundColor }) => {

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: backgroundColor || 'white'}}>
            {Platform.OS === "android" ?
                <KeyboardAvoidingView
                    style={[{ backgroundColor: backgroundColor || "white" }, styles.container]}
                    behavior="padding"
                    keyboardVerticalOffset={20} 
                >
                    <ScrollView
                        style={{ backgroundColor: backgroundColor || "white" }}
                        contentContainerStyle={[styles.contentContainer, style]}
                        keyboardShouldPersistTaps="handled"
                    >
                        {children}
                    </ScrollView>
                </KeyboardAvoidingView>
                :
                <KeyboardAwareScrollView 
                    style={{ backgroundColor: backgroundColor || "white" }}
                    contentContainerStyle={styles.contentContainer}
                    keyboardShouldPersistTaps="handled"
                    extraScrollHeight={20}
                >
                        {children}
                </KeyboardAwareScrollView>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom:"5%",
    }
})

export default KeyboardAvoidingContainer;