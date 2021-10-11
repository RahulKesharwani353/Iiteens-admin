import firebase from "firebase";

var firebaseApp = firebase.initializeApp({
  // Your firebase credentials
  apiKey: "AIzaSyBh6Zvsrrsh0BBuoCH4_coh7ww2AKzZ8ZU",
  authDomain: "iitteeen.firebaseapp.com",
  projectId: "iitteeen",
  storageBucket: "iitteeen.appspot.com",
  messagingSenderId: "402600587411",
  appId: "1:402600587411:web:7b58e12e1e589693c21d66"
});

var db = firebaseApp.firestore();
var storage = firebase.storage();

export { db , storage};