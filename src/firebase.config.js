// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAG0ETE-lIjTghnsK7lwt69hz5Xx5itCwI',
  authDomain: 'house-marketplace-app-ba831.firebaseapp.com',
  projectId: 'house-marketplace-app-ba831',
  storageBucket: 'house-marketplace-app-ba831.appspot.com',
  messagingSenderId: '519766657979',
  appId: '1:519766657979:web:108aaeece1310cbbeed29e',
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
