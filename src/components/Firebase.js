import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'tiktok-362701.firebaseapp.com',
  projectId: 'tiktok-362701',
  storageBucket: 'tiktok-362701.appspot.com',
  messagingSenderId: '514959752911',
  appId: '1:514959752911:web:dc82844aa1c9bf975101ba',
};

export const app = initializeApp(firebaseConfig);
