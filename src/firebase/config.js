// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from "../helpers/getEnvironments";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();


//console.log( process.env );
//console.log( import.meta.env );

// Your web app's Firebase configuration
//DEV/PROD
//const firebaseConfig = {
//  apiKey: "AIzaSyBMABIXMk8ZH0AJAM9B4g5P4K36_lxfEX8",
//  authDomain: "react-curso-32294.firebaseapp.com",
//  projectId: "react-curso-32294",
//  storageBucket: "react-curso-32294.appspot.com",
//  messagingSenderId: "225762895290",
//  appId: "1:225762895290:web:036d51dbeaf3e30e4e6983"
//};
//testing
//const firebaseConfig = {
//  apiKey: "AIzaSyBne3QuQd5yZGZZHo4IdYP8ooI2ddlbyyY",
//  authDomain: "prueba-de-thunks.firebaseapp.com",
//  projectId: "prueba-de-thunks",
//  storageBucket: "prueba-de-thunks.appspot.com",
//  messagingSenderId: "218903241403",
//  appId: "1:218903241403:web:4e5e3baaab89e7d34bbf9e"
//};

const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};


// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);
