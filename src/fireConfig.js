// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyEY2F5UVGQGzIALR6jEfJbiVCRBu0eLQ",
  authDomain: "mobilestore-4d9eb.firebaseapp.com",
  projectId: "mobilestore-4d9eb",
  storageBucket: "mobilestore-4d9eb.appspot.com",
  messagingSenderId: "48180309668",
  appId: "1:48180309668:web:253701e322ae9fc54c4031",
  measurementId: "G-0RXWZ91503"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
