import firebase from "firebase";

var firebaseApp = firebase.initializeApp({
  // Your firebase credentials
    apiKey: "AIzaSyBrLfHGp1DJuxwZPPf1X01pblI0BSu1ft0",
  authDomain: "iiteens-42a36.firebaseapp.com",
  databaseURL: "https://iiteens-42a36.firebaseio.com",
  projectId: "iiteens-42a36",
  storageBucket: "iiteens-42a36.appspot.com",
  messagingSenderId: "543810068637",
  appId: "1:543810068637:web:8cf52af6ccf29dc5323474",
  measurementId: "G-VE1PZY2BW5"
});

var db = firebaseApp.firestore();
var storage = firebase.storage();

export { db , storage};