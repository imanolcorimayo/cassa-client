// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGfjH-e8QWfocrK41h3V25gKWWmiMfQhU",
  authDomain: "cassa-client.firebaseapp.com",
  projectId: "cassa-client",
  storageBucket: "cassa-client.appspot.com",
  messagingSenderId: "1075229616254",
  appId: "1:1075229616254:web:4dee775f363203666d102f",
  measurementId: "G-K8FZGE0L2F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);