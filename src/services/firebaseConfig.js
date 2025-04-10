


import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCx2OVZ6XunG5ygvrlvrEWVy32GKS-kgqU",
  authDomain: "sign-up-e7fa0.firebaseapp.com",
  projectId: "sign-up-e7fa0",
  storageBucket: "sign-up-e7fa0.firebasestorage.app",
  messagingSenderId: "196368580480",
  appId: "1:196368580480:web:550633c229092c11820b65",
  measurementId: "G-EFV7GZ749F"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
 const auth=getAuth(app);
const provider = new GoogleAuthProvider();
export { provider,auth, signInWithPopup, signOut };


// import { initializeApp } from "firebase/app";
// import {getAuth,GoogleAuthProvider} from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyCx2OVZ6XunG5ygvrlvrEWVy32GKS-kgqU",
//   authDomain: "sign-up-e7fa0.firebaseapp.com",
//   projectId: "sign-up-e7fa0",
//   storageBucket: "sign-up-e7fa0.firebasestorage.app",
//   messagingSenderId: "196368580480",
//   appId: "1:196368580480:web:550633c229092c11820b65",
//   measurementId: "G-EFV7GZ749F"
// };

// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
//  const auth=getAuth(app);
// const provider = new GoogleAuthProvider();
// export { provider,auth };
