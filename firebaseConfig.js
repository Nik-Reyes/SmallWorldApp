import Config from 'react-native-config';

import * as FileSystem from 'expo-file-system';
import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getStorage,
  ref,
  listAll,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// import {
//   FIREBASE_API_KEY,
//   FIREBASE_STORAGE_BUCKET,
//   FIREBASE_APP_ID,
//   FIREBASE_PROJECT_ID,
//   FIREBASE_AUTH_DOMAIN,
// } from "@env";
// import { PLANTNET_API_KEY } from '@env';

const API_URL = `https://my-api.plantnet.org/v2/identify/all?api-key=${process.env.PLANTNET_API_KEY}`;


// const firebaseConfig = {
//   apiKey: FIREBASE_API_KEY,
//   storageBucket: FIREBASE_STORAGE_BUCKET,
//   appId: FIREBASE_APP_ID,
//   projectId: FIREBASE_PROJECT_ID,
//   authDomain: FIREBASE_AUTH_DOMAIN,
// };
const firebaseConfig = {
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  projectId: Config.FIREBASE_PROJECT_ID,
  // storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  storageBucket: "smallworld-b093d.appspot.com",

  appId: Config.FIREBASE_APP_ID,
};


// Known error where the initializeApp() tries to load app multiple time
// load only when the app has not been initialised
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const fbApp = getApp();
const fbStorage = getStorage();

const getPhotoUrl = async (imageName) => {
  const storage = getStorage();
  const imageReference = ref(storage, `images/${imageName}`);
  const downloadUrl = await getDownloadURL(imageReference);
  console.log("Download URL: " + downloadUrl);
  return downloadUrl;
};

// const firebaseUpload = async (uri, name) => 
const firebaseUpload = async (imageUri, name) =>{

  console.log("config file fileName: " + name);
  //get the URI
  const fetchResponse = await fetch(imageUri);
  //convert URI to a blob
  const blob = await fetchResponse.blob();

  // // Read file as a binary string using expo-file-system
  // const file = await FileSystem.readAsStringAsync(imageUri, {
  //   encoding: FileSystem.EncodingType.Base64,});
  
  //   // Convert the base64 string to binary data
  //   const binaryString = atob(file);
  //   const len = binaryString.length;
  //   const bytes = new Uint8Array(len);

  //   for (let i = 0; i < len; i++) {
  //       bytes[i] = binaryString.charCodeAt(i);
  //   }

    // const blob = new Blob([bytes], { type: 'image/jpeg' });   
    const imageRef = ref(fbStorage, `images/${name}`);


  // //store the filename in the desired path: `images/ with the fileName`--Stored w/-->getStorage()
  // const imageRef = ref(getStorage(), `images/${name}`);
  // //upload the file
  const uploadTask = uploadBytesResumable(imageRef, blob);
  // const uploadTask = uploadBytesResumable(imageRef, buffer);

  // const uploadTask = uploadBytesResumable(imageRef, Buffer.from(file, 'base64'));
  // const uploadTask = uploadBytesResumable(imageRef, file, { contentType: 'image/jpeg' });


  return new Promise((resolve, reject) => {
    uploadTask.on(
      //listens for any state changes
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        // if some error occurs, then reject the upload process before the upload task is complete
        reject(error);
      },
      //If everything so far is good, then get the downloadUrl and finish the upload task
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadURL,
          metadata: uploadTask.snapshot.metadata,
        });
      }
    );
  });
};
export { fbApp, fbStorage, firebaseUpload, getPhotoUrl };
