
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
  // apiKey: "AIzaSyAfcRTTv9G5WQ9yckhNPEJZd7H8yUVs8hc",
  // authDomain: "labspecsmanagement.firebaseapp.com",
  // projectId: "labspecsmanagement",
  // storageBucket: "labspecsmanagement.appspot.com",
  // messagingSenderId: "1014616473231",
  // appId: "1:1014616473231:web:3a395218edc4a898e8bafa",
  // measurementId: "G-JVMS0HWQ36"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); 

export default app;