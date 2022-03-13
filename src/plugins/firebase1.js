import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyB9qC3XpCFHRX4UBwC4uTHx0h3F3IFs1Ck",
    authDomain: "movieticket-398f1.firebaseapp.com",
    projectId: "movieticket-398f1",
    storageBucket: "movieticket-398f1.appspot.com",
    messagingSenderId: "668740374561",
    appId: "1:668740374561:web:a365282a4a98c914a55360"
});

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
export { db, auth };