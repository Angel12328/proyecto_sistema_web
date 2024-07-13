// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0JlNdNXTYxzVvjTA_fJyuun655AYcOJg",
  authDomain: "emcc-unah.firebaseapp.com",
  databaseURL: "https://emcc-unah-default-rtdb.firebaseio.com",
  projectId: "emcc-unah",
  storageBucket: "emcc-unah.appspot.com",
  messagingSenderId: "342010793536",
  appId: "1:342010793536:web:acf0b2688195bcc71819a5"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export var db = getFirestore(app);
