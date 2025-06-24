// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; //  Firestore eklendi

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGGOzuPxU-oI5ZrerAw808e6C55llMauc",
  authDomain: "chat-app-bae85.firebaseapp.com",
  projectId: "chat-app-bae85",
  storageBucket: "chat-app-bae85.firebasestorage.app",
  messagingSenderId: "969413406576",
  appId: "1:969413406576:web:68575299d7cd93b475e9b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Auth ve Provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

//  Firestore veritabanı referansı
export const db = getFirestore(app);
