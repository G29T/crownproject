// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// we need to crete an auth instance just like we did with initiaslizeApp
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection, //allows us to get a collection reference
  writeBatch,
  query
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3M1vw6SYsHkRHzqBdiZ0oa8VIwxTBkbs",
  authDomain: "crown-clothing-project-23507.firebaseapp.com",
  projectId: "crown-clothing-project-23507",
  storageBucket: "crown-clothing-project-23507.appspot.com",
  messagingSenderId: "662295944304",
  appId: "1:662295944304:web:692a0d87b4593f4da168b5"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//initializing a provider
// Also GoogleAuthProvider is a class that we get from Firebase Authentication and
// and this is connected to Google Auth itself
const provider = new GoogleAuthProvider();

// These custom param will take some kind of configuration object and
// with it we can tell different ways that we want this Google auth provider to behave 
provider.setCustomParameters({
  // every time somebody interacts with our provider, 
  // we want to always force them to select an account
  prompt: "select_account"
});

//created the instance 
// auth is a singletone
export const auth = getAuth();

// the below is equal with an anonymous function which
// is going to return signInWithPopup
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  // if the user data doesn't exists, we want to set it in our DB
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  //if the user data exists

  //return userDocRef
  return userDocRef;
};


//adding a new collection as well as the documents inside of that collection
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd //the documents we want to add
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);