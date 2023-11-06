// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpGKtrwNLhQjqI7z8lYixFktewElU0_F8",
  authDomain: "buybusy-38cd0.firebaseapp.com",
  projectId: "buybusy-38cd0",
  storageBucket: "buybusy-38cd0.appspot.com",
  messagingSenderId: "355297147645",
  appId: "1:355297147645:web:9316b006eb37a577c49c94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);