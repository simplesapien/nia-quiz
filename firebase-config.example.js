// Copy this file to firebase-config.js and fill in your values.
// Get config from: Firebase Console > Project Settings > Your apps
//
// Firestore rules (Firestore > Rules):
//   match /comments/{doc} { allow read, write: if true; }
//   match /leaderboard/{doc} { allow read, write: if true; }
//
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
