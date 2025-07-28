// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBYicizsGNJRpkhXpFsz8Zr5pc50YtNzJo",
    authDomain: "notes-8362c.firebaseapp.com",
    projectId: "notes-8362c",
    storageBucket: "notes-8362c.firebasestorage.app",
    messagingSenderId: "213950924694",
    appId: "1:213950924694:web:e0ea679b0e90c1bf26ffb7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
