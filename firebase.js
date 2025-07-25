// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyApDnDrhy_Z0zvLoWfvsmP4JJSUIdtSulM",
  authDomain: "qnasite-6d9cc.firebaseapp.com",
  projectId: "qnasite-6d9cc",
  storageBucket: "qnasite-6d9cc.firebasestorage.app",
  messagingSenderId: "707268852195",
  appId: "1:707268852195:web:05e13ee17b0d96253688d6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc };
