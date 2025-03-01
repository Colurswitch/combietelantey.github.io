/* Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserSessionPersistence, browserLocalPersistence } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js';
import { getPerformance } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-performance.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js';
Import firebase-compat
import * as firebase from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-compat.js';

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
const app = firebase.initializeApp(firebaseConfig);
const analytics = app.analytics(app);
const perf = app.performance(app);
const auth = app.auth(app);
const database = app.database(app);
const user = auth.currentUser;
var ui = new firebaseui.auth.AuthUI(auth);
console.log(app);
console.log(analytics);
console.log(perf);
console.log(auth);
console.log(database);
console.log(user);
console.log(ui);

// Use FirebaseUI to handle the sign-in and sign-up.


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

function initFirebaseUI(){
  ui.start('#firebaseui-auth-container', {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      //firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      //firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    //tosUrl: '<your-tos-url>',
    // Privacy policy url.
    //privacyPolicyUrl: '<your-privacy-policy-url>'
  });
}

initFirebaseUI();*/

// Initialize Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Replace these with your own values
const SUPABASE_URL = 'https://kpmsztuxrlrtbnxxrhpj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwbXN6dHV4cmxydGJueHhyaHBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3OTA1MzYsImV4cCI6MjA1NjM2NjUzNn0.wxYd_XO12CKjUeQZ1_MRPnD5o_S8KBK9XDKL0jh1I1I';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
console.log("Supabase Instance:", supabase);
//document.head.appendChild(newScript);

const sbApp = {
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      "email": email,
      "password": password,
    });
    return { data, error };
  },

  async signInWithOAuth(provider) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: '/account'
      }
    });
    return { data, error };
  },

  async signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
      "email": email,
      "password": password,
    });
    return { data, error };
  },

  async signOut(scope) {
    const { data, error } = await supabase.auth.signOut({
      options: {
        scope: scope,
      }
    });
    return { data, error };
  },

  async updateUser(user_id, updated_fields) {
    const { data, error } = await supabase.from('users').update({
      id: user_id,
     ...updated_fields
    });
    return { data, error };
  },
};

// Export sbApp when used as a module

export default sbApp;
