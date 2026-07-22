import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDQ0JIFXPNplmn3aOLMb2oiTDLCMfazPWs",
  authDomain: "abhasys-7d7f4.firebaseapp.com",
  projectId: "abhasys-7d7f4",
  storageBucket: "abhasys-7d7f4.firebasestorage.app",
  messagingSenderId: "960511008213",
  appId: "1:960511008213:web:e72704e7947183142ab15c",
  measurementId: "G-PK15RHVKTE"
};

console.log("🔥 Initializing Firebase with config:", {
  ...firebaseConfig,
  apiKey: "***hidden***"
});

const app = initializeApp(firebaseConfig);
console.log("🔥 Firebase app name:", app.name);

export const auth = getAuth(app);
export const db = getFirestore(app);

console.log("🔥 Firestore db initialized:", db);
