// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "olx-clone-5a8f4.firebaseapp.com",
  projectId: "olx-clone-5a8f4",
  storageBucket: "olx-clone-5a8f4.appspot.com",
  messagingSenderId: "771790424228",
  appId: "1:771790424228:web:a138f63ebc6f929fe6fe31"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);