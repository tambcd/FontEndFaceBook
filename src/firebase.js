import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBxnsUNiacC6PMaUoO-_BkHqLBgev4f2HA",
  authDomain: "facebookclone-14463.firebaseapp.com",
  databaseURL: "https://facebookclone-14463-default-rtdb.firebaseio.com",
  projectId: "facebookclone-14463",
  storageBucket: "facebookclone-14463.appspot.com",
  messagingSenderId: "970712404127",
  appId: "1:970712404127:web:44f47d7405e0c0e08212aa",
  measurementId: "G-MHTVPFYEWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Use these for db & auth
const db = getFirestore(app);
const authentication = getAuth(app);
export{authentication,db}