// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-97172.firebaseapp.com",
  projectId: "mern-blog-97172",
  storageBucket: "mern-blog-97172.appspot.com",
  messagingSenderId: "69716381433",
  appId: "1:69716381433:web:b2836006e9c87645bbdc28",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
