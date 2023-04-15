import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAkcn6emGhBWfmXIkSUCJXxcDD8xoFBuoc",
    authDomain: "heathify-29846.firebaseapp.com",
    projectId: "heathify-29846",
    storageBucket: "heathify-29846.appspot.com",
    messagingSenderId: "727135022402",
    appId: "1:727135022402:web:9d5945b232dafe397f6cdb",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function addNewUser(email, password, callback) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            callback();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            callback();
        });
}

export function signIn(email, password, callback) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            callback();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            callback();
        });
}

export function signOut() {
    auth.signOut();
}

export function getCurrentUser() {
    return auth.currentUser;
}

export function isUserSignedIn() {
    return auth.currentUser !== null;
}
