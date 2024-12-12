/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-ef0c2.firebaseapp.com",
  projectId: "mern-blog-ef0c2",
  storageBucket: "mern-blog-ef0c2.appspot.com",
  messagingSenderId: "217073690585",
  appId: "1:217073690585:web:d70770e9b1015a29d29bc8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);