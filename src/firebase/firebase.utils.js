import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBngZQtIJMcbipP29vBT-6N2ZbFUkn_cfY",
  authDomain: "crwn-db-581da.firebaseapp.com",
  databaseURL: "https://crwn-db-581da.firebaseio.com",
  projectId: "crwn-db-581da",
  storageBucket: "crwn-db-581da.appspot.com",
  messagingSenderId: "265104203215",
  appId: "1:265104203215:web:3b37d17ef695011f6786ba",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
