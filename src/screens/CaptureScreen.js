import { CameraView, useCameraPermissions } from "expo-camera";
import { StyleSheet, Pressable, View } from "react-native";
import { alertMessage } from "../hooks/photoHandler";
import { useIsFocused } from "@react-navigation/native";

export default function CaptureImage() {
  const [permission, requestPermission] = useCameraPermissions();
  const isFocused = useIsFocused();

  console.log("isFocused: ", isFocused);

  return (
    <View style={styles.container}>
      {isFocused && <CameraView style={styles.camera}></CameraView>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },

  camera: {
    flex: 1,
    backgroundColor: "black",
  },
});
