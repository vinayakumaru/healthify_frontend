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
        .then((user) => {
            callback(null,user.user.uid);
        })
        .catch((error) => {
            callback(error,null);
        });
}

export function signIn(email, password, callback) {
    signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
            storeInCache(email,user.user.uid);
            callback(null);
        })
        .catch((error) => {
            callback(error);
        });
}

export function signOut() {
    removeFromCache();
    auth.signOut();
}

export function getCurrentUser() {
    return auth.currentUser;
}

export function isUserSignedIn() {
    return auth.currentUser !== null;
}

function storeInCache(email,userId){
    localStorage.setItem("user", userId);
    localStorage.setItem("type", email.includes('doctor') ? 'doctor' : 'user');
}

function removeFromCache(){
    localStorage.removeItem("user");
    localStorage.removeItem("type");
}

export function getUserId(){
    return localStorage.getItem("user");
}

export function getUserType(){
    return localStorage.getItem("type");
}

