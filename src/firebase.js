import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyC1sXbgruOHVzTu_-hvDcij-LX0W6iklGA",
    authDomain: "discord-clone-8f3e9.firebaseapp.com",
    databaseURL: "https://discord-clone-8f3e9.firebaseio.com",
    projectId: "discord-clone-8f3e9",
    storageBucket: "discord-clone-8f3e9.appspot.com",
    messagingSenderId: "287118265395",
    appId: "1:287118265395:web:32dcc9a52ca99b1324e746",
    measurementId: "G-Q81FVP8FWX"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;