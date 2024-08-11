import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNBQ2wEZk8DG0h-r4CWb6TipYLiGtR1Pw",
  authDomain: "chat-with-pdf-8ccfe.firebaseapp.com",
  projectId: "chat-with-pdf-8ccfe",
  storageBucket: "chat-with-pdf-8ccfe.appspot.com",
  messagingSenderId: "1013967530233",
  appId: "1:1013967530233:web:9af7bbf534775ba00f9a28",
  measurementId: "G-XFRS4LPRTN",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage: any = getStorage(app);

export { db, storage };
