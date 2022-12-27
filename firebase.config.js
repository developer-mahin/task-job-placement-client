// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtVjoyYq8CqNU5hdSnmY5r-eojqTWsjhs",
    authDomain: "tasks-website-job-placement.firebaseapp.com",
    projectId: "tasks-website-job-placement",
    storageBucket: "tasks-website-job-placement.appspot.com",
    messagingSenderId: "881966909861",
    appId: "1:881966909861:web:e405b11330b2a64dfc004c",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;