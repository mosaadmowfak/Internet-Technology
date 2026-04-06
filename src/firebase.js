import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC96YxG9eMWlHKE0xYksyNrmeBxQwyreBk",
  authDomain: "internettech-75e59.firebaseapp.com",
  projectId: "internettech-75e59",
  storageBucket: "internettech-75e59.firebasestorage.app",
  messagingSenderId: "950025055182",
  appId: "1:950025055182:web:5dab9660f71a82ac74999f",
  measurementId: "G-G4L2GGZXWM"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);