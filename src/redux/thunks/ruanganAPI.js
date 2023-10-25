import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";

// Create
export const addRuanganData = createAsyncThunk(
    "ruangan/addRuanganData",
    async (formData, { rejectWithValue }) => {
        console.log(formData);
      try {
        const docRef = await addDoc(collection(db, "ruangan"), formData);
        const docSnapshot = await getDoc(docRef);
        const newDoc = docSnapshot.data();
        const newId = docRef.id;
        return {...newDoc, id: newId};
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

// Read
export const fetchRuanganData = createAsyncThunk(
    "ruangan/fetchRuanganData",
    async (_, { rejectWithValue }) => {
      try {
        const querySnapshot = await getDocs(collection(db, "ruangan"));
        const ruanganData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          ruanganData.push({ ...data, id: id, });
        });
        return ruanganData;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

// Update
export const updateRuanganData = createAsyncThunk(
  "ruangan/updateRuanganData",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "ruangan", id);
      await updateDoc(docRef, updatedData);
      return updatedData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete
export const deleteRuanganData = createAsyncThunk(
  "ruangan/deleteRuanganData",
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "ruangan", id));
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
