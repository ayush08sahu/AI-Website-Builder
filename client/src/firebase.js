import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"



const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "genwebai-f47cc.firebaseapp.com",
  projectId: "genwebai-f47cc",
  storageBucket: "genwebai-f47cc.firebasestorage.app",
  messagingSenderId: "768132767037",
  appId: "1:768132767037:web:58cef4341fc33fdc767954"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}