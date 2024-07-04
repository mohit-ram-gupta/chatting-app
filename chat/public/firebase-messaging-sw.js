// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBoQmvgxcD2N-nB5ea20nclyAQBKTpcy-Q",
  authDomain: "chat-app-25caa.firebaseapp.com",
  projectId: "chat-app-25caa",
  storageBucket: "chat-app-25caa.appspot.com",
  messagingSenderId: "414225984003",
  appId: "1:414225984003:web:c4b525b95ab1ac5b45fc36",
  measurementId: "G-R1R185MWPQ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
