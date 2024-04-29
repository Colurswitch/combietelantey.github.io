// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getPerformance } from "firebase/performance";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC4zPm3Y3uZJBqU1t7H_DVmxmhHQ96gi_E',
  authDomain: 'combiete-lantey.firebaseapp.com',
  databaseURL: 'https://combiete-lantey-default-rtdb.firebaseio.com',
  projectId: 'combiete-lantey',
  storageBucket: 'combiete-lantey.appspot.com',
  messagingSenderId: '247060132443',
  appId: '1:247060132443:web:34804218276493e396c57e',
  measurementId: 'G-X9J01FH514',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const perf = getPerformance(app);
const auth = getAuth(app);
const database = getDatabase(app);

function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user.uid);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}