// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserSessionPersistence, browserLocalPersistence } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js';
import { getPerformance } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-performance.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js';

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
const user = auth.currentUser;
console.log(app);
console.log(analytics);
console.log(perf);
console.log(auth);
console.log(database);

function signUp(email, password, stay) {
	setPersistence(auth, stay? browserLocalPersistence : browserSessionPersistence);
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user.uid);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`${errorCode}: ${errorMessage}`);
  });
}

function signIn(email, password, stay){
  setPersistence(auth, stay? browserLocalPersistence : browserSessionPersistence);
	signInWithEmailAndPassword(auth,email,password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
	console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
	  console.error(`${errorCode}: ${errorMessage}`);
  });
}