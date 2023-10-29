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
  query,
  runTransaction
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
          // Exclude the document with the ID "server"
          if (doc.id !== "server") {
            subcollectionData.push({ ...doc.data() });
          }
        });
  
        console.log(subcollectionData);
        return subcollectionData;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.message);
      }
    }
);

export const fetchServerData = createAsyncThunk(
    "lablayout/fetchServerData",
    async (idRuangan, { rejectWithValue }) => {
      try {
        const serverDocRef = doc(db, `ruangan/${idRuangan}/layout/server`);
        const serverData = await getDoc(serverDocRef);
        if (serverData.exists()) {
          return serverData.data();
        } else {
          throw new Error("Server data not found");
        }
      } catch (error) {
        // console.log(error);
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
    async ({ idRuangan, idSnapshot, data }, { rejectWithValue }) => {
        try {
            const oldDocRef = doc(db, `ruangan/${idRuangan}/layout/${idSnapshot}`);

            if (data.kodeInventaris !== idSnapshot) {
                const newDocRef = doc(db, `ruangan/${idRuangan}/layout/${data.kodeInventaris}`);
                await setDoc(newDocRef, data);
                await deleteDoc(oldDocRef);
            } else {
                await updateDoc(oldDocRef, data);
            }

            return data;
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

export const switchPosition = createAsyncThunk(
    "lablayout/switchPosition",
    async ({ idRuangan, idCompTarget, idCompDomain }, { rejectWithValue }) => {
      try {
        const subcollectionRefTarget = doc(
          db,
          `ruangan/${idRuangan}/layout/${idCompTarget}`
        );
        const subcollectionRefDomain = doc(
          db,
          `ruangan/${idRuangan}/layout/${idCompDomain}`
        );
  
        const [targetData, domainData] = await Promise.all([
          getDoc(subcollectionRefTarget),
          getDoc(subcollectionRefDomain),
        ]);
  
        if (!targetData.exists() || !domainData.exists()) {
          console.log("One or both documents do not exist.");
          return rejectWithValue("One or both documents do not exist.");
        }
  
        const targetPosisi = targetData.data().posisi;
        const domainPosisi = domainData.data().posisi;
        const switchTransaction = async (transaction) => { // swith posisi
          transaction.update(subcollectionRefTarget, { posisi: domainPosisi });
          transaction.update(subcollectionRefDomain, { posisi: targetPosisi });
        };
        await runTransaction(db, switchTransaction);
  
        console.log("Switched positions successfully.");
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.message);
      }
    }
  );
  