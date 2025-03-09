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
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Replace these with your own values
const SUPABASE_URL = "https://kpmsztuxrlrtbnxxrhpj.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwbXN6dHV4cmxydGJueHhyaHBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3OTA1MzYsImV4cCI6MjA1NjM2NjUzNn0.wxYd_XO12CKjUeQZ1_MRPnD5o_S8KBK9XDKL0jh1I1I";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
console.log("Supabase Instance:", supabase);
//document.head.appendChild(newScript);

const sbApp = {
  supabase: supabase,
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    return { data, error };
  },

  async signInWithOAuth(provider) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: window.location.origin,
      },
    });
    return { data, error };
  },

  async signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (!error) {
      // Create a new User record in the database, and link it to the current user.
      const { data2, error2 } = await supabase.from("users").insert([
        {
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
        },
      ]);
      if (!error2) {
        console.log("User created and linked to current session:", data2);
      }
    }
    return { data, error };
  },

  async signOut(scope) {
    const { error } = await supabase.auth.signOut({
      options: {
        scope: scope,
      },
    });
    return { error };
  },

  async updateUser(user_id, updated_fields) {
    const { data, error } = await supabase.from("users").update({
      id: user_id,
      ...updated_fields,
    }).eq("id",user_id);
    return { data, error };
  },

  async updateCurrentUser(updated_fields) {
    const { data, error } = await this.updateUser(
      (await this.getCurrentUser()).data.user.id,
      updated_fields
    );
    return { data, error };
  },

  async isSignedIn() {
    const { data, error } = await supabase.auth.getUser();
    return !!data.user;
  },

  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    return { data, error };
  },

  async getCurrentUserRecord() {
    const { data, error } = await supabase.from("users").select().eq(
      "id",
      (await this.getCurrentUser()).data.user.id
    );
    return { data, error };
  },

  async getUser(user_id) {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("id", user_id);
    return { data, error };
  },

  async getUsers() {
    const { data, error } = await supabase.from("users").select();
    return { data, error };
  },

  async getUsersEnum() {
    const { data, error } = await supabase.from("users").select("id, display_name");
    // "data" will return list of IDs of users
    return { data, error };
  },

  async getUsersFollowingUser(user_id) {
    const { data, error } = await supabase
      .from("followers")
      .select(`
        id, follower (
          display_name, verified, id
        ), following (
          display_name, verified, id
        )
      `)
      .eq("following", user_id);
    // "data" will return list of IDs of users following the specified user
    return { data, error };
  },

  async getUsersFollowedByUser(user_id) {
    const { data, error } = await supabase
      .from("followers")
      .select(`
        id, follower (
          display_name, verified, id
        ), following (
          display_name, verified, id
        )
      `)
      .eq("follower", user_id);
    // "data" will return list of IDs of users who follow the specified user
    return { data, error };
  },

  async followUser(user_id) {
    const { data, error } = await supabase
      .from("followers")
      .insert({
         follower: (await this.getCurrentUser()).data.user.id,
         following: user_id,
       });
    return { data, error };
  },

  async unfollowUser(user_id) {
    const { data, error } = await supabase
      .from("followers")
      .delete()
      .eq("follower", (await this.getCurrentUser()).data.user.id)
      .eq("following", user_id);
    return { data, error };
  },

  async searchUsers(query) {
    const { data, error } = await supabase
      .from("users")
      .select()
      .textSearch("display_name", query, {
        type: "websearch"
      });
    return { data, error };
  },

  async fetchVideos() {
    const { data, error } = await supabase.from("videos").select(`
      id, title, description, creator (
        display_name, verified, id, photo_url
      ), thumbnail, created_at
    `);
    return { data, error };
  },

  async fetchVideosByUser(user_id) {
    const { data, error } = await supabase
      .from("videos")
      .select()
      .eq("creator", user_id);
    return { data, error };
  },

  async fetchVideosByCurrentUser() {
    const { data, error } = await this.fetchVideosByUser((await this.getCurrentUser()).data.user.id);
    return { data, error };
  },

  async fetchVideoById(video_id) {
    const { data, error } = await supabase
      .from("videos")
      .select()
      .eq("id", video_id);
    return { data, error };
  },

  async searchVideos(query) {
    const { data, error } = await supabase
      .from("videos")
      .select()
      .textSearch("title", query, {
        type: "websearch"
      });
    return { data, error };
  },

  async createVideo(title, description, vidSrc, thumbnailUrl, tracks = []) {
    if (!(await this.isSignedIn())) {
      // User is not signed in.
      return;
    }
    // User is signed in. Insert a new video record into the database.
    // First, upload the video
    const { data1, error1 } = await this.uploadVideo(
      vidSrc,
      title.replace(" ", "_") + "_" + this.randomString(10)
    );
    if (error) {
      console.error("Failed to upload video: ", error);
      return;
    }
    const { data, error } = await supabase.from("videos").insert({
      title: title,
      description: description,
      video: data1.fullPath,
      thumbnail: thumbnailUrl,
      creator: (await this.getCurrentUser()).data.user.id,
      tracks: tracks,
    });
    return { data, error };
  },

  async deleteVideo(videoId) {
    //if (!confirm('Are you sure you want to delete this video?')) { return; }
    const { data, error } = await supabase
      .from("videos")
      .delete()
      .eq("id", videoId);
    return { data, error };
  },

  randomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  },

  base64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  },

  b64toBlob(b64Data, contentType = "", sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  },

  async uploadVideo(base64, filename) {
    const { data, error } = await supabase.storage
      .from("clmain")
      .upload(
        "videos/db_uploads/" + filename,
        this.b64toBlob(base64, "video/mp4"),
        {
          contentType: "video/mp4",
        }
      );
    return { data, error };
  },

  async likeVideoById(video_id) {
    if (!(await this.isSignedIn())) {
      // User is not signed in.
      return;
    }
    const { data, error } = await supabase
      .from("videos")
      .update({
        likes: (
          await this.fetchVideoById(video_id)
        ).data[0].likes.concat((await this.getCurrentUser()).data.user.id),
      })
      .eq(video_id);
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
      if (arr[i] !== (await this.getCurrentUser()).data.user.id) {
        newArr.push(arr[i]);
      }
    }
    const { data, error } = await supabase
      .from("videos")
      .update({
        likes: newArr,
      })
      .eq(video_id);
    return { data, error };
  },

  async dislikeVideoById(video_id) {
    if (!(await this.isSignedIn())) {
      // User is not signed in.
      return;
    }
    const { data, error } = await supabase
      .from("videos")
      .update({
        dislikes: (
          await this.fetchVideoById(video_id)
        ).data[0].dislikes.concat((await this.getCurrentUser()).data.user.id),
      })
      .eq(video_id);
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
      if (arr[i] !== (await this.getCurrentUser()).data.user.id) {
        newArr.push(arr[i]);
      }
    }
    const { data, error } = await supabase
      .from("videos")
      .update({
        dislikes: newArr,
      })
      .eq(video_id);
    return { data, error };
  },

  async fetchCommentsByVideoId(video_id) {
    const { data, error } = await supabase
      .from("video_comments")
      .select(
        `
      id, created_at, author (
        display_name, handle, photo_url, verified, id
      ), content, likes, dislikes, replies
    `
      )
      .eq("video", video_id);
    return { data, error };
  },

  async fetchCommentById(comment_id) {
    const { data, error } = await supabase
      .from("video_comments")
      .select(
        `
      id, created_at, author (
        display_name, handle, photo_url, verified, id
      ), content, likes, dislikes, replies, video (*)
    `
      )
      .eq("id", comment_id);
    return { data, error };
  },

  async createComment(video_id, content) {
    if (!(await this.isSignedIn())) {
      // User is not signed in.
      return;
    }
    const { data, error } = await supabase.from("video_comments").insert({
      content: content,
      video: video_id,
      author: (await this.getCurrentUser()).data.user.id,
    });
    return { data, error };
  },

  async deleteComment(comment_id) {
    if (!(await this.isSignedIn())) {
      // User is not signed in.
      return;
    } else if (
      (await this.getCurrentUser()).data.user.id !=
      (await this.fetchCommentById(comment_id)).data[0].author.id
    ) {
      // User is not authorized to delete this comment.
      alert("You are not authorized to delete this comment.");
      return;
    }
    const { data, error } = await supabase
      .from("video_comments")
      .delete()
      .eq("id", comment_id);
    return { data, error };
  },

  async editComment(comment_id, new_content) {
    if (!(await this.isSignedIn())) {
      // User is not signed in.
      return;
    } else if (
      (await this.getCurrentUser()).data.user.id !=
      (await this.fetchCommentById(comment_id)).data[0].author.id
    ) {
      // User is not authorized to edit this comment.
      alert("You are not authorized to edit this comment.");
      return;
    }
    const { data, error } = await supabase
      .from("video_comments")
      .update({
        content: new_content,
      })
      .eq("id", comment_id);
    return { data, error };
  },

  async createReplyToComment(comment_id, content) {
    if (!(await this.isSignedIn())) {
      // User is not signed in.
      return;
    }
    const { data, error } = await supabase
      .from("video_comment_replies")
      .insert({
        content: content,
        comment: comment_id,
        author: (await this.getCurrentUser()).data.user.id,
      });
    return { data, error };
  },

  async deleteReply(reply_id) {
    if (!(await this.isSignedIn())) {
      // User is not signed in.
      return;
    } else if (
      (await this.getCurrentUser()).data.user.id !=
      (await this.fetchReplyById(reply_id)).data[0].author.id
    ) {
      // User is not authorized to delete this reply.
      alert("You are not authorized to delete this reply.");
      return;
    }
    const { data, error } = await supabase
      .from("video_comment_replies")
      .delete()
      .eq("id", reply_id);
    return { data, error };
  },

  async fetchRepliesByCommentId(comment_id) {
    const { data, error } = await supabase
      .from("video_comment_replies")
      .select(
        `
      id, created_at, author (
        display_name, handle, photo_url, verified, id
      ), content, likes, dislikes
    `
      )
      .eq("comment", comment_id);
    return { data, error };
  },

  async fetchRelatedVideos(video_id) {
    const { data, error } = await supabase
      .from("videos")
      .select(
        `
      id, title, description, video, thumbnail, creator (
        display_name, handle, photo_url, verified, id
      ), likes, dislikes, views
    `
      )
      .neq("id", video_id);
    return { data, error };
  },

  async fetchMessagesToUser(user_id) {
    const { data, error } = await supabase
      .from("messages")
      .select(
        `
      id, sender (
        display_name, handle, photo_url, verified, id
      ), recipient (
        display_name, handle, photo_url, verified, id
      ), content, created_at, subject
    `
      )
      .eq("recipient", user_id);
    return { data, error };
  },

  async fetchMessagesByUser(user_id) {
    const { data, error } = await supabase
      .from("messages")
      .select(
        `
      id, sender (
        display_name, handle, photo_url, verified, id
      ), recipient (
        display_name, handle, photo_url, verified, id
      ), content, created_at, subject
    `
      )
      .eq("sender", user_id);
    return { data, error };
  },

  async fetchMessagesToCurrentUser() {
    const { data, error } = await this.fetchMessagesToUser(
      (await this.getCurrentUser()).data.user.id
    );
    return { data, error };
  },

  async fetchMessagesByCurrentUser() {
    const { data, error } = await this.fetchMessagesByUser(
      (await this.getCurrentUser()).data.user.id
    );
    return { data, error };
  },

  async fetchMessageById(message_id) {
    const { data, error } = await supabase
      .from("messages")
      .select(
        `
      id, sender (
        display_name, handle, photo_url, verified, id
      ), recipient (
        display_name, handle, photo_url, verified, id
      ), content, subject, created_at
    `
      )
      .eq("id", message_id);
    return { data, error };
  },

  async sendMessage(subject, recipient_ids, content) {
    if (!(await this.isSignedIn())) {
      // User is not signed in.
      return;
    }
    const { data, error } = await supabase.from("messages").insert({
      sender: (await this.getCurrentUser()).data.user.id,
      recipients: recipient_ids,
      content: content,
      subject: subject,
    });
    return { data, error };
  },

  async deleteMessage(message_id) {
    if (!(await this.isSignedIn())) {
      // User is not signed in.
      return;
    } else if (
      (await this.getCurrentUser()).data.user.id !=
      (await this.fetchMessageById(message_id)).data[0].sender.id
    ) {
      // User is not authorized to delete this message.
      alert("You are not authorized to delete this message.");
      return;
    }
    const { data, error } = await supabase
      .from("messages")
      .delete()
      .eq("id", message_id);
    return { data, error };
  },

  async uploadFile(file, name, type) {
    const { data, error } = await supabase.storage
     .from("clmain")
     .upload("cms_uploads/"+name, file, {
        contentType: type
     });
    return { data, url: await supabase.storage.from("clmain").getPublicUrl(data.path).data.publicUrl, error };
  }
};

// Export sbApp when used as a module
export default sbApp;
