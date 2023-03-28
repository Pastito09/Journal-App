// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMABIXMk8ZH0AJAM9B4g5P4K36_lxfEX8",
  authDomain: "react-curso-32294.firebaseapp.com",
  projectId: "react-curso-32294",
  storageBucket: "react-curso-32294.appspot.com",
  messagingSenderId: "225762895290",
  appId: "1:225762895290:web:036d51dbeaf3e30e4e6983"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);
