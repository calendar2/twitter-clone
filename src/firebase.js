import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCS-prY-zCmxO1mP-spIc4LFVRFW5EhNf0",
  authDomain: "twitter-reloaded-29b62.firebaseapp.com",
  projectId: "twitter-reloaded-29b62",
  storageBucket: "twitter-reloaded-29b62.appspot.com",
  messagingSenderId: "574724322828",
  appId: "1:574724322828:web:e48171751e96bd44a9e029"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);