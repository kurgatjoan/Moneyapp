// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBh1FzsYYT1gOcKaswqUbko9pr7--TtyW0",
  authDomain: "react2-cae2e.firebaseapp.com",
  projectId: "react2-cae2e",
  storageBucket: "react2-cae2e.appspot.com",
  messagingSenderId: "190945380287",
  appId: "1:190945380287:web:4f330ec423de379e55830a",
  measurementId: "G-YRM5CV6WJ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
