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

export const updateComp = createAsyncThunk(
    "lablayout/updateComp",
    async ({ idRuangan,idSnapshot, data }, { rejectWithValue }) => {
        try {
            const subcollectionRef = doc(db, `ruangan/${idRuangan}/layout/${idSnapshot}`);
            await updateDoc(subcollectionRef, data);
            console.log(data);
            return {...data, snapshotId : idSnapshot};
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

  export const deleteComp = createAsyncThunk(
    "lablayout/deleteComp",
    async ({ idRuangan, idComp }, { rejectWithValue }) => {
        console.log('idruangan => ', idRuangan);
        console.log('idcomp => ', idComp);
        try {
            const subcollectionRef = doc(db, `ruangan/${idRuangan}/layout/${idComp}`);
            await deleteDoc(subcollectionRef);
            return idComp;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);