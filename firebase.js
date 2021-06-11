import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCqeeb5KMu51f4vkHtf-YivL1Lqdub5ODU",
    authDomain: "nicechat-4a5b2.firebaseapp.com",
    projectId: "nicechat-4a5b2",
    storageBucket: "nicechat-4a5b2.appspot.com",
    messagingSenderId: "991091979405",
    appId: "1:991091979405:web:77fced73e2b7c49b589ec4",
    measurementId: "G-BP8RNR6R6D"
  };

  //Becouse we use ssr we dont want re init app if we dont need to

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

  const db = firebase.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db, auth, provider };