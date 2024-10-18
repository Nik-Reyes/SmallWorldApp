import { initializeApp, getApp, getApps } from "firebase/app";
// Firebase Storage
import {
  getStorage,
  ref,
  listAll,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
// .env Varibles
import {
  FIREBASE_API_KEY,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_APP_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_AUTH_DOMAIN,
} from "@env";
// Firebase Auth
import { getAuth } from "firebase/auth";
// Firebase Firestore
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  appId: process.env.FIREBASE_APP_ID,
  projectId: process.env.FIREBASE_PROJECT_ID,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
};

// Known error where the initializeApp() tries to load app multiple time
// load only when the app has not been initialised
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const fbApp = getApp();

const fbStorage = getStorage();
const fbFirestore = getFirestore(fbApp);
const fbAuth = getAuth(fbApp);

const getPhotoUrl = async (imageName) => {
  const storage = getStorage();
  const imageReference = ref(storage, `images/${imageName}`);
  const downloadUrl = await getDownloadURL(imageReference);
  console.log("Download URL: " + downloadUrl);
  return downloadUrl;
};

const firebaseUpload = async (uri, name) => {
  console.log("config file fileName: " + name);
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
      "state_changed",
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
export { 
  fbApp, 
  fbStorage, 
  firebaseUpload, 
  getPhotoUrl,
  fbFirestore,
  fbAuth 
};
