import React from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const auth = {
  apiKey: "AIzaSyAB7Lzh8S8p5Uu7qXM8qk03rTTANXeQpGE",
  authDomain: "chat-app-21503.firebaseapp.com",
  projectId: "chat-app-21503",
  storageBucket: "chat-app-21503.appspot.com",
  messagingSenderId: "596319413622",
  appId: "1:596319413622:web:97f4541627e8ecd3774657",
};

//console.log(auth);

// Initialize Firebase
const app = initializeApp(auth);

export const db = getFirestore(app);
export const auths = getAuth();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
