// Replace with your Firebase project config from Firebase Console > Project Settings
// Get it at: https://console.firebase.google.com/ > Your project > Project settings > Your apps
//
// Firestore setup: Enable Firestore in Firebase Console. Add these security rules (Rules tab):
//   match /comments/{doc} { allow read, write: if true; }
//   match /leaderboard/{doc} { allow read, write: if true; }
// If you get an index error, click the link in the console to create the required index.
//
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
