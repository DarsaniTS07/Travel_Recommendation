// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqxK-WRNg1MayFt8vkrAn6MJ1Hc188jt0",
  authDomain: "travel-planner-b9230.firebaseapp.com",
  projectId: "travel-planner-b9230",
  storageBucket: "travel-planner-b9230.firebasestorage.app",
  messagingSenderId: "633493523153",
  appId: "1:633493523153:web:2d5ad1906affbbe106d3f0",
  measurementId: "G-HZSLJHGW5H"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);