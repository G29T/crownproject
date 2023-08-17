// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// we need to crete an auth instance just like we did with initiaslizeApp
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

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

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    // if the user data doesn't exists, we want to set it in our DB
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
            });
        } catch(error){
            console.log('Error creating the user', error.message);
        }
    }

    //if the user data exists

    //return userDocRef
    return userDocRef;
};