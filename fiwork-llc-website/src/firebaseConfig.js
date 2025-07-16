import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCLftzVoVyUAhXikz6g9fe7LrV1Gxyp6b8",
  authDomain: "fiworkllc.firebaseapp.com",
  projectId: "fiworkllc",
  storageBucket: "fiworkllc.firebasestorage.app",
  messagingSenderId: "1008493885472",
  appId: "1:1008493885472:web:987058b45ec77597d5e445"
};

const app = initializeApp (firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage, app};