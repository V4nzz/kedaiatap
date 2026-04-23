// Firebase Modular SDK v10
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApw-QK0t92BUUkBns1zWNCa5AYGogd73A",
  authDomain: "kedaiatap-71258.firebaseapp.com",
  projectId: "kedaiatap-71258",
  storageBucket: "kedaiatap-71258.firebasestorage.app",
  messagingSenderId: "819999243734",
  appId: "1:819999243734:web:6eb91467237c6d91c03877",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
