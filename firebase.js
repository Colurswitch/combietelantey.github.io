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
  supabase: supabase,
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
        redirectTo: window.location.origin,
      }
    });
    return { data, error };
  },

  async signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
      "email": email,
      "password": password,
    });
    if (!error) {
      // Create a new User record in the database, and link it to the current user.
      const { data2, error2 } = await supabase.from('users').insert([{
        id: data.user.id,
        email: data.user.email,
        display_name: data.user.email,
        enabled: true, // If false, the user is restricted from logging in.
        bio: "Anonymous",
        associated: false,
        verified: false,
        perms: [],
        photo_url: "",
        banner_url: "",
      }]);
      if (!error2) {
        console.log('User created and linked to current session:', data2);
      }
    }
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

  async isSignedIn() {
    const { data, error } = await supabase.auth.getSession();
    return!!data.session.expires_at;
  },

  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    return { data, error };
  },

  async getUser(user_id) {
    const { data, error } = await supabase.from('users').select().eq(
      "id", user_id
    )
    return { data, error };
  },

  async fetchVideos() {
    const { data, error } = await supabase.from('videos').select();
    return { data, error };
  },

  async fetchVideosByCurrentUser() {
    const { data, error } = await supabase.from('videos').select().eq(
      "creator", (await this.getCurrentUser()).data.user.id
    )
    return { data, error };
  },

  async fetchVideoById(video_id) {
    const { data, error } = await supabase.from('videos').select().eq(
      "id", video_id
    )
    return { data, error };
  },

  async createVideo(title, description, vidSrc, thumbnailUrl, tracks = []) {
    if (!(await this.isSignedIn())) {
      // User is not signed in.
      return;
    }
    const { data, error } = await supabase.from('videos').insert({
      title: title,
      description: description,
      video: vidSrc,
      thumbnail: thumbnailUrl,
      creator: (await this.getCurrentUser()).data.user.id,
      tracks: tracks,
    });
    return { data, error };
  },

  async likeVideoById(video_id) {
    if (!(await this.isSignedIn())) {
      // User is not signed in.
      return;
    }
    const { data, error } = await supabase.from('videos').update({
      likes: (await this.fetchVideoById(video_id)).data[0].likes.concat((await this.getCurrentUser()).data.user.id),
    }).eq(video_id);
    return { data, error };
  },

  async unlikeVideoById(video_id) {
    if (!(await this.isSignedIn())) {
      // User is not signed in.
      return;
    }
    var arr = (await this.fetchVideoById(video_id)).data[0].likes;
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]!== (await this.getCurrentUser()).data.user.id) {
        newArr.push(arr[i]);
      }
    }
    const { data, error } = await supabase.from('videos').update({
      likes: newArr,
    }).eq(video_id);
    return { data, error };
  },

  async dislikeVideoById(video_id) {
    if (!(await this.isSignedIn())) {
      // User is not signed in.
      return;
    }
    const { data, error } = await supabase.from('videos').update({
      dislikes: (await this.fetchVideoById(video_id)).data[0].dislikes.concat((await this.getCurrentUser()).data.user.id),
    }).eq(video_id);
    return { data, error };
  },

  async undislikeVideoById(video_id) {
    if (!(await this.isSignedIn())) {
      // User is not signed in.
      return;
    }
    var arr = (await this.fetchVideoById(video_id)).data[0].dislikes;
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]!== (await this.getCurrentUser()).data.user.id) {
        newArr.push(arr[i]);
      }
    }
    const { data, error } = await supabase.from('videos').update({
      dislikes: newArr,
    }).eq(video_id);
    return { data, error };
  },

  async fetchCommentsByVideoId(video_id) {
    var cmnts = (await this.fetchVideoById(video_id)).data[0].comments; // Returns list of IDs of comments
    const { data, error } = await supabase.from('video_comments').select(`
      id, created_at, author (
        display_name, handle, photo_url
      ), content, likes, dislikes, replies
    `).in("id", cmnts);
    return { data, error };
  }
};

// Export sbApp when used as a module
export default sbApp;