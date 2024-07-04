import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBoQmvgxcD2N-nB5ea20nclyAQBKTpcy-Q",
  authDomain: "chat-app-25caa.firebaseapp.com",
  projectId: "chat-app-25caa",
  storageBucket: "chat-app-25caa.appspot.com",
  messagingSenderId: "414225984003",
  appId: "1:414225984003:web:c4b525b95ab1ac5b45fc36",
  measurementId: "G-R1R185MWPQ",
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
