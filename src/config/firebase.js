// import * as firebase from "firebase/app";
import firebase from "firebase/app";
// import firebase from "firebase";
import "firebase/firestore";

import "firebase/auth";

const firebaseConfig = {
  // 各人の認証情報を記述
  apiKey: "AIzaSyBBiMBKhzTkZGQRon64aN6eGRVLmt3ilpY",
  authDomain: "chat-app-85ac4.firebaseapp.com",
  projectId: "chat-app-85ac4",
  storageBucket: "chat-app-85ac4.appspot.com",
  messagingSenderId: "570389847674",
  appId: "1:570389847674:web:4c0d59379c9de2397ce5c3",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
