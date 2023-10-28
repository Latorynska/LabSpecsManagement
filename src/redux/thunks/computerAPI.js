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

export const fetchLaporan = createAsyncThunk(
  "computer/fetchLaporan",
  async ({ idRuangan, computerId }, { rejectWithValue }) => {
    try {
      const laporanRef = collection(
        db,
        `ruangan/${idRuangan}/layout/${computerId}/laporan`
      );

      const querySnapshot = await getDocs(laporanRef);
      const laporanData = [];
      querySnapshot.forEach((doc) => {
        laporanData.push({ ...doc.data() });
      });

      return laporanData;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchComputerAndRuangData = createAsyncThunk(
    "computer/fetchComputerAndRuangData",
    async ({ idRuangan, computerId }, { rejectWithValue }) => {
        try {
            const computerRef = doc(db, `ruangan/${idRuangan}/layout/${computerId}`);
            const computerData = await getDoc(computerRef);
    
            if (!computerData.exists()) {
            throw new Error("Computer not found");
            }
    
            const computer = computerData.data();
    
            // Now, let's fetch ruangan data
            const ruanganRef = doc(db, `ruangan/${idRuangan}`);
            const ruanganData = await getDoc(ruanganRef);
    
            if (!ruanganData.exists()) {
            throw new Error("Ruangan not found");
            }
    
            const ruangan = ruanganData.data();
    
            return { computer, ruangan };
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.message);
        }
    }
);
  