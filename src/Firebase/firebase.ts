// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import fbConfig from "./firebase-config.json";

const firebaseConfig = fbConfig;

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
