import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAeXaZYEHQGTp1TGqRrJki7h1hxpRvKTZM",
    authDomain: "inventory-management-e0569.firebaseapp.com",
    projectId: "inventory-management-e0569",
    storageBucket: "inventory-management-e0569.firebasestorage.app",
    messagingSenderId: "971696223595",
    appId: "1:971696223595:web:7c7e789dac227b1b5c482e"
};

const app = initializeApp(firebaseConfig);

export default app;