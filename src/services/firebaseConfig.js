<<<<<<< HEAD
import { initializeApp, getApp, getApps, } from "firebase/app";
import {getAuth, initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

=======
import { initializeApp, getApp, getApps } from 'firebase/app';
>>>>>>> main
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
<<<<<<< HEAD
} from "firebase/storage";
=======
} from 'firebase/storage';
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
>>>>>>> main
import {
  FIREBASE_API_KEY,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_APP_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_AUTH_DOMAIN,
<<<<<<< HEAD
} from "@env";
import { getFirestore } from "firebase/firestore";
import {getAuth } from 'firebase/auth';
=======
} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
>>>>>>> main

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  appId: FIREBASE_APP_ID,
  projectId: FIREBASE_PROJECT_ID,
  authDomain: FIREBASE_AUTH_DOMAIN,
};

// Known error where the initializeApp() tries to load app multiple time
// load only when the app has not been initialised
<<<<<<< HEAD
=======

>>>>>>> main
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const fbApp = getApp();
const fbStorage = getStorage();
<<<<<<< HEAD
const app =initializeApp(firebaseConfig)
const db = getFirestore(app)
<<<<<<< HEAD:firebaseConfig.js

// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });
export const fireAuth = getAuth(app)
=======
const fireAuth = getAuth(app)
>>>>>>> main:src/services/firebaseConfig.js
=======
const fbFireStore = getFirestore(fbApp);
const fbAuth = initializeAuth(fbApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});
>>>>>>> main

export const getPhotoUrl = async (imageName) => {
  const storage = getStorage();
  const imageReference = ref(storage, `images/${imageName}`);
  const downloadUrl = await getDownloadURL(imageReference);
  //console.log("Download URL: " + downloadUrl);
  return downloadUrl;
};

export const firebaseUpload = async (uri, name) => {
  //console.log("config file fileName: " + name);
  //get the URI
  const fetchResponse = await fetch(uri);
  //convert URI to a blob
  const blob = await fetchResponse.blob();
  //store the filename in the desired path: `images/ with the fileName`--Stored w/-->getStorage()
  const imageRef = ref(getStorage(), `images/${name}`);
  //upload the file
  const uploadTask = uploadBytesResumable(imageRef, blob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      //listens for any state changes
<<<<<<< HEAD
      "state_changed",
=======
      'state_changed',
>>>>>>> main
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
<<<<<<< HEAD
<<<<<<< HEAD:firebaseConfig.js
export { db,fbApp, fbStorage, firebaseUpload, getPhotoUrl };
=======
export { fbApp, fbStorage, db, fireAuth };
>>>>>>> main:src/services/firebaseConfig.js
=======

export { fbApp, fbStorage, fbFireStore, fbAuth };
>>>>>>> main
