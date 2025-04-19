// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAO0rmQsVxgcn5egZ-6u4X7NQYfPyS9VRM",
  authDomain: "expense-tracker-668c2.firebaseapp.com",
  projectId: "expense-tracker-668c2",
  storageBucket: "expense-tracker-668c2.firebasestorage.app",
  messagingSenderId: "600108872059",
  appId: "1:600108872059:web:ce1f4b67ad527d41134dde",
  measurementId: "G-S6YGQ5BYCG"
};

const app = initializeApp(firebaseConfig);

// ✅ Export the auth and provider properly
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };