// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTwPdD3mWUgvZRXgF6Eqp79hW2w4-vvo8",
  authDomain: "i-am-on-new-level.firebaseapp.com",
  projectId: "i-am-on-new-level",
  storageBucket: "i-am-on-new-level.appspot.com",
  messagingSenderId: "551343355801",
  appId: "1:551343355801:web:bb6a54cd16e01e3a834508",
  measurementId: "G-SNEXG7S2Z1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default (app)