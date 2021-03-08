import firebase from "firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBCjJdM8LPXzN0ZFG5ucns4gX6Eh-HVYh8",
    authDomain: "bt3103-week-6-yan.firebaseapp.com",
    projectId: "bt3103-week-6-yan",
    storageBucket: "bt3103-week-6-yan.appspot.com",
    messagingSenderId: "417723675024",
    appId: "1:417723675024:web:1bb8e6945825c07bcb4315",
    measurementId: "G-9X2ZQ2SFH8"
};
  

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;