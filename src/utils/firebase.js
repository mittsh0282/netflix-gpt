// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTJG1nbFGkTTDrxA61oGTwPXmT8CKzOLk",
  authDomain: "netflixgpt-98c55.firebaseapp.com",
  projectId: "netflixgpt-98c55",
  storageBucket: "netflixgpt-98c55.firebasestorage.app",
  messagingSenderId: "185084862848",
  appId: "1:185084862848:web:eafc04285b3cdfdd03a165",
  measurementId: "G-9LC6TM078J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();