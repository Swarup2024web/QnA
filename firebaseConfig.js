// Import Firebase libraries
// Make sure to include this script in your HTML or build process
// Use Firebase CDN version for simplicity in browser environments
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApDnDrhy_Z0zvLoWfvsmP4JJSUIdtSulM",
  authDomain: "qnasite-6d9cc.firebaseapp.com",
  projectId: "qnasite-6d9cc",
  storageBucket: "qnasite-6d9cc.firebasestorage.app",
  messagingSenderId: "707268852195",
  appId: "1:707268852195:web:05e13ee17b0d96253688d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

// Export the database instance
export { db };
