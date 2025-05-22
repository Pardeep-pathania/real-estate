// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pathania-estate.firebaseapp.com",
  projectId: "pathania-estate",
  storageBucket: "pathania-estate.firebasestorage.app",
  messagingSenderId: "206112360746",
  appId: "1:206112360746:web:55cd50c3cf7f90f791b653",
  measurementId: "G-7H6XCDKKEQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);