import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

/*
 * ======================================================================================
 * GOOGLE FIREBASE CONFIGURATION
 * ======================================================================================
 * To connect your own Firebase project:
 * 1. Go to Google Firebase Console: https://console.firebase.google.com/
 * 2. Select or create a project.
 * 3. In the left sidebar, click "Authentication" > "Get Started".
 *    - Enable "Email/Password" under the Sign-in method tab.
 *    - Enable "Google" under the Sign-in method tab.
 * 4. Go to Project Settings (gear icon in the sidebar) > General tab.
 * 5. Scroll down to "Your apps", select the Web icon (</>), and copy your `firebaseConfig`.
 * 6. Replace the placeholder values below with your real credentials:
 * ======================================================================================
 */
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || 'YOUR_MESSAGING_SENDER_ID',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || 'YOUR_APP_ID',
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || 'YOUR_MEASUREMENT_ID'
};

// Check if a real API key has been provided by the user
export const isRealFirebaseConfigured = () => {
  return (
    firebaseConfig.apiKey &&
    firebaseConfig.apiKey !== 'YOUR_API_KEY' &&
    !firebaseConfig.apiKey.includes('YOUR_')
  );
};

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Custom simulated in-memory store for fallback/demo mode when placeholder keys are used
const demoDatabase = {
  users: [
    {
      email: 'student@u.nus.edu',
      password: 'nusPassword2026',
      displayName: 'NUS Student',
    },
    {
      email: 'testuser@nus.edu.sg',
      password: 'password123',
      displayName: 'Test User',
    },
  ],
};

let simulatedUser = null;
const authListeners = new Set();

const notifyAuthListeners = (user) => {
  simulatedUser = user;
  authListeners.forEach((callback) => callback(user));
};

/**
 * Human-readable explanations for Firebase & Demo authentication error codes
 */
export const getFriendlyErrorMessage = (error) => {
  const code = error?.code || '';
  switch (code) {
    case 'auth/user-not-found':
      return 'Account not found: No user exists with this email address in the database. Please check your spelling or sign up for a new account.';
    case 'auth/wrong-password':
      return 'Incorrect password: The password you entered is incorrect. Please double-check your credentials and try again.';
    case 'auth/invalid-credential':
      return 'Authentication failed: Invalid credentials provided. Please check your email and password, or verify that this account exists.';
    case 'auth/invalid-email':
      return 'Invalid email format: Please enter a valid email address (e.g., student@u.nus.edu).';
    case 'auth/email-already-in-use':
      return 'Account already exists: This email is already registered. Please log in instead.';
    case 'auth/weak-password':
      return 'Password too weak: The password must be at least 6 characters long.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in was cancelled before completion.';
    case 'auth/popup-blocked':
      return 'Google sign-in popup was blocked by your browser. Please enable popups for this site.';
    case 'auth/too-many-requests':
      return 'Access temporarily blocked: Too many failed login attempts. Please wait a few minutes and try again.';
    default:
      return error?.message || 'An error occurred during authentication. Please try again.';
  }
};

/**
 * Sign in with Email and Password
 */
export const loginWithEmail = async (email, password) => {
  if (isRealFirebaseConfigured()) {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  // Simulated authentication when placeholder credentials are used
  await new Promise((resolve) => setTimeout(resolve, 300));
  const user = demoDatabase.users.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase()
  );

  if (!user) {
    const error = new Error('No user found with this email in the database.');
    error.code = 'auth/user-not-found';
    throw error;
  }

  if (user.password !== password) {
    const error = new Error('Wrong password provided for this account.');
    error.code = 'auth/wrong-password';
    throw error;
  }

  const authenticatedUser = {
    uid: 'demo-' + Date.now(),
    email: user.email,
    displayName: user.displayName,
    providerId: 'password',
  };
  notifyAuthListeners(authenticatedUser);
  return { user: authenticatedUser };
};

/**
 * Sign up with Email and Password
 */
export const signupWithEmail = async (email, password, displayName = '') => {
  if (isRealFirebaseConfigured()) {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    const name = displayName.trim();

    // Email/password accounts do not receive a display name automatically.
    // Store the name in Firebase Auth so auth.currentUser.displayName is
    // available to the navbar and after subsequent sign-ins.
    if (name) {
      await updateProfile(credential.user, { displayName: name });
    }

    return credential;
  }

  await new Promise((resolve) => setTimeout(resolve, 300));
  if (!email || !email.includes('@')) {
    const error = new Error('Invalid email address format.');
    error.code = 'auth/invalid-email';
    throw error;
  }
  if (!password || password.length < 6) {
    const error = new Error('Password must be at least 6 characters.');
    error.code = 'auth/weak-password';
    throw error;
  }

  const existing = demoDatabase.users.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase()
  );
  if (existing) {
    const error = new Error('An account already exists with this email.');
    error.code = 'auth/email-already-in-use';
    throw error;
  }

  const newUser = {
    email: email.trim(),
    password,
    displayName: displayName.trim() || email.split('@')[0],
  };
  demoDatabase.users.push(newUser);

  const authenticatedUser = {
    uid: 'demo-' + Date.now(),
    email: newUser.email,
    displayName: newUser.displayName,
    providerId: 'password',
  };
  notifyAuthListeners(authenticatedUser);
  return { user: authenticatedUser };
};

/**
 * Sign in with Google
 */
export const loginWithGoogle = async () => {
  if (isRealFirebaseConfigured()) {
    return await signInWithPopup(auth, googleProvider);
  }

  // Simulated Google authentication when placeholder credentials are used
  await new Promise((resolve) => setTimeout(resolve, 400));
  const googleUser = {
    uid: 'google-demo-' + Date.now(),
    email: 'nus.student.google@gmail.com',
    displayName: 'NUS Google User',
    photoURL: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
    providerId: 'google.com',
  };
  notifyAuthListeners(googleUser);
  return { user: googleUser };
};

/**
 * Sign out current user
 */
export const logoutUser = async () => {
  if (isRealFirebaseConfigured()) {
    return await signOut(auth);
  }

  await new Promise((resolve) => setTimeout(resolve, 150));
  notifyAuthListeners(null);
  return true;
};

/**
 * Listen to auth state changes
 */
export const subscribeToAuthChanges = (callback) => {
  if (isRealFirebaseConfigured()) {
    return onAuthStateChanged(auth, callback);
  }

  authListeners.add(callback);
  // Initial fire with current state
  callback(simulatedUser);
  return () => {
    authListeners.delete(callback);
  };
};

export default app;

