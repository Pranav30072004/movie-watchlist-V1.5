import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_KEY,
    authDomain: "movie-watchlist-572df.firebaseapp.com",
    projectId: "movie-watchlist-572df",
    storageBucket: "movie-watchlist-572df.firebasestorage.app",
    messagingSenderId: "941309279257",
    appId: "1:941309279257:web:b1ca39159232007a447e88"
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();