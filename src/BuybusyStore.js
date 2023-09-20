// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGrv0XONQrqtanGn4YZq3_6bBRD3CuBQw",
  authDomain: "buybusy-685a5.firebaseapp.com",
  projectId: "buybusy-685a5",
  storageBucket: "buybusy-685a5.appspot.com",
  messagingSenderId: "722303487051",
  appId: "1:722303487051:web:b70788701df07a03f711ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)