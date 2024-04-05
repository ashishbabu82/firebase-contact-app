// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { Firestore, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS0vL9yj85T6nixIiTlUHM28FNMsYIhHY",
  authDomain: "vite-contact-ebdb6.firebaseapp.com",
  projectId: "vite-contact-ebdb6",
  storageBucket: "vite-contact-ebdb6.appspot.com",
  messagingSenderId: "710492794726",
  appId: "1:710492794726:web:bbe730ecf69dc48e5262a7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);