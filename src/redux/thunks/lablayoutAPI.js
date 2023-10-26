import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  deleteDoc,
  orderBy,
  setDoc,
  query
} from "firebase/firestore";
import { db } from "../../config/firebase";

// get list komputer dari ruangan by id ruangan
export const fetchLayout = createAsyncThunk(
    "lablayout/fetchLayout",
    async (idRuangan, { rejectWithValue }) => {
        try {
            const q = query(collection(db, `ruangan/${idRuangan}/layout`), orderBy("posisi"));
            const querySnapshot = await getDocs(q);

            const subcollectionData = [];
            querySnapshot.forEach((doc) => {
                subcollectionData.push({...doc.data()});
            });
            console.log(subcollectionData);
            return subcollectionData;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

export const addComp = createAsyncThunk("lablayout/addComp",async ({ idRuangan, data }, { rejectWithValue }) => {
        console.log('idruangan => ', idRuangan);
        console.log('data => ', data);
        try {
            const subcollectionRef = doc(db, `ruangan/${idRuangan}/layout/${data.kodeInventaris}`);
            await setDoc(subcollectionRef, data);
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

