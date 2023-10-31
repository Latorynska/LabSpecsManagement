import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";

// create
export const createLaporan = createAsyncThunk(
  "laporan/createLaporan",
  async ({ idRuangan, computerId, laporanData }, { rejectWithValue }) => {
    // console.log("received laporan =>",laporanData);
    // console.log("received compId =>",computerId);
    // console.log("received ruanganid =>",idRuangan);
    try {
      const laporanRef = collection(
        db,
        `ruangan/${idRuangan}/layout/${computerId}/laporan`
      );
      const newLaporanRef = await addDoc(laporanRef, laporanData);
      const laporanId = newLaporanRef.id;
      const computerRef = doc(db, `ruangan/${idRuangan}/layout/${computerId}`);
      await setDoc(
        computerRef,
        {
          status: laporanData.status,
        },
        { merge: true }
      );
      return { ...laporanData, id: laporanId };
    } catch (error) {
      console.log(error);
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);


// Update
export const updateLaporan = createAsyncThunk(
  "laporan/updateLaporan",
  async ({ idRuangan, computerId, laporanId, updatedLaporanData }, { rejectWithValue }) => {
    try {
      const laporanRef = doc(
        db,
        `ruangan/${idRuangan}/layout/${computerId}/laporan/${laporanId}`
      );

      await updateDoc(laporanRef, updatedLaporanData);
      return { id: laporanId, ...updatedLaporanData };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

// Fetch
export const fetchLaporan = createAsyncThunk(
  "laporan/fetchAllLaporan",
  async ({ idRuangan, computerId }, { rejectWithValue }) => {
    try {
      const laporanRef = collection(
        db,
        `ruangan/${idRuangan}/layout/${computerId}/laporan`
      );

      const querySnapshot = await getDocs(laporanRef);
      const laporanData = [];
      querySnapshot.forEach((doc) => {
        laporanData.push({ ...doc.data(), id: doc.id, });
      });
      // sort dengan tanggal terakhir (paling baru menurut data tanggal yang disimpan)
      laporanData.sort((a, b) => {
        const dateA = new Date(
          parseInt(a.tanggal.split('/')[2]),
          parseInt(a.tanggal.split('/')[1]) - 1,  // Month (0-based)
          parseInt(a.tanggal.split('/')[0]) 
        );
        const dateB = new Date(
          parseInt(b.tanggal.split('/')[2]),
          parseInt(b.tanggal.split('/')[1]) - 1,
          parseInt(b.tanggal.split('/')[0]) 
        );

        // Sort in descending order (most recent first)
        return dateB - dateA;
      });
      return laporanData;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteLaporan = createAsyncThunk(
  "laporan/deleteLaporan",
  async ({ idRuangan, computerId, laporanId }, { rejectWithValue }) => {
    try {
      const laporanRef = doc(
        db,
        `ruangan/${idRuangan}/layout/${computerId}/laporan/${laporanId}`
      );

      await deleteDoc(laporanRef);
      return laporanId;
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
  
          const ruanganRef = doc(db, `ruangan/${idRuangan}`);
          const ruanganData = await getDoc(ruanganRef);
  
          if (!ruanganData.exists()) {
            throw new Error("Ruangan not found");
          }
          
          const ruangan = ruanganData.data();

          return { computer, ruangan:{...ruangan, id: idRuangan}};
      } catch (error) {
          console.error(error);
          return rejectWithValue(error.message);
      }
  }
);


export const createPenyelesaian = createAsyncThunk(
  "penyelesaian/createPenyelesaian",
  async ({ idRuangan, computerId, laporanId, penyelesaianData }, { rejectWithValue }) => {
    // console.log('received ruangan => ', idRuangan);
    // console.log('received computer => ', computerId);
    // console.log('received laporan => ', laporanId);
    // console.log('received data => ', penyelesaianData);
    try {
      const laporanRef = doc(db, `ruangan/${idRuangan}/layout/${computerId}/laporan/${laporanId}`);
      const laporanDoc = await getDoc(laporanRef);

      if (!laporanDoc.exists()) {
        throw new Error("Laporan not found");
      }

      const laporanData = laporanDoc.data();

      const timestamp = new Date();
      const formattedTimestamp = timestamp.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      penyelesaianData.tanggal = formattedTimestamp;
      laporanData.status = penyelesaianData.status;
      laporanData.penyelesaian = penyelesaianData;
      if (penyelesaianData.status === "solved") {
        const computerRef = doc(db, `ruangan/${idRuangan}/layout/${computerId}`);
        await setDoc(
          computerRef,
          {
            status: "good",
          },
          { merge: true }
        );
      }

      await updateDoc(laporanRef, laporanData);

      return { laporanId, penyelesaianData };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
