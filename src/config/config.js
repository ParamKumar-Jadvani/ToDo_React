import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import toast from "react-hot-toast";

const firebaseConfig = {
  apiKey: "AIzaSyD1vI84QNWLNVIVJlMOKnyXsPMnf6Gi-HU",
  authDomain: "todo-a63b8.firebaseapp.com",
  projectId: "todo-a63b8",
  storageBucket: "todo-a63b8.appspot.com",
  messagingSenderId: "1037626274710",
  appId: "1:1037626274710:web:8714a54f2eb5c5d14663b7",
  measurementId: "G-FRMX6XBNXV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const fireStoreDB = getFirestore(app);

// Function for signing up a user with email and password
export const signupEmail = async ({ email, password }) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Send email verification
    await sendEmailVerification(result.user);

    // Return result if successful
    return result;
  } catch (error) {
    console.error("Signup error:", error);
    if (error.code === "auth/email-already-in-use") {
      toast.error("This email is already in use.");
      throw new Error("This email is already in use.");
    } else if (error.code === "auth/weak-password") {
      toast.error("Password is too weak.");
      throw new Error("Password is too weak.");
    } else {
      toast.error("Signup failed: " + error.message);
      throw new Error(error.message);
    }
  }
};

// Function for logging in a user with email and password
export const loginEmail = async ({ email, password }) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);

    // Check if email is verified
    if (!result.user.emailVerified) {
      await signOut(auth); // Sign out the user
      toast.error(
        "Please verify your email before logging in. Check your inbox or request a new verification email."
      );
      throw new Error("Please verify your email before logging in.");
    }

    // Return result if login is successful
    return result;
  } catch (error) {
    if (error.code === "auth/wrong-password") {
      toast.error("Invalid password. Please try again.");
      throw new Error("Invalid password. Please try again.");
    }
    if (error.code === "auth/user-not-found") {
      toast.error("User not found. Please sign up first.");
      throw new Error("User not found. Please sign up first.");
    }
    console.error(error);
    toast.error("Login failed: " + error.message);
    throw new Error(error.message);
  }
};

// Function for Google authentication
export const GoogleAuth = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // Check if email is verified
    if (!result.user.emailVerified) {
      await sendEmailVerification(result.user);
      toast.info("Verification email sent. Please verify your email.");
    }

    // Return result if successful
    return result;
  } catch (error) {
    console.error(error);
    toast.error("Google login failed: " + error.message);
    throw new Error(error.message);
  }
};

// Listen for changes in user authentication state
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    if (user.emailVerified) {
      // User is verified, perform automatic login actions here (e.g., redirect to home page)
      console.log("User is verified and logged in automatically");
      // (Optional) You can store the verified user information for later use in your app
    } else {
      // User is not verified, handle accordingly (e.g., show a message or redirect to verification page)
      console.log("User email is not verified");
      // (Optional) You can redirect to a verification page or display a message to ask the user to verify their email
    }
  } else {
    // User is signed out
  }
});
