
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyCh2sxz1ZuU0Adpnr-xPBtImhmxW4zDGLc",
  authDomain: "flipmemo-c7981.firebaseapp.com",
  projectId: "flipmemo-c7981",
  storageBucket: "flipmemo-c7981.appspot.com",
  messagingSenderId: "967208555264",
  appId: "1:967208555264:web:c66980c28d59e5921619e5"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage();
export const storageRef = ref(storage);