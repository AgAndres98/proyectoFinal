// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB63k_mN-0TJIjAE6Xnh2JBtUN_FkequB0",
  authDomain: "ayudar-1fb1a.firebaseapp.com",
  projectId: "ayudar-1fb1a",
  storageBucket: "ayudar-1fb1a.appspot.com",
  messagingSenderId: "284011345493",
  appId: "1:284011345493:web:f3d04f78165a726a4d86dc"
};

// Initialize Firebase
export const initFirebase = initializeApp(firebaseConfig);