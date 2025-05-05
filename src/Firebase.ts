import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "REDACTED_FOR_SECURITY",
  authDomain: "REDACTED_FOR_SECURITY",
  projectId: "REDACTED_FOR_SECURITY",
  storageBucket: "REDACTED_FOR_SECURITY",
  messagingSenderId: "REDACTED_FOR_SECURITY",
  appId: "REDACTED_FOR_SECURITY",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
