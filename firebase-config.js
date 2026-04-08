// ==========================================
// FIREBASE CONFIGURATION
// Replace these values with your actual Firebase project config
// Go to: Firebase Console → Project Settings → Your apps → Web app
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔴 REPLACE WITH YOUR FIREBASE CONFIG
  const firebaseConfig = {
    apiKey: "AIzaSyAFgFEbIqboT5WnRPa4zBPW0zIoyX6a45U",
    authDomain: "radhika-dairy.firebaseapp.com",
    projectId: "radhika-dairy",
    storageBucket: "radhika-dairy.firebasestorage.app",
    messagingSenderId: "121799847984",
    appId: "1:121799847984:web:4afa66d6452248db69bdf5"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);
