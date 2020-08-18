import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBXULBIoTVHcP_5GlcK0PpYodJ1QpCEe4g',
  authDomain: 'dashboard-oi.firebaseapp.com',
  databaseURL: 'https://dashboard-oi.firebaseio.com',
  projectId: 'dashboard-oi',
  storageBucket: 'dashboard-oi.appspot.com',
  messagingSenderId: '385489150910',
  appId: '1:385489150910:web:298e661048a82ff0b88fef',
  measurementId: 'G-T4J7C21ERX',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  firebase.app().functions('asia-east2')
}

export default firebase
