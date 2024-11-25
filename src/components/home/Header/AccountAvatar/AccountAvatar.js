import { Text, View } from "react-native";
import AuthContext from "../../../../services/authContext";
import { useContext } from "react";
import { Button, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { fbAuth } from "../../../../services/firebaseConfig";
import { styles } from "../../../../styles/Home.styles";

export default function AccountAvatar() {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <>
      {user ? (
        <IconButton
          icon="account"
          size={25}
          style={styles.accountIcon}
          mode="contained"
          buttonColor="#76B947"
          onPress={() => navigation.getParent()?.navigate("Profile")}
          containerColor="#76B947"
          iconColor="white"
        />
      ) : (
        <IconButton
          icon="account"
          size={25}
          style={styles.accountIcon}
          mode="contained"
          buttonColor="#76B947"
          onPress={() => navigation.getParent()?.navigate("Sign-In")}
          containerColor="#76B947"
          iconColor="white"
        />
      )}
    </>
  );
}
