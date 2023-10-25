import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db } from '../../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      const user = userCredential.user;
      
      const userDocRef = doc(db, 'users', user.uid.toString());
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        return userData;
      } else {
        return rejectWithValue('User data not found.');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
});
  

export const loadUserData = createAsyncThunk('auth/loadUserData', async (userId, { dispatch, rejectWithValue }) => {
    console.log('dispatched => ' , userId);
    try {
        const userDocRef = doc(db, 'users', userId);
        const userDocSnapshot = await getDoc(userDocRef);
    
        if (userDocSnapshot.exists()) {
            return userDocSnapshot.data();
        } else {
            return rejectWithValue('User data not found.');
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { dispatch, rejectWithValue }) => {
    try {
        await auth.signOut();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const registerUser = createAsyncThunk('auth/registerUser', async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
      const user = userCredential.user;
      console.log('user => ', user);
  
      await setDoc(doc(db, 'users', user.uid), {
        username: credentials.username,
        email: credentials.email,
      });
  
      const userDocRef = doc(db, 'users', user.uid.toString());
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        return userData;
      } else {
        return rejectWithValue('User data not found.');
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  });
  
// export const registerUser = createAsyncThunk('auth/registerUser', async (credentials, { dispatch, rejectWithValue }) => {
//     console.log(credentials);
//     try {
//         const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
//         const user = userCredential.user;
//         console.log('user => ', user);
    
//         await setDoc(doc(db, 'users', user.uid), {
//             username: credentials.username,
//             email: credentials.email,
//         });
//         return user.uid.toString();
//     } catch (error) {
//         console.log(error);
//         return rejectWithValue(error.message);
//     }
// });