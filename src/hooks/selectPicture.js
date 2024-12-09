import { alertMessage, obtainPhotoUrl } from "./photoHandler";
import * as ImagePicker from "expo-image-picker";

export const useLibrary = () => {
  //permission state
  const [libraryPermission, setLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions();
  //async function to launch library
  const pickPhoto = async () => {
    try {
      // Check first if the user has granted permissions, and do not proceed until they have
      if (libraryPermission?.granted !== true) {
        const { status } = await setLibraryPermission();
        if (status !== "granted") {
          alertMessage("library");
          return null;
        }
      }
      // Passed the initial permissions check which means they can choose a photo
      const photo = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });
      //Check if the user canceled the image selection process and retrieve an image only if they did not cancel
      if (!photo.canceled) {
        return (libraryPhoto = await obtainPhotoUrl(photo));
      }
    } catch (e) {
      Alert.alert("Error uploading image" + e.message);
    }
  };
  return { pickPhoto };
};
