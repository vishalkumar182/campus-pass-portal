import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBHpqL7n8_iKC7f2Q_VX2Gd9r066HXmeVg",
  authDomain: "interndev-e1b0e.firebaseapp.com",
  projectId: "interndev-e1b0e",
  storageBucket: "interndev-e1b0e.firebasestorage.app",
  messagingSenderId: "259061932351",
  appId: "1:259061932351:web:2a0a147fcb707fa6aab38a",
  measurementId: "G-G3RHYLPZR9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Cloud Messaging
export const messaging = getMessaging(app);

// Function to request FCM token
export const requestForToken = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: 'BFnPtCEgQl8rEG5SHTsOl6rqAhlcCWnpG2JW4hZG4oE20wI-_RON7Pvo9YP2eLpxYQA9x9xKqD-XkrLZN4C-sa8' }); // Replace with your VAPID key
    return token;
  } catch (error) {
    console.error('An error occurred while retrieving token. ', error);
    return null;
  }
};

// Listen for foreground messages
export const onForegroundMessage = (callback: (payload: any) => void) => {
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    callback(payload);
  });
};
