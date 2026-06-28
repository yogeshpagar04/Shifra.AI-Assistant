import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// console.log(import.meta.env.VITE_FIREBASE_API_KEY);
const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  
  authDomain: "shifraai-7e23c.firebaseapp.com",
  projectId: "shifraai-7e23c",
  storageBucket: "shifraai-7e23c.firebasestorage.app",
  messagingSenderId: "125936195957",
  appId: "1:125936195957:web:a92777d4925e0ecedc9b3c"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };